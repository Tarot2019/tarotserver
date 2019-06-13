const tarot2 = require('../business/tarot2');
const utils = require('../business/utils/utils');

const models = require('../database/models.js');
const tarot2history = models.tarot2history;
models.channel.hasMany(tarot2history);

const kefu = {
    normal: {wechatid: "xmqianming01", qrCode: "/tarot1/kefu_normal.png"},
    yuyin: {wechatid: "ch13769762694", qrCode: "/tarot1/kefu_yuyin.png"}
};

module.exports = {
    'GET /api/tarot2/home': async (ctx, next) => {
        let questionGroups = await tarot2.home();
        let count = questionGroups.reduce((pre, cur) => pre + cur.questions.reduce((pre, cur) => pre + cur.count + utils.getSales(), 0), 0);
        const comments = [
            {mobile: '139******26', comment: '对于迷茫的我来说，占卜感觉像一盏明灯，给了自己很好的指引！豁然开朗'},
            {mobile: '186******97', comment: '算的很准，有很好的参考价值，可以帮助我做出更好的选择！'},
            {mobile: '156******32', comment: '很准，印证了我对未来的想法，下次遇到问题还会来测～'},
            {mobile: '187******98', comment: '分析的很到位，给的建议很实在，超值！'},
            {mobile: '178******90', comment: '爱情、事业、财运都算了一遍，准到哭！！会推荐给朋友来的'},
            {mobile: '131******28', comment: '真的是神准呐，把我们现在的情况都说到了，看来我们都应该开始自己的新生活了'},
            {mobile: '132******88', comment: '有种醍醐灌顶的感觉，占完知道该怎么选择了，很幸运自己可以别一错再错了'},
            {mobile: '188******78', comment: '第一次做塔罗测试，算得蛮准的，感觉很神奇！'},
            {mobile: '189******56', comment: '人生中第一次占卜，很值得一试，算完心里敞亮多了，会分享给朋友的'},
            {mobile: '152******67', comment: '很不错，得到了我想要的答案'},
            {mobile: '139******78', comment: '塔罗牌真的是很神奇的东西，本来是抱着试一试的心态，没想到这么准。。。'},
            {mobile: '138******34', comment: '爱情运势、事业运势、财运都测了一遍，哈哈哈，心情很复杂'},
            {mobile: '155******23', comment: '朋友发给我，让我测一测的，说很准，测了下，和自己当下的情况真的很吻合'},
            {mobile: '176******33', comment: '在朋友圈看到好友转发的，好奇点进来的，几乎全部测了一遍'},
            {mobile: '158******78', comment: '之前听过塔罗牌占卜，今天第一次算，感觉很不错'},
            {mobile: '134******56', comment: '我抽到的是恶魔牌，测的是财运，感觉说的很对，期待接下来的发展'},
            {mobile: '135******67', comment: '算的是桃花运，抽到了恋人牌，哈哈哈，看来脱单有望了'},
            {mobile: '156******49', comment: '算完过段推荐了整个寝室的室友……'},
            {mobile: '156******09', comment: '我算的是未来爱情发展趋势，算完发给男朋友算，结果……'},
            {mobile: '138******84', comment: '希望今年财运如牌面所说的那样，正财、偏财都给我旺一旺吧~'},
            {mobile: '138******48', comment: '还是很有参考意义的，几十元，还是很值得的'},
            {mobile: '158******05', comment: '分析的还算全面，我测的是桃花运，希望今年桃花朵朵开'},
            {mobile: '156******20', comment: '本来不信，算了一个有一丢丢相信，连算了三个，深信不疑'},
            {mobile: '159******29', comment: '很奇怪，很神奇，抽到的牌和当下的情况一模一样'},
            {mobile: '134******29', comment: '关于塔罗牌占卜的原理不太懂，但是真的很准'},
            {mobile: '134******50', comment: '身边的朋友测试了都反馈很准，真的太神奇了'},
            {mobile: '187******48', comment: '一顿饭的钱，算一算一整年的运势，哈哈，还是比较划算滴'},
            {mobile: '187******83', comment: '很准，可惜问题有点少，算的不过瘾，希望多一些其他占卜问题'},
            {mobile: '156******53', comment: '我抽到的是隐士牌，解释说对应的是处女座，这也太准了吧！！！'}
        ];
        let homeData = {
            count,
            kefu: kefu,
            questionGroups,
            comments
        };
        ctx.rest(homeData);
        tarot2history.create({
            time: Date.now(),
            userId: ctx.headers.openid,
            page: 'home',
            os: ctx.headers.os,
            device: ctx.headers.device,
            ua: ctx.headers['user-agent'],
            channelId: ctx.headers.channel || 'official'
        });
    },

    'GET /api/tarot2/drawCard/:questionId': async (ctx, next) => {
        let cardId = await tarot2.drawCard(ctx.params.questionId);
        ctx.rest(cardId);

    },

    'GET /api/tarot2/answer/:questionId/:cardId': async (ctx, next) => {
        let answer = await tarot2.questionAnswer(ctx.params.questionId, ctx.params.cardId);
        delete answer.cardDescription;
        answer.interpretations.map(interpretation => delete interpretation.content);
        answer.kefu = kefu;
        ctx.rest(answer);

    },

    'GET /api/tarot2/order': async (ctx, next) => {
        let orders = await tarot2.orders(ctx.headers.openid);
        ctx.rest(orders);

    },
    'GET /api/tarot2/orderWithMobile/:mobile': async (ctx, next) => {
        let orders = await tarot2.ordersWithMobile(ctx.params.mobile);
        ctx.rest(orders);

    },
    'GET /api/tarot2/orderDetail/:orderId': async (ctx, next) => {
        let detail = await tarot2.orderDetail(ctx.params.orderId);
        detail.kefu = kefu;
        ctx.rest(detail);

    },
    'POST /api/tarot2/getPayInfo': async (ctx, next) => {
        console.log("[getPayInfo2] ctx.request.ip = " + ctx.request.ip);
        console.log("[getPayInfo2] ctx.request.ips = " + ctx.request.ips);
        console.log("[getPayInfo2] ctx.headers.channel = " + ctx.headers.channel);
        console.log("[getPayInfo2] ctx.request.header = " + JSON.stringify(ctx.request.header));
        console.log("[getPayInfo2] ctx.request.body = " + JSON.stringify(ctx.request.body));
        let payInfo = await tarot2.getPayInfo(ctx.headers.openid, ctx.request.body.questionId,
            ctx.request.body.cardId, ctx.request.ip, ctx.headers.channel || 'official',
            ctx.headers.weixin);
        ctx.rest(payInfo);
    },
    'POST /api/tarot2/bindMobile': async (ctx, next) => {
        let result = await tarot2.bindMobile(ctx.request.body.orderId, ctx.request.body.mobile);
        ctx.rest(result);
    },
    'POST /api/tarot2/payResult': async (ctx, next) => {
        console.log("############# wechat callback #############");
        console.log(JSON.stringify(ctx.request));
        const content = ctx.request.body.xml;
        console.log('ctx.request.body.xml', JSON.stringify(content));
        let result = tarot2.wechatCallback(content);
        if(result) {
            // 开始回传微信
            ctx.type = 'application/xml' // 指定发送的请求类型是xml
            // 回传微信，告诉已经收到
            return ctx.body = `<xml>
            <return_code><![CDATA[SUCCESS]]></return_code>
            <return_msg><![CDATA[OK]]></return_msg>
            </xml>`
        }
    }
};
