const crypto = require('crypto');
const xml2js = require('xml2js');
const request = require('request');

const constants = require('../constants');
const key = constants.WECHAT_PAY_KEY;//商户key
const mch_id = constants.WECHAT_PAY_MCH_ID;
const appid = constants.WECHAT_MP_APP_ID; //微信公众平台id
const weixin_prepay_url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

const prePay = async (openid, orderId, desc, totalPrice, spbill_create_ip, notify_url, isWeixin) => {
    let isInWechat = isWeixin != 'false';
    let obj = {
        appid,
        mch_id,
        nonce_str: getNonceStr(32),
        body: desc,
        out_trade_no: orderId,
        total_fee: totalPrice,
        spbill_create_ip,
        notify_url,
        trade_type: isInWechat ? 'JSAPI' : 'MWEB',
    };
    if(isInWechat) {
        obj.openid = openid;
    }
    // js的默认排序即为ASCII的从小到大进行排序(字典排序)
    let arr = Object.keys(obj).sort().map(item => {
        return `${item}=${obj[item]}`;
    });
    // 这里拼接签名字符串的时候一定要注意: 商户的key是要单独拿出来拼在最后面的
    let str = arr.join('&') + '&key=' + key;
    // appid=wxf8600b***b5dfb&body=德胜村&mch_id=1490909372&nonce_str=plfbp2bhr0id1z6aktmndfot94hkewcv&notify_url=https://server.***.cn/wechat/pay_notify&openid=oFm4h0WvnQWB4ocFmdPzsWywlE8c&out_trade_no=20150806125346&spbill_create_ip=127.0.0.1&total_fee=56600&trade_type=JSAPI&key=Lzy1234567890111***5161718192

    obj.sign = getSign(str);
    // 调用微信统一下单接口
    let weixinPreorderResult = await wechatPay(obj);
    console.log("微信统一下单结果：", JSON.stringify(weixinPreorderResult));
    if(isInWechat) {
        let {prepay_id} = weixinPreorderResult;
        if (prepay_id) {
            return getClientPayConfig(prepay_id);
        } else {
            throw {code: 'no_prepay_id', message: JSON.stringify(res)};
        }
    } else {
        return weixinPreorderResult;
    }
};


/**
 * 统一下单 prepay_url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
 * @param {Object} obj 调用统一下单的必须参数
 */
const wechatPay = (obj) => {
    let xml = json2xml(obj);
    console.log(xml)
    return new Promise((resolve,reject)=>{
        // 这里用了reques库,不熟悉的同学可以看看相关文档 https://github.com/request/request
        // 总之就是向微信的统一下单接口提交一个xml
        request({method:'POST', url: weixin_prepay_url, body: xml},(err, res, body) => {
            if(err){
                reject(err);
            }else{
                //如果成功即可得到微信返回参数
                console.log(body);
                let obj = parseXml(body).xml;
                resolve(obj);
            }
        });
    });
}


/**
 * 对指定字符串进行md5加密
 * @param {String} str
 */
const getSign = (str) => {
    console.log("签名前：" + str);
    let hash = crypto.createHash('md5').update(str,'utf8');
    return hash.digest('hex').toUpperCase();
};

/**
 * 转化xml用了xml2js库
 https://github.com/Leonidas-from-XIV/node-xml2js
 * @param {Object} obj
 */
const json2xml = (obj)=>{
    let builder = new xml2js.Builder({
        headless:true,
        allowSurrogateChars: true,
        rootName:'xml',
        cdata:true
    });
    var xml = builder.buildObject(obj);
    return xml;
}

const parseXml = (xml)=>{
    let {parseString} = xml2js;
    let res;
    parseString(xml,  {
        trim: true,
        explicitArray: false
    }, function (err, result) {
        res = result;
    });
    return res;
};

/**
 * 生成指定长度的随机数
 * @param {*int} len
 */
const getNonceStr = (len)=>{
    let str = '';
    while(str.length < len){
        str +=  Math.random().toString(36).slice(2);
    }
    return str.slice(-len);
};

/**
 * 生成前端调启支付界面的必要参数
 * @param {String} prepay_id
 */
const getClientPayConfig = (prepay_id) => {
    let obj = {
        appId: appid,
        timeStamp: String(Math.floor(Date.now() / 1000)),
        nonceStr: getNonceStr(32),
        package: 'prepay_id=' + prepay_id,
        signType: 'MD5'
    };
    let arr = Object.keys(obj).sort().map(item => {
        return `${item}=${obj[item]}`;
    });
    let str = arr.join('&') + '&key=' + key;
    obj.paySign = getSign(str);
    return obj;
};


module.exports = {prePay};