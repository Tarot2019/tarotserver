const APIError = require('../rest').ApiError;
const axios = require('axios');
let user = require('../database/models.js').user;

module.exports = {
    'POST /api/public/login': async (ctx, next) => {
        let weixinCode = ctx.request.body.weixinCode || '';
        if (weixinCode) {
            let userinfo = await axios.get('https://api.weixin.qq.com/sns/oauth2/access_token', {
                params: {
                    appid: 'wxc6c885dfe8d053c1',
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
                        unionid: data.data.unionid
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
            throw new APIError("user_name_err", "微信code不能为空");
        }
    },
}