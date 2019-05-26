const APIError = require('../rest').ApiError;
const crypto = require('crypto');
const axios = require('axios');
const uuidv1 = require('uuid/v1');

let user = require('../database/models.js').user;
const constants = require('../constants');

module.exports = {
    'POST /api/public/login': async (ctx, next) => {
        let channelId = ctx.headers.channel || 'official';
        let weixin = ctx.request.body.weixin;
        let weixinCode = ctx.request.body.weixinCode || '';

        if(weixin) {
            if (weixinCode) {
                let userinfo = await axios.get('https://api.weixin.qq.com/sns/oauth2/access_token', {
                    params: {
                        appid: constants.WECHAT_MP_APP_ID,
                        secret: 'fbab64604a180252165d7125c3732396',
                        code: weixinCode,
                        grant_type: 'authorization_code'
                    }
                }).then((data) => {
                    if(!data.data.access_token) {
                        throw new APIError(data.data.errcode, data.data.errmsg);
                    } else {
                        console.log("微信accessToken: " + data.data.access_token);
                        return axios.get('https://api.weixin.qq.com/sns/userinfo?access_token=' + data.data.access_token + '&openid=' + data.data.openid);
                    }
                }).then((data) => {
                    if(!data.data.openid) {
                        throw new APIError(data.data.errcode, data.data.errmsg);
                    } else {
                        let userInfo = {
                            openid: data.data.openid,
                            avatar: data.data.headimgurl,
                            wechatName: data.data.nickname,
                            unionid: data.data.unionid,
                            channelId
                        };
                        return new Promise(function (resolve, reject) {
                            user.upsert(userInfo).then(
                                (created) => {
                                    console.log("用户登录：" + userInfo.id + "/" + userInfo.weixinName + ", 第一次登录？" + created);
                                    resolve(userInfo);
                                }
                            ).catch(
                                err => reject(err)
                            );
                        });
                        //return Promise.all([user.upsert(userInfo), Promise.resolve(userInfo)]);
                    }
                }).then(
                    (data) => {
                        console.log(data);
                        return data;
                    }
                ).catch((err) => {
                    throw new APIError("weixin_server_err", "微信服务出错：" + err.code + "/" + err.message);
                });
                ctx.rest(userinfo);
            } else {
                throw new APIError('weixin_code_null', 'weixinCode参数不能为空');
            }
        } else {
            let userInfo = {
                openid: uuidv1(),
                avatar: '',
                wechatName: '',
                channelId
            };
            await user.upsert(userInfo);
            ctx.rest(userInfo);
        }
    },

    // 微信公众平台通过config接口注入权限验证配置所需要的参数
    'POST /api/public/getConfigInfo': async (ctx, next) => {
        let url = ctx.request.body.pageUrl;
        //获取access_token
        let configInfo = await axios.get('https://api.weixin.qq.com/cgi-bin/token', {
            params: {
                appid: constants.WECHAT_MP_APP_ID,
                secret: 'fbab64604a180252165d7125c3732396',
                grant_type: 'client_credential'
            }
        }).then((data) => {
            if (!data.data.access_token) {
                throw new APIError(data.data.errcode, data.data.errmsg);
            } else {
                console.log("[getConfigInfo] 微信accessToken: " + data.data.access_token);
                return axios.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + data.data.access_token + '&type=jsapi');
            }
        }).then((data) => {
            if (!data.data.ticket) {
                throw new APIError(data.data.errcode, data.data.errmsg);
            } else {
                let jsapi_ticket = data.data.ticket;
                let nonceStr = getNonceStr(16);
                let timestamp = String(Math.floor(Date.now() / 1000));
                let obj = {jsapi_ticket, nonceStr, timestamp, url};
                let arr = Object.keys(obj).sort().map(item => {
                    return `${item}=${obj[item]}`;
                });
                let str = arr.join('&');
                let signature = getSign(str);
                console.log("[getConfigInfo] sign=" + signature);
                let config = {
                    appid: constants.WECHAT_MP_APP_ID,
                    timestamp,
                    nonceStr,
                    signature
                };
                return config;
            }
        }).catch((err) => {
            throw new APIError("weixin_server_err", "微信服务出错：" + err.code + "/" + err.message);
        });
        ctx.rest(configInfo);
    }
};

const getNonceStr = (len)=>{
    let str = '';
    while(str.length < len){
        str +=  Math.random().toString(36).slice(2);
    }
    return str.slice(-len);
};
const getSign = (str) => {
    console.log("[getConfigInfo] 签名前：" + str);
    let hash = crypto.createHash('sha1').update(str,'utf8');
    return hash.digest('hex').toLowerCase();
};
