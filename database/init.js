//create all tables
const Models = require('./models.js');
const interpretation = Models.interpretation;
const card = Models.card;
const question = Models.question;
const questionGroup = Models.questionGroup;
const tarot2record = Models.tarot2record;
const { sequelize } = require('./db');
const insertDebugData = true;
(async () => {
        try {

            console.log("-------- begin 创建关联 --------");
            Models.user.belongsToMany(Models.divination, {as: "Preorders", through: "userPreorder"});
            Models.divination.belongsToMany(Models.user, {as: "Collectors", through: "userPreorder"});

            Models.user.belongsToMany(Models.divination, {as: "Orders", through: Models.order});
            Models.divination.belongsToMany(Models.user, {as: "Consumers", through: Models.order});

            Models.channel.hasMany(Models.user);
            Models.channel.hasMany(Models.order);
            Models.channel.hasMany(Models.tarot2record);
            Models.channel.hasMany(Models.tarot1history);
            Models.channel.hasMany(Models.tarot2history);

            question.belongsTo(questionGroup);
            questionGroup.hasMany(question);
            question.belongsToMany(card, {through: interpretation});
            card.belongsToMany(question, {through: interpretation});
            console.log("-------- end 创建关联 --------");


            await sequelize.sync();
            console.log("++++++++ 全部表创建完成 ++++++++");

            //插入测试数据
            if (insertDebugData) {
                //1
                await Models.divination.create({
                    picTop: "/tarot1/img/1fenshoufuhe.jpg",
                    picSquare: "/tarot1/img/1fenshoufuhes.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "测测你和ta分手后还会复合吗？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 432,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "宝剑四逆位",
                    cardImg1: "/tarot1/card/n/bao_jian_4.jpg",
                    cardDescription1: "选到这张牌的朋友，你们复合的概率大约是75%。这张牌给你的启示是希望你能给彼此一些冷静思考的时间，同时反思自己不足的地方，切忌因急躁而做出伤害感情的举措。你和TA的缘分还没到尽头，复合的机率还是比较大的。",
                    rateName1: "意思是休息、沉思及自省。",
                    rate1: 3,
                    cardName2: "权杖四正位",
                    cardImg2: "/tarot1/card/quan_zhang_4.jpg",
                    cardDescription2: "选到这张牌的朋友，你们复合的概率大约是90%。现在你与恋人的恋情已经日趋稳固了，生活中的小吵小闹总是无法避免，但这些小风浪并不会真正伤害到你们的感情。如果你和爱人之前闹矛盾分手了，极有可能会复合。",
                    rateName2: "意思是和谐、繁荣、融洽。",
                    rate2: 5,
                    cardName3: "节制正位",
                    cardImg3: "/tarot1/card/14_jie_zhi.jpg",
                    cardDescription3: "选到这张牌的朋友，你们复合的概率大约是60%。你与恋人在交往中或许关系有些失衡，导致关系失衡可能是因为一方对另一方的付出感觉理所当然，习惯性索取却不懂得付出。只要你们找机会进行一次深度的谈话，打开心结，复合还是比较有望的。",
                    rateName3: "意思是协调、平衡及沟通。",
                    rate3: 4,
                    cardName4: "宝剑二正位",
                    cardImg4: "/tarot1/card/bao_jian_2.jpg",
                    cardDescription4: "选到这张牌的朋友，你们复合的概率大约是40%。建议要诚实面对自己的想法，切勿因为逃避而彻底断送了这段感情。可以主动打破沉默，结束这场冷战，你们才能有复合的转机。",
                    rateName4: "代表逃避、对立及僵局。",
                    rate4: 5
                });
                //2
                await Models.divination.create({
                    picTop: "/tarot1/img/2aiqingcichang.jpg",
                    picSquare: "/tarot1/img/2aiqingcichangs.jpg", //在列表中展示的方形图
                    isBanner: true, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "测测2019年你的爱情磁场有多强？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 334,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "皇后正位",
                    cardImg1: "/tarot1/card/3_nv_huang.jpg",
                    cardDescription1: "这张牌在四张牌中不是最好的，但一定是最安稳的一张牌。单身者抽到这张牌意味着新的一年，你的桃花很可能只开一次，但这一次对你而言却是重大的机遇。\n" +
                    "\n" +
                    "对方会是一个高分伴侣，你们不仅精神上高度契合，对方在颜值、家境、身高、个人能力上都能打高分。有伴者的感情生活会比较充实，相比于之前的不安和疑心，你的想法变得更开阔。因为心态的成熟，你们之间进入了很棒的状态，彼此之间相互扶持，感情真是越来越好。",
                    rateName1: "选择这张牌的朋友，桃花磁场：",
                    rate1: 4,
                    cardName2: "恋人牌",
                    cardImg2: "/tarot1/card/6_lian_ren.jpg",
                    cardDescription2: "抽到这张牌的人，2019年关于感情方面，你可以放心了，2018你经历的诸多亏欠和遗憾，2019都会补偿给你。\n" +
                    "\n" +
                    "单身者有机会遇到心仪的对象，你们之间吸引力很强，属于一拍即合的关系，所以你不用着急，缘分一定会眷顾你。另外，固执的、不愿意将就的宝宝们，不要慌张，你会用幸福给所有嘀嘀咕咕的人一个响亮的耳光。\n" +
                    "\n" +
                    "有伴者，这一年的感情发展很乐观，你们的爱情生活会比较甜蜜。已婚者要学会对感情的收放，这一年即使有些难题出现，只要你们共同携手，都能顺利跨越。\n",
                    rateName2: "选择这张牌的朋友，桃花磁场：",
                    rate2: 5,
                    cardName3: "命运之轮正位",
                    cardImg3: "/tarot1/card/10_ming_yun_zhi_lun.jpg",
                    cardDescription3: "抽到这张牌意味着2019年你的感情发展会非常玄妙，例如万年单身汉会一见钟情，分手多年的恋人会重新复合，貌合神离的夫妻感情得到修复，总之很多原本不敢想的事情都有发生的可能。\n" +
                    "\n" +
                    "对单身者而言，这一年你不仅会找到情感归属，而且很可能会闪恋闪婚生子。有伴者的感情发展比较平淡，虽然生活中会有一些小摩擦发生，但不至于分手。2019你会把更多的心思放在改变自我和事业提升上，你开始选择长大、成熟，慢慢活成你自己最羡慕的样子。\n",
                    rateName3: "选择这张牌的朋友，桃花磁场：",
                    rate3: 3,
                    cardName4: "权杖骑士正位",
                    cardImg4: "/tarot1/card/quan_zhang_qi_shi.jpg",
                    cardDescription4: "抽到这张牌，意味着2019年单身者的感情生活比较一言难尽。\n" +
                    "\n" +
                    "你抽到了桃花最多的一张牌，所以你的感情生活会非常精彩，但因为质量参差不齐，想要在众多的桃花中，挑选出最适合的，委实考验你的眼力。有伴者这一年的感情问题比较复杂，你们很可能会出现感情危机，有些人会苦苦压抑自己，有些人则控制不住情绪，吵闹不断。\n" +
                    "\n" +
                    "另外，三角关系，分分合合这些事情都有可能上演。\n",
                    rateName4: "选择这张牌的朋友，桃花磁场：",
                    rate4: 2
                });
                //3
                await Models.divination.create({
                    picTop: "/tarot1/img/3gongzuojianchi.jpg",
                    picSquare: "/tarot1/img/3gongzuojianchis.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你现在的工作还值不值得坚持？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 278,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "战车",
                    cardImg1: "/tarot1/card/7_zhan_che.jpg",
                    cardDescription1: "选择这张牌的朋友，你的工作可能会需要经常出差，跟各种人协调关系，让你感觉比较辛苦，但这份工作也很能锻炼你的能力，而且在优秀的团队里，发展前景也非常不错，还是值得你坚持下去的。",
                    rateName1: "",
                    rate1: 3,
                    cardName2: "星币五",
                    cardImg2: "/tarot1/card/xing_bi_5.jpg",
                    cardDescription2: "选择这张牌的朋友，我建议你换工作。\n" +
                    "\n" +
                    "大多数人辛苦工作无非就是为了赚钱，继续做下去，你不仅没办法升职加薪，老板正常发工资都非常困难了，公司资金严重不足，入不敷出，很难运营下去，既然赚不到钱，还是另谋出路吧。\n",
                    rateName2: "",
                    rate2: 5,
                    cardName3: "星币四",
                    cardImg3: "/tarot1/card/xing_bi_4.jpg",
                    cardDescription3: "选择这张牌的朋友，你的工作非常稳定，应该是公务员教师类的铁饭碗吧，收入也很稳定，如果你并不是一个野心勃勃，不安于现状的人，那就坚持做下去吧，稳中求发展也不错。",
                    rateName3: "",
                    rate3: 4,
                    cardName4: "星币六",
                    cardImg4: "/tarot1/card/xing_bi_6.jpg",
                    cardDescription4: "选择这张牌的朋友，你的上司很赏识你，也有意提拔你。在你的职业生涯中能给你很多帮助和建设性意见，并且你的付出和收获是成正比的，偶尔的不开心就克服下吧，继续在这份工作中坚持下去你能攒不少钱的。",
                    rateName4: "",
                    rate4: 5
                });

                //4
                await Models.divination.create({
                    picTop: "/tarot1/img/4shenmeaiqing.jpg",
                    picSquare: "/tarot1/img/4shenmeaiqings.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你会遇见什么样的爱情？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 56,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "星星",
                    cardImg1: "/tarot1/card/17_xing_xing.jpg",
                    cardDescription1: "选择这张牌的朋友，你在感情上会遇见理想的恋人，对于未来不必担心，新的恋情即将出现，你会走入一个人的人生，将不可能变为可能。星星牌也暗示着即将进入一段轻松自在，心平气和的时光。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "恋人",
                    cardImg2: "/tarot1/card/6_lian_ren.jpg",
                    cardDescription2: "恋人牌代表即将遇见生命中相当重要的一段两性关系。恋人牌以伊甸园、亚当夏娃的爱情为背景，阐述了爱的真谛。也代表着热恋，一段新关系的形成。浪漫是这段关系的主题。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "隐士",
                    cardImg3: "/tarot1/card/9_yin_shi.jpg",
                    cardDescription3: "选择这张牌的朋友，代表着你是一个习惯独处的人，自己可以安排好自己的生活，可以过得自在快乐。由于你的自得其乐，所以你希望另一半与你同样，知道何时需要独处，何时需要陪伴。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "节制",
                    cardImg4: "/tarot1/card/14_jie_zhi.jpg",
                    cardDescription4: "选择这张牌的朋友，在感情方面，会遇见一段纯挚的恋情。多半是由友情展开，两个人可以很理智与清晰的沟通关于你们之间感情、生活，未来等一切事情。Ta会是一位可以商谈的伴侣，你也会是一位很包容理解的伴侣。你们之间或许没有轰轰烈烈的爱情，但是平平淡淡才是最长久的方式。",
                    rateName4: "",
                    rate4: 0
                });
                //5
                await Models.divination.create({
                    picTop: "/tarot1/img/5xuyaozhengnengliang.jpg",
                    picSquare: "/tarot1/img/5xuyaozhengnengliangs.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "近期你需要什么正能量？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 82,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "愚人",
                    cardImg1: "/tarot1/card/0_yu_ren.jpg",
                    cardDescription1: "抽到这张牌的朋友，在事业上，近期你的工作会小有所得，但切勿骄傲自满，也不要单纯相信同事的赞美和肯定，其实只是客气而已。\n" +
                    "\n" +
                    "在爱情上，最近你的情绪难以控制，总是忍不住发脾气，还会敏感的去猜忌怀疑，你的状态很糟糕，对方也受你影响，彼此都无法感到快乐。\n" +
                    "\n" +
                    "在金钱上，你赚钱的速度赶不上花钱的狠劲，为了避免资产负增长，还是改改剁手的毛病和大手大脚的习惯，省点钱过冬吧。\n" +
                    "\n" +
                    "因此，你近期需要的正能量为：自省、总结。\n",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "星星",
                    cardImg2: "/tarot1/card/17_xing_xing.jpg",
                    cardDescription2: "抽到这张牌的朋友在事业上，最近的你很丧，做什么事情都不得劲，有些人已经拖延癌了。你陷入一边拖延，一边唾弃自己的状态，压力很大，有时候睡觉都会惊醒。\n" +
                    "\n" +
                    "在爱情上，单身者会被表白，对方条件不错，但你总觉得差了一点感觉，想拒绝会犹豫，但和Ta在一起又有一点不甘心，会经历矛盾的时期。\n" +
                    "\n" +
                    "有伴者有可能因为前任、现实、家庭等问题发生矛盾，这些问题你们只要能静下心沟通，其实都可以解决。\n" +
                    "\n" +
                    "在金钱上，可能会有很好的朋友向你借钱，除非是急用，否则不建议你借给Ta，很可能有去无回。\n" +
                    "\n" +
                    "因此，你近期需要的正能量为：放松、健康。\n",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "力量",
                    cardImg3: "/tarot1/card/8_li_liang.jpg",
                    cardDescription3: "抽到这张牌的朋友在事业上，最近的你很辛苦，你坚持做了一些事情，过程很累，还一直没有看到希望。\n" +
                    "\n" +
                    "在爱情上，说了多少次，让你踏出舒适圈，让你主动一点，想要脱单坐等是没用的，但你总不听，年底这段时候，很多事情要忙，单身者忙到没时间想脱单的问题。\n" +
                    "\n" +
                    "有伴者的感情比较冷淡，因为专注于事业的打拼，难免会出现冷落，所以双方要注意感情的维系哦。\n" +
                    "\n" +
                    "在金钱上，每到月底，钱没了，却不知道花在了哪里，月光族的生活该停止了。\n" +
                    "\n" +
                    "因此，你近期需要的正能量为：行动、坚持\n",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "女教皇",
                    cardImg4: "/tarot1/card/3_nv_huang.jpg",
                    cardDescription4: "抽到这张牌的朋友，在事业上，最近这段时间，你的事业会遭遇滑铁卢，职场上的不公平让你不甘，小人背后的诋毁暗害，你想要报复，最终却有可能惹了一身骚。\n" +
                    "\n" +
                    "在爱情上，有伴者越相处越感觉三观不合，最近的不愉快已经快让你们崩溃了，很累。但想到分手，却又放不下。\n" +
                    "\n" +
                    "单身者桃花运不错了，只要别冲动的谈恋爱，明辨人心，就可能在众多的人选中挑出最适合自己的。\n" +
                    "\n" +
                    "在金钱上，你的财运还算可以，但你有一个毛病，省小钱花大钱。\n" +
                    "\n" +
                    "因此，你近期需要的正能量为：蛰伏、进修。\n",
                    rateName4: "",
                    rate4: 0
                });
                //6
                await Models.divination.create({
                    picTop: "/tarot1/img/6yinchangshuxing.jpg",
                    picSquare: "/tarot1/img/6yinchangshuxings.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你性格的隐藏属性是什么？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 22,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "权杖六",
                    cardImg1: "/tarot1/card/quan_zhang_6.jpg",
                    cardDescription1: "选择这张牌的朋友，是聚会的组织者，是大家的开心果，但是这种外表之下，你自己更需要的是真心的陪伴。\n" +
                    "\n" +
                    "所以你的隐藏属性是多和朋友聊天建立真正的情感连接。\n",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "宝剑六逆位",
                    cardImg2: "/tarot1/card/n/bao_jian_6.jpg",
                    cardDescription2: "抽到这张牌的朋友，你会发现自己有避世倾向，偶尔找人聊天，三言两语之后却发现并不投机。所以你会选择自己一个人。\n" +
                    "\n" +
                    "所以你的隐藏属性是需要将自己打开，你的朋友其实很多，但是总被你的冷漠拒之千里。\n",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "皇后逆位",
                    cardImg3: "/tarot1/card/n/3_nv_huang.jpg",
                    cardDescription3: "抽到这张牌的朋友，你自己喜爱美食、衣服、化妆、健身等等。但是这些却无法满足你。因为每一个你都会尝试却不会坚持。\n" +
                    "\n" +
                    "所以你的隐藏属性是踏实简单。\n",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "宝剑国王",
                    cardImg4: "/tarot1/card/bao_jian_guo_wang.jpg",
                    cardDescription4: "抽到这张牌的朋友，像一个大哥哥大姐姐一样会照顾人，但是有可能会局限在自己的成长经验里，而且交友的手腕很实在，这并非是你真实的样子。\n" +
                    "\n" +
                    "所以你的隐藏属性是交流和引导。\n",
                    rateName4: "",
                    rate4: 0
                });
                //7
                await Models.divination.create({
                    picTop: "/tarot1/img/7renwushuxing.jpg",
                    picSquare: "/tarot1/img/7renwushuxings.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "测测你的人物属性是什么？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 2,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "愚人正位",
                    cardImg1: "/tarot1/card/0_yu_ren.jpg",
                    cardDescription1: "抽到这张牌的朋友，你的人物属性是“随性人”。\n" +
                    "\n" +
                    "你向来是一个自由惯的人，过日子，开心是一天，不开心也是一天。因此，虽然你这辈子功成名就的可能性不大，但却过得比谁都开心。\n",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "女祭司正位",
                    cardImg2: "/tarot1/card/2_nv_ji_si.jpg",
                    cardDescription2: "抽到这张牌的朋友，你的人物属性是“理性人”。\n" +
                    "\n" +
                    "你是一个很有规划的人，从不允许自己的人生出现太大的意外。无论做什么事情，总要先评估一番。在谈恋爱时也是如此，分析利弊，解决根本问题，加强沟通，不会让情绪牵着自己走。因此，和你不熟悉的人经常会觉得你高冷，甚至有些不近人情。\n",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "皇后正位",
                    cardImg3: "/tarot1/card/3_nv_huang.jpg",
                    cardDescription3: "抽到这张牌的朋友，你的人物属性是“感性人”。\n" +
                    "\n" +
                    "你是一个热情主动的人，喜欢美好的事物，对长得不好看的人或物向来没有太大的印象。你容易受人影响，做事情时注意力经常很难集中。你敏感多情，极容易坠入爱河。为人处事比较情绪化，总爱跟着自己当下的感觉走，不懂得或不愿意花时间去规划自己的人生。因此，你的爱情之路注定比较坎坷。\n",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "节制正位",
                    cardImg4: "/tarot1/card/14_jie_zhi.jpg",
                    cardDescription4: "抽到这张牌的朋友，你的人物属性是“中性人”。\n" +
                    "\n" +
                    "你向来明白，枪打出头鸟的道理。所以为人处事从不展现自己的锋芒，即使能力不错，也不会主动揽下事情。不求有功，但求无过。\n",
                    rateName4: "",
                    rate4: 0
                });
                //8
                await Models.divination.create({
                    picTop: "/tarot1/img/8aiqingfancuo.jpg",
                    picSquare: "/tarot1/img/8aiqingfancuos.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你在爱情中最容易犯哪些错误？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 121,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "宝剑随从",
                    cardImg1: "/tarot1/card/bao_jian_shi_cong.jpg",
                    cardDescription1: "选择这张牌的朋友们，你们在爱情中最容易犯的错误就是想太多，时常陷入到自己的臆想中，包含对对方的一些怀疑、猜测和不信任，而且自我的防备心很强，你就像一个侦探一样不断的去探求，以来寻找一些线索，所以呢，很容易给对方带来压力，并且让ta对你的行为产生反感。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "正义",
                    cardImg2: "/tarot1/card/11_zheng_yi.jpg",
                    cardDescription2: "选择这张牌的朋友们，你们在爱情中最容易犯的错误就是太计较，就像拿着一个天平不停的测量，在这段感情中你们各自付出了多少，收获了多少，天平一旦有些倾斜，你们就会想要让对方加码以来保持这个天平的平衡，这些行为会让你们的感情变得像一场交易，缺少了爱情的纯粹。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "女祭司",
                    cardImg3: "/tarot1/card/2_nv_ji_si.jpg",
                    cardDescription3: "选择这张牌的朋友们，你们在爱情中最容易犯的错误就是不爱表达，总希望对方能够揣测你们的想法，而自己则一直处于观察者的姿态，这会让对方感觉你是一个很冷漠很难相处的人，建议你们要适当的敞开心扉，多和对方表达、沟通。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "宝剑骑士",
                    cardImg4: "/tarot1/card/bao_jian_qi_shi.jpg",
                    cardDescription4: "选择这张牌的朋友们，你们在爱情中经常处于一个强势的姿态，性格过于急躁，经常因为一时冲动就用过激的言语去攻击对方。建议你们在遇到事情的时候，不要第一时间就把不冷静的想法和过激的语言表达出来，先让自己沉下心，冷静后再和对方好好沟通。",
                    rateName4: "",
                    rate4: 0
                });
                //9
                await Models.divination.create({
                    picTop: "/tarot1/img/9zhaomitezhi.jpg",
                    picSquare: "/tarot1/img/9zhaomitezhis.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你最让异性着迷的特质是什么？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 1189,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "太阳",
                    cardImg1: "/tarot1/card/19_tai_yang.jpg",
                    cardDescription1: "选择这张牌的朋友，代表你给对方最大的感觉就是你是一个非常单纯、天真的人，你的这种不掺杂任何杂质的性格是你最让异性着迷的特质。所以尽情的去展现你的纯真就能够吸引到对方。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "皇后",
                    cardImg2: "/tarot1/card/3_nv_huang.jpg",
                    cardDescription2: "选择这张牌的朋友，代表你最大的特质就是你的美貌和气质。就像牌面上的皇后，高高在上女王一样的外表下，还拥有一种热情，这种女性特有的魅力让你非常吸引对方。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "宝剑女王",
                    cardImg3: "/tarot1/card/bao_jian_wang_hou.jpg",
                    cardDescription3: "选择这张牌的朋友，代表你是一个独立、睿智、成熟的女人，你对所有事情都有非常清晰的规划，时刻保持内心的坚定，而不是像个小女孩一样需要别人照顾。所以你的这种性格是吸引对方的一个非常大的特质。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "力量",
                    cardImg4: "/tarot1/card/8_li_liang.jpg",
                    cardDescription4: "选择这张牌的朋友，代表你最吸引对方的特质就是你的内心有一股很强大的力量，这种力量是女性特有的温柔，你用这个力量去包容他，化解对方的不良情绪，包括愤怒、悲伤，时刻让对方感受到强烈的温暖，这是你最让对方着迷的地方。",
                    rateName4: "",
                    rate4: 0
                });
                //10
                await Models.divination.create({
                    picTop: "/tarot1/img/10tianfuzuigao.jpg",
                    picSquare: "/tarot1/img/10tianfuzuigaos.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "测测你在哪方面的天赋最高？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 897,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "宝剑侍从",
                    cardImg1: "/tarot1/card/bao_jian_shi_cong.jpg",
                    cardDescription1: "选择这张牌的朋友，打探能力是你最厉害的天赋。你很聪明，也很会分析事态，生活中决定走的每一步都会事先经过打探，虽然有时候会显得机关算尽，但不可否认你的打探能力确实十分出众。\n" +
                    "\n" +
                    "你拥有追根究底的精神，如果把这样的精力放在研究上，你将获得不错的成就。\n",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "圣杯骑士",
                    cardImg2: "/tarot1/card/sheng_bei_qi_shi.jpg",
                    cardDescription2: "选择这张牌的朋友，艺术头脑是你最厉害的天赋。你是一个魅力十足的梦想家，有着丰富的想象力，创意满满。你的多才多艺也成为了自身的闪光点，陌生异性在初次见你时很容易会被你吸引。\n" +
                    "\n" +
                    "需要注意的是，你的行动力可能不太充足。如何脚踏实地，努力把理想变成现实是于你而言最大的挑战。\n",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "星币王后",
                    cardImg3: "/tarot1/card/xing_bi_wang_hou.jpg",
                    cardDescription3: "选择这张牌的朋友，经商头脑是你最厉害的天赋。你对金钱的敏感度很高，但你并非那种光想得到却又不付出努力的人，你踏实勤奋，能够运用生意头脑给自己带来庞大的财富。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "正义",
                    cardImg4: "/tarot1/card/11_zheng_yi.jpg",
                    cardDescription4: "选择这张牌的朋友，判断力是你最厉害的天赋。你是一个善于用理性逻辑思考问题的人，你追求公平与正义，在与人讨论同一件事情时，即便所有说法都一边倒，但你也不会受他人影响而心存偏见。\n" +
                    "\n" +
                    "你公正而厚道，富有责任心，判断力奇准。很适合从事法务类的职业，是一位能为他人伸张正义的使者。\n",
                    rateName4: "",
                    rate4: 0
                });
                //11
                await Models.divination.create({
                    picTop: "/tarot1/img/11caizaikengli.jpg",
                    picSquare: "/tarot1/img/11caizaikenglis.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "测测你近期会栽在哪个坑里？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 98,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "高塔正位",
                    cardImg1: "/tarot1/card/16_gao_ta.jpg",
                    cardDescription1: "选择这张牌的朋友，意味着近期你会遭遇到很多意料不到的灾祸。\n" +
                    "\n" +
                    "出门在外，容易遇到交通问题。碰瓷，车祸等都有可能会发生。即使不出门宅在家里，也有可能会被烫伤或是被刀具所伤。身体方面，平时明明看起来没有大问题，却会突然生病。总之就是诸事不顺。\n",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "恶魔正位",
                    cardImg2: "/tarot1/card/15_e_mo.jpg",
                    cardDescription2: "抽到这张牌意味着，近期你在感情方面会摔跟头。若你是单身，最近会遇上不错的发展对方。但Ta很有可能是情场老手，追求你的目的不纯。建议此时不要太快就把自己的一切交给对方，免得最后伤心又伤身。\n" +
                    "\n" +
                    "若你是有伴者，最近另一半出轨或是有事欺瞒你的可能性很大。你其实并不是毫无察觉，只是选择睁一只眼闭一只眼，希望能给彼此一个机会。\n",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "星币四逆位",
                    cardImg3: "/tarot1/card/n/xing_bi_4.jpg",
                    cardDescription3: "",
                    rateName3: "抽到这张牌意味着近期你在金钱方面会有些损失。最近你的财运简直差到爆，从明眼可见的冲动消费，到轻易分辨不出的消费陷阱，你都一一逃脱不出。除此之外，付出劳动的相应报酬也有可能会被对方扣押不给，好心借给朋友的金钱也迟迟讨不回来。因此，近期对待财物的态度要比平时更加谨慎。",
                    rate3: 0,
                    cardName4: "宝剑七正位",
                    cardImg4: "/tarot1/card/bao_jian_7.jpg",
                    cardDescription4: "抽到这张牌意味着，近期你会被诈骗或是欺骗。\n" +
                    "\n" +
                    "在职场上，会有小人中伤你，而这个人平时和你关系还不错。在生活中，你可能会因为新型的诈骗手法而上当，或是被亲近的人以感情为筹码半胁迫半哄骗地索取财物。\n",
                    rateName4: "",
                    rate4: 0
                });
                //12
                await Models.divination.create({
                    picTop: "/tarot1/img/12aiqingqianjing.jpg",
                    picSquare: "/tarot1/img/12aiqingqianjings.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "塔罗测试：单恋、暧昧、挽回者——你和Ta的爱情前景如何？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 119,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "愚人正位",
                    cardImg1: "/tarot1/card/0_yu_ren.jpg",
                    cardDescription1: "抽到这张牌说明你很看重感觉，本性赤诚，遇到喜欢的人会大胆的追逐。因为行事太过冲动，你很可能会把大好的局面搞得很糟。明明最初只是想好好爱一场，可最终却收获满身伤害。\n" +
                    "\n" +
                    "若你们正处在暧昧期，要恭喜你，从这张牌看，你们很可能会恋爱，而且会度过一段非常甜蜜的时期。不过，遗憾的是，你们之间恋爱容易，相处难。\n" +
                    "\n" +
                    "若你正在暗恋，大胆去表白吧，默默的爱着，不会有任何结局，让自己勇敢一次吧。若你想复合挽回：你们之间复合的几率挺大，但复合之后很可能会再次分手。不可否认，你心中依然有Ta，只是你心太急，挽回的方法错误，你现阶段的追逐，只会让Ta越来越厌烦。\n",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "魔术师",
                    cardImg2: "/tarot1/card/1_mo_shu_shi.jpg",
                    cardDescription2: "抽到这张牌的人，性格非常理智，不会轻易爱上一个人，可一旦爱上就愿意付出自己的全部。\n" +
                    "\n" +
                    "对于暗恋/暧昧期的你来说，这是最好的一张牌。这张牌表示，你在Ta心中非常重要，你们很可能会成为恋人，而且会在近期确定关系。对于想要复合挽回的你来说，很多时候你都搞不懂，你们怎么走到了分手这一步，曾经那么深爱，最终还是分手了。你有很多不舍，想要挽回，只是你顾虑太多，害怕复合之后会再分手。其实，不必要想那么多，Ta心中还爱着你，所以大胆的把自己的想法告知于Ta吧。\n",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "审判",
                    cardImg3: "/tarot1/card/20_shen_pan.jpg",
                    cardDescription3: "抽到这张牌的人，最近这段时间正处在困扰中，不仅仅是感情的问题，还有家庭生活的琐事，对未来的规划等等。\n" +
                    "\n" +
                    "现阶段，你内心经常冒出一个声音，你认为自己到了转变和成长的关键时期，你不愿意错过。\n" +
                    "\n" +
                    "对于暗恋/暧昧期的你，你迫切想要确定关系，但你的言行给了Ta太大的压力。你一定不要急，矜持一些，暧昧的挑逗要比冲动的告白更适合这段关系。\n" +
                    "\n" +
                    "对于想要复合挽回的你，从这张牌看，你们之间缘分未断，如果你能主动挽回，最终很可能会复合。\n",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "死神",
                    cardImg4: "/tarot1/card/13_si_shen.jpg",
                    cardDescription4: "抽到这张牌的人非常想恋爱，但你却不知道如何去爱或者会眼睁睁看着脱单的机会溜走。你性格太过耿直，很多时候你都懂，却不会说。\n" +
                    "\n" +
                    "对于暗恋/暧昧的你来说，你真的太累了，这段暧昧让你元气大伤。虽然相识初期，你们之间发生过一些甜蜜的事情，但相处时间久了，对方却开始若即若离，这种态度对你是莫大的折磨。我建议你快刀斩乱麻，从这张牌看，你只是Ta的备胎而已。\n" +
                    "\n" +
                    "对于要复合挽回的你来说，不要再想复合的事情，你们重新在一起的机会微乎其微，即使有奇迹发生，最终复合了，你也很难幸福。\n",
                    rateName4: "",
                    rate4: 0
                });
                //13
                await Models.divination.create({
                    picTop: "/tarot1/img/13.jpg",
                    picSquare: "/tarot1/img/13s.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "交往中、已婚者——你和Ta的爱情前景如何？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 82,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "星星",
                    cardImg1: "/tarot1/card/17_xing_xing.jpg",
                    cardDescription1: "抽到这张牌的人，是个大俗人。在一段感情中，你非常务实，相比于虚无的甜言蜜语，你更看重切实的行动和实际的利益。\n" +
                    "\n" +
                    "如果你们处于交往中：恭喜，你们未来的发展会很和谐，不仅感情生活很甜蜜，而且事业上也会有满满的收获。\n" +
                    "\n" +
                    "现阶段，你们已经开始考虑未来，所以在接下来的一段时间，你们会把重点放在工作和赚钱上，虽然腻在一起的时间有所减少，但感情依旧会很甜蜜。\n" +
                    "\n" +
                    "如果已结婚：你们的婚姻生活已经逐渐步入平稳期，虽然偶尔会回忆热恋期的浪漫，但柴米油盐的生活让你很踏实。在平时，你们会分享开心的事情，也会倾听对方的抱怨和唠叨，虽然有时候难免火大，但这就是婚姻啊。\n",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "世界",
                    cardImg2: "/tarot1/card/21_shi_jie.jpg",
                    cardDescription2: "抽到这张牌的人，心理非常强大，为人做事很成熟。你有主见，看事情很透彻，对于婚姻你也看得很清楚，除了爱之外，对方的能力，收入，家境，长相，性格都在你的评估范围之内。\n" +
                    "\n" +
                    "如果处于交往中：无论前段时间你们的状态如何，近期你们的感情将进入新的阶段。可能会见家长，可能会准备结婚事宜，也可能你们准备同居，进入深入了解期，总之你们的相处会向成熟过渡。\n" +
                    "\n" +
                    "对于已婚者：近期，你的心愿会得到实现。从这张牌看，你们的关系将得到缓解，你不仅会收获一些惊喜和浪漫，你们之间还有可能回到热恋期的甜蜜。\n",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "圣杯三",
                    cardImg3: "/tarot1/card/sheng_bei_3.jpg",
                    cardDescription3: "抽到这张牌的人，在一段感情中非常没有安全感，对于另一半你总是忍不住怀疑，会因为对方异常的举动胡思乱想，你总认为Ta会出轨，会做对不起你的事情。这种不安的心理严重影响你们的关系。\n" +
                    "\n" +
                    "对于处于交往中的你：这张牌的出现意味着你们之间存在隐瞒或欺骗，你们的感情将要出现危险，你很可能被第三者的问题困扰。\n" +
                    "\n" +
                    "对于已结婚的你来说：最近你们的感情状况并不好，家庭琐事，婆媳关系，金钱问题等等诸多因素让这段婚姻蒙上了阴影，你感觉很累，偶尔也有离婚的冲动，其实不必如此，婚姻就是相互包容的过程，一起努力，你们会成功度过磨合期。\n",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "权杖十",
                    cardImg4: "/tarot1/card/quan_zhang_10.jpg",
                    cardDescription4: "抽到这张牌的人在感情中占有欲很强，疑心病很重，对于另一半你希望能做到完全的掌控，完完全全的了解对方信息，会让你充满安全感，你特别希望能成为Ta生命中不可或缺的角色。\n" +
                    "\n" +
                    "对于交往中的你来说：从这张牌看，你们的感情出现了问题，而你不知道该如何解决。你变得很急躁，会胡思乱想。很多时候你们之间只是一些小矛盾，但你却因为小题大做，让对方很伤心。\n" +
                    "\n" +
                    "对于已结婚者来说：对这段婚姻，你的信心越来越少，每天大吵小吵不断，你想要放手却舍不得，但你也不清楚自己还能坚持多久。\n",
                    rateName4: "",
                    rate4: 0
                });
                //14
                await Models.divination.create({
                    picTop: "/tarot1/img/14.jpg",
                    picSquare: "/tarot1/img/14s.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "未来三个月你的情感状态会发生什么转变？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 42,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "圣杯六",
                    cardImg1: "/tarot1/card/sheng_bei_6.jpg",
                    cardDescription1: "在未来三个月里，你极有可能会重遇一位故人，对方也许是你儿时很好的玩伴，也有可能是你许久不曾见面的前任、初恋情人等。\n" +
                    "\n" +
                    "你们相识已久，这次重逢让你陷入回忆的漩涡，想起以往你与TA相处的点点滴滴。TA是一个慷慨大方的人，懂得馈赠，也乐于为你付出，方方面面都很关照你。你不必担心对方的出现会扰乱你现在的生活，相反，TA只会默默以真心待你好，对你的感情不含任何杂质，更不会掺杂利益、欲望等诸如此类的念头。\n" +
                    "\n" +
                    "如果你现在仍处于单身状态，那么你与这位故人大有机会能走到一起。\n",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "宝剑三",
                    cardImg2: "/tarot1/card/bao_jian_3.jpg",
                    cardDescription2: "这张牌有着失落、孤立、痛苦与分离的含义。在未来的三个月中，你有可能会经历分手、被出轨、或是和恋人大吵一架，不欢而散的状况。\n" +
                    "\n" +
                    "情感上的受伤让你难以释怀，你不明白为什么从前你们那么要好，关系怎么突然间就变成这样了呢？你看不开也放不下，终日沉浸在自苦的情绪之中。情伤固然不易痊愈，但愈合的前提条件是你要先放过自己。这张牌给你的建议是希望你不要再钻牛角尖了，更不要拒绝朋友的帮助和关怀，分开与失去都不可怕，可怕的是执着于过去而不愿清醒，须知有结束才能有新的开始。\n",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "恋人",
                    cardImg3: "/tarot1/card/6_lian_ren.jpg",
                    cardDescription3: "在感情生活上的那道空白，终于要迎来一个TA为你绘上斑斓的色彩。在未来三个月里，你很可能会遇到一位对你而言极具吸引力的异性，对方与你一拍即合，你们感情不是肤浅的肉体关系，而是精神层面的深度结合，对方可以说是你的灵魂伴侣。\n" +
                    "\n" +
                    "你们互相信任，也互相爱护，如果你们有合作创业的念头，那么你与TA都能将彼此的力量发挥到极致，业绩自然也大为可观。\n" +
                    "\n" +
                    "这张牌在恋情上的影响较为深远，并不是短期的，因此你们之间很可能会走到最后，携手步入婚姻殿堂。非单身者与恋人的感情也日趋升温，关系稳固，彼此信任的你们不妨开始考虑婚姻大事。\n",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "圣杯四",
                    cardImg4: "/tarot1/card/sheng_bei_4.jpg",
                    cardDescription4: "当爱情最初的新鲜感褪去以后，你和恋人间的感情将出现暗涌，有可能是其中一方对于这段感情已经失去兴趣，感到疲倦且无趣，即便在约会时也表现出一副不耐烦的模样。这可能会导致你们之间出现第三者插足、外遇、精神或肉体出轨等状况。\n" +
                    "\n" +
                    "其实两个人相处时间久了，热恋时的激情确实会被慢慢消磨掉，但你们也可以尝试着换一种生活模式，你们可以相约一起旅游、相约一次探险、相约做一些旁人看来很幼稚的事情……有时候令人厌倦的不是身边的人，而是始终如一的生活。换个方式度日，总能找到不一样的感觉。\n",
                    rateName4: "",
                    rate4: 0
                });
                //15
                await Models.divination.create({
                    picTop: "/tarot1/img/15.jpg",
                    picSquare: "/tarot1/img/15s.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "2019你的真命天子会出现吗？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 1132,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "权杖五",
                    cardImg1: "/tarot1/card/quan_zhang_5.jpg",
                    cardDescription1: "选择这张牌的朋友，你的桃花很旺，身边追求者众多，不过他们对你不见得有多了解，被你漂亮迷人的外表或乐观开朗的性格吸引的可能性很大，追求你有部分原因也是男性的征服欲所驱使，所以你遇到真爱的可能性并不大。\n" +
                    "\n" +
                    "抽到权杖五的女生一定要擦亮眼睛，别被表象迷惑，做选择的时候也要考虑你们是否有共同的朋友圈子，不然你的爱情很可能来得快去得也快了。\n",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "星币七逆位",
                    cardImg2: "/tarot1/card/n/xing_bi_7.jpg",
                    cardDescription2: "选择这张牌的朋友，恭喜你长久的付出换来了回报，你爱的人也不是铁石心肠，但感动终究不是爱。不过对方也可能自己的生活还没有捋顺，并没有心思去经营你们的感情，尤其是那种先立业后成家的男生，也或许他根本就没有那么爱你，暂时跟你在一起是将就，骑驴找马，如果你想结婚那就该醒醒了。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "恋人（逆位）",
                    cardImg3: "/tarot1/card/n/6_lian_ren.jpg",
                    cardDescription3: "抽到恋人牌，意味着你们一定是经营在阳光下的健康恋情，命中真爱的几率非常大，想恋爱的可以放心投入，享受过程，想结婚的遇到这样的恋爱对象就嫁了吧。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "圣杯四",
                    cardImg4: "/tarot1/card/sheng_bei_4.jpg",
                    cardDescription4: "选择这张牌的朋友，一副对你不感兴趣不理人的样子，不是你单相思就是他一头热，或许是近期本来就不打算谈恋爱，也或许是激情耗尽早已有了分手的打算。总之，遇到这样的人就克制克制你躁动的心，别去热脸贴人家冷屁股了，都懒得搭理你，谈真爱就未免太可笑了，不爱你的人果断放弃，没感觉的恋爱分手对双方都是解脱。",
                    rateName4: "",
                    rate4: 0
                });
                await Models.divination.create({
                    picTop: "/tarot1/img/16aiqingxiaosan.jpg",
                    picSquare: "/tarot1/img/16aiqingxiaosans.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你的爱情里会出现小三吗？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 22,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "圣杯二正位",
                    cardImg1: "/tarot1/card/sheng_bei_2.jpg",
                    cardDescription1: "选择这张牌的朋友，代表你们之间关系平等，亲密和谐，互相喜欢，可以说是情人眼里出西施，你在对方眼里就是最好的，两个人秀恩爱还来不及，哪还有小三的位置呀。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "圣杯三正位",
                    cardImg2: "/tarot1/card/sheng_bei_3.jpg",
                    cardDescription2: "选择这张牌的朋友你的爱情就要多留个心眼儿了，感情是两个人的事，出现第三个人来凑热闹就不正常了，你的男朋友很可能除了你还在跟其他女生搞暧昧，没准儿对你早已有异心了，抽到这张牌的朋友尤其要注意防范男友身边的女闺蜜了。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "宝剑七正位",
                    cardImg3: "/tarot1/card/bao_jian_7.jpg",
                    cardDescription3: "选择这张牌的朋友，代表你男朋友对你不够坦诚，有事瞒着你，很有可能己经跟其他女生在一起了，你还被蒙在鼓里，小三出现机率很大，要当面跟对方说清楚，快刀斩乱麻，分手一定要体面。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "权杖四正位",
                    cardImg4: "/tarot1/card/quan_zhang_4.jpg",
                    cardDescription4: "选择这张牌的朋友，你的感情非常稳定，时不时还会有些小惊喜，己经结婚的话你的婚姻也非常稳定，其乐融融，相互为对方着想，为家庭付出，你的另一半对你很诚实，没有什么需要担心的，人生若只如初见，你就抓着这个人的手一直幸福下去吧！",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/17yidilian.jpg",
                    picSquare: "/tarot1/img/17yidilians.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你们的异地恋会修成正果吗？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "月亮正位",
                    cardImg1: "/tarot1/card/18_yue_liang.jpg",
                    cardDescription1: "你是一个比较没有安全感的人，在爱情里容易患得患失，在异地恋的过程中，你可能会误信他人的谣言，又或是把简单的事情想得太复杂，从而对恋人产生怀疑。建议你要多给对方一些信心，有疑惑时应积极与对方沟通，只有互信互爱，你们的感情才能更加坚固，彼此走得更远。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "权杖六正位",
                    cardImg2: "/tarot1/card/quan_zhang_6.jpg",
                    cardDescription2: "你和恋人在相处中或许也会有摩擦和争吵，但好在你们彼此相爱，并且认定彼此就是命中注定的那个人，因此就算吵架再激烈，到最后你们也还是会和好。你们都很有勇气，对这段感情从不轻言放弃。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "圣杯四正位",
                    cardImg3: "/tarot1/card/sheng_bei_4.jpg",
                    cardDescription3: "一段爱情关系维持久了，激情终归于平淡，加上异地恋聚少离多，你和恋人双方或其中一方会感受到情感上的疲惫，态度变得消极冷淡。\n在不好的情况下，你或TA还有可能会为了寻找新鲜刺激而产生出轨的念头。其实有时候未必是你不再喜欢这个恋人，而是你们之间缺乏了情趣而已。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "圣杯十正位",
                    cardImg4: "/tarot1/card/sheng_bei_10.jpg",
                    cardDescription4: "你和恋人的感情日趋稳定，并且互相爱护尊重，没有谁比谁更强势，而是互相懂得为此着想，让这段关系相处起来能十分舒服。\n你们虽然是在异地恋，但是对对方的爱丝毫没有因此而减弱，你们愿意乐于分享爱，并愿意为恋人付出关怀，在未来的规划中也有对方的存在。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/18biaobaichenggong.jpg",
                    picSquare: "/tarot1/img/18biaobaichenggongs.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你表白成功的几率有多大？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "圣杯九正位",
                    cardImg1: "/tarot1/card/sheng_bei_9.jpg",
                    cardDescription1: "选择这张牌的朋友，你想表白的这个人一定也喜欢你没错啦，平时两个人相处就很愉快，你也符合他心仪对象的标准，说不定他还在想怎么跟你表白呢，总之抽到这张牌，你的表白就己经成功一大半了。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "恶魔正位",
                    cardImg2: "/tarot1/card/15_e_mo.jpg",
                    cardDescription2: "选择这张牌的朋友你首先想清楚自己到底要的是什么了，他对你很可能并不认真，或许只是想跟你一夜情，如果你也是随便玩玩，那你们会玩儿的很剌激，如果你是认真的，那就离他远点吧，表白不适合你。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "宝剑骑士正位",
                    cardImg3: "/tarot1/card/31_bao_jian_qi_shi.jpg",
                    cardDescription3: "选择这张牌的朋友，对方跟你一样，很可能感觉来的快去的也快，表白成功是很容易啦，但感情也很难长久，过了热恋期，没了新鲜感，你就要考虑考虑怎么维护这段感情了。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "权杖首牌正位",
                    cardImg4: "/tarot1/card/quan_zhang_1.jpg",
                    cardDescription4: "选择这张牌的朋友，你应该不是一个主动的人吧，对你而言，感情的世界里需要一些不顾后果的冲动，不试试看怎么知道结果怎样呢，只要你真诚热情，你喜欢的他也会回馈你真诚热情的，爱就大声说出来吧。",
                    rateName4: "",
                    rate4: 0
                });

                await Models.divination.create({
                    picTop: "/tarot1/img/19gaibugaifangqi.jpg",
                    picSquare: "/tarot1/img/19gaibugaifangqis.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "该不该放弃这段感情？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "愚人正位",
                    cardImg1: "/tarot1/card/0_yu_ren.jpg",
                    cardDescription1: "选择这张牌的朋友，你们的爱情对你而言本身就是一次冒险，对方还没有开始对未来做打算，也没有考虑过你们的未来，对你的喜欢更多也是一时兴起，哪天烦了就会毫不犹豫的离开你，如果你己经感觉到了自己不被重视，没有安全感，就直接放弃吧，长痛不如短痛。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "星币三逆位",
                    cardImg2: "/tarot1/card/n/xing_bi_3.jpg",
                    cardDescription2: "选择这张牌的朋友，你们其实都想跟彼此好好在一起的，但想法和行为方式的不同会让你们不太会跟对方相处，你也经常会让他很尴尬，你们并没有到分手的阶段，你不需要放弃，但学习如何相处是你的首要任务。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "星币骑士正位",
                    cardImg3: "/tarot1/card/30_xing_bi_qi_shi.jpg",
                    cardDescription3: "选择这张牌的朋友，他可是典型的先立业后成家，此时他正在为你们的未来努力工作赚钱，他不浪漫，也不会说情话，还有点大直男，如果惹你不开心了，就宽容些原谅他吧，他很专一也很实在，跟着他一辈子都是有安全感的，不要轻易放弃哟。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "高塔正位",
                    cardImg4: "/tarot1/card/16_gao_ta.jpg",
                    cardDescription4: "选择这张牌的朋友，你们的感情己经破裂，再继续纠缠也之会剩下两败具伤，别再折磨自己了，曾经爱过，快乐过就好，给彼此留点念想，也给自己留点好的回忆，就放弃吧，好聚好散。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/20lianrenpengyou.jpg",
                    picSquare: "/tarot1/img/20lianrenpengyous.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你们之间是该做恋人还是朋友？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "星币国王正位",
                    cardImg1: "/tarot1/card/xing_bi_guo_wang.jpg",
                    cardDescription1: "选择这张牌的朋友，他工作能力强，又重视家庭，关键是还有钱，而且又很会理财，成熟稳重，如果你刚好想结婚稳定下来，遇到这样的人当然是做恋人啦，先谈着试试看吧，婚姻就是柴米油盐，细水长流，跟他在一起你会很轻松的。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "宝剑骑士正位",
                    cardImg2: "/tarot1/card/bao_jian_qi_shi.jpg",
                    cardDescription2: "选择这张牌的朋友，他对什么都是三分钟热度，对你当然也是了，不成熟也不接地气，但他聪明有趣，不按常理出牌，很有自己想法，做朋友比恋人有意思多了。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "圣杯首牌正位",
                    cardImg3: "/tarot1/card/sheng_bei_1.jpg",
                    cardDescription3: "选择这张牌的朋友，不管你承不承认，你是真的很喜欢他，太久没有敞开心扉的你终于迎来了爱情，既然喜欢，为什么不做恋人，不用顾虑太多，只要努力，困难都可以克服，你又不缺朋友，心动就勇敢在一起吧。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "星币六正位",
                    cardImg4: "/tarot1/card/xing_bi_6.jpg",
                    cardDescription4: "选择这张牌的朋友，他很可能是你的上司，工作上会给你帮助和指导，但你们之间更多是互惠互利的关系，他对你好也不是因为爱你，而你最好也打消跟他谈恋爱的念头，还是避开办公室恋情，职场路更好走呀！ ",
                    rateName4: "",
                    rate4: 0
                });

                await Models.divination.create({
                    picTop: "/tarot1/img/21chuguiyuanliang.jpg",
                    picSquare: "/tarot1/img/21chuguiyuanliangs.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "对象出轨了，你该不该原谅ta？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "女祭司正位",
                    cardImg1: "/tarot1/card/2_nv_ji_si.jpg",
                    cardDescription1: "选择这张牌的朋友，你本身就是很高冷也很有原则的人，面对出轨这样的事情，你是不屑的，如果对象出轨，对你而言简直是一个污点，你这么追求完美的人，不会选择原谅他，不然对你们之后的发展就像是埋了一颗定时炸弹，感情随时分崩离析。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "圣杯六正位",
                    cardImg2: "/tarot1/card/sheng_bei_6.jpg",
                    cardDescription2: "选择这张牌的朋友，虽然出轨不应该找理由，但你对象可能是被迫或是意外出轨，他对你们的感情还是念念不忘的，而且你们之间的美好回忆无可替代，如果你还爱他，就再给他一次机会吧，他以后一定会加倍对你好的。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "权杖三逆位",
                    cardImg3: "/tarot1/card/n/quan_zhang_3.jpg",
                    cardDescription3: "选择这张牌的朋友，不管对象出没出轨，他的心思己经不在你这儿了，也没想跟你有未来，而且出轨一次和无数次对他而言没有区别，你还原谅他做什么呀，不如就此远离他，也放过自己。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "恶魔正位",
                    cardImg4: "/tarot1/card/15_e_mo.jpg",
                    cardDescription4: "选择这张牌的朋友，出轨这件事会深深的影响着你，成为你们之间不能跨越的鸿沟，时间越久，问题越多，骗别人容易，骗自己却很难，既然做不到，就不要为难自己，不如就给对方自由，也让自己解脱。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/22shibushizhanan.jpg",
                    picSquare: "/tarot1/img/22shibushizhanans.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你现在交往的对象是不是渣男？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "圣杯国王逆位",
                    cardImg1: "/tarot1/card/n/sheng_bei_guo_wang.jpg",
                    cardDescription1: "选择这张牌的朋友，遇到这样的交往对象绝对是渣男没跑了，嘴上功夫很不错，可是说的好听却做不到，一次又一次欺骗你，而且相当烂情，私生活也比较混乱，你要珍爱自己，远离渣男。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "圣杯骑士正位",
                    cardImg2: "/tarot1/card/sheng_bei_qi_shi.jpg",
                    cardDescription2: "选择这张牌的朋友，如果你想轰轰烈烈谈一场恋爱，那恭喜你遇见对的人了，他能给你一切浪漫和惊喜，眼里心里都是你，比你自己还在乎自己的感受， 只要你开心，他是那种有多少钱都愿意为你花的人，虽然有时候多愁善感，但他是暖男不是渣男哟！",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "权杖二逆位",
                    cardImg3: "/tarot1/card/n/quan_zhang_2.jpg",
                    cardDescription3: "选择这张牌的朋友，你的交往对象并不是渣男，但他很可能是妈宝男，如果你有跟他结婚的打算就要考虑清楚了，他没什么上进心，很多事情都听家里的安排，如果家里再有些钱，那他就是典型的啃老族了，婚后你是要受委屈的。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "太阳正位",
                    cardImg4: "/tarot1/card/19_tai_yang.jpg",
                    cardDescription4: "选择这张牌的朋友，他当然不是渣男了，一天到晚活的比谁都光明正大，直言不讳，平时看着傻乎乎的他是有大智慧的人，跟他在一起，你也会被正能量䨱盖的，这样的人绝对是渣女小三的绝缘体。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/23zhendeaini.jpg",
                    picSquare: "/tarot1/img/23zhendeainis.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "ta是不是真的爱你？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "圣杯三正位",
                    cardImg1: "/tarot1/card/sheng_bei_3.jpg",
                    cardDescription1: "选择这张牌的朋友，很不幸的告诉你，他除了跟你暧昧不清，同时也很可能在跟别的女生搞暧昧，对你有好感是真的，跟别人暧昧也是真的，自然谈不上是真的爱你了，对于他而言，顶多是玩玩而已罢了。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "恋人正位",
                    cardImg2: "/tarot1/card/6_lian_ren.jpg",
                    cardDescription2: "选择这张牌的朋友，他除了爱工作就剩爱你了，家人支持，朋友羡慕，他对你是奔着长远发展谈恋爱的，而且对你好都是发自内心，打心眼儿里认定你，如果说不是真的爱你，未免对也他太苛刻了。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "月亮正位",
                    cardImg3: "/tarot1/card/18_yue_liang.jpg",
                    cardDescription3: "选择这张牌的朋友，你有必要怀疑下他对你态度了，很可能他瞒了你很多事情，比如有家庭还装单身跟你谈恋爱，明明放不下前任还来你这里找安慰，所以一定要调查清楚再在一起，不然被小三了自己还蒙在鼓里，这样的人人品就有问题，你敢要吗？",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "圣杯九正位",
                    cardImg4: "/tarot1/card/sheng_bei_9.jpg",
                    cardDescription4: "选择这张牌的朋友，他跟你在一起真的是觉得自己赚到了，开心的像个两百斤的胖子，而且他本身性格也乐观开朗，没那么多的阴暗小九九，忠于自己内心，跟你在一起就一定是真的爱你了，享受当下就好，不要想东想西怀疑他的真心了。",
                    rateName4: "",
                    rate4: 0
                });

                await Models.divination.create({
                    picTop: "/tarot1/img/24goubugouwenrou.jpg",
                    picSquare: "/tarot1/img/24goubugouwenrous.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "在他眼里你够不够温柔？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "命运之轮正位",
                    cardImg1: "/tarot1/card/10_ming_yun_zhi_lun.jpg",
                    cardDescription1: "在你的恋人心中，你就是最温柔的，你的存在是最妙不可言的幸福，因为有了你，他的世界才更增添了一抹亮色，你虽然偶尔也会耍耍小脾气，但在他的眼里，这都是对他信任的表现，他包容着你的一切，也深深爱着你。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "星币二正位",
                    cardImg2: "/tarot1/card/xing_bi_2.jpg",
                    cardDescription2: "对于这个答案，你恐怕要失望了，在他的眼里，你不仅不够温柔，而且老惹麻烦，也许你就是有这样咋咋呼呼的性格，但是在他的眼里，这就是你的缺点，一时的欢愉是掩盖不了本质矛盾的，要么痛快放手，要么痛改前非，自己决定吧。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "宝剑七逆位",
                    cardImg3: "/tarot1/card/n/bao_jian_7.jpg",
                    cardDescription3: "对于你的恋人来说，你是一味苦口的良药，在心底里，他认为你是足够温柔的，但是对于你爱着他的方式，他虽然心里清楚是正确的，但是总归是有些小变扭，他爱着你，也想要和你一起走下去，他会为你改变自己，也希望你能一直温柔的陪伴他。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "高塔正位",
                    cardImg4: "/tarot1/card/16_gao_ta.jpg",
                    cardDescription4: "不知道从什么时候开始，你们的关系已经僵化到随时要破裂的地步了，你们之间的感情就像一座摇摇欲坠的尖塔，一开始，在他的心中，你也是温柔可爱的，但是相处到了后来，这份温柔在他心里就变味了，要补救很简单，但是我不希望你因此迷失自我。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/25yixingyuan.jpg",
                    picSquare: "/tarot1/img/25yixingyuans.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "2019年你的异性缘怎么样？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "权杖女王逆位",
                    cardImg1: "/tarot1/card/n/quan_zhang_wang_hou.jpg",
                    cardDescription1: "这张牌出现你就要注意了，在2019年你可能会有相当不错的异性缘，但是各种问题也随之而来，对你抱有好感的对象的质量良莠不齐，有些人就完全是个渣！这个时候就需要你自己擦亮双眼了，仔细观察对你大献殷勤的人，分辨出其真面目！",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "权杖三逆位",
                    cardImg2: "/tarot1/card/n/quan_zhang_3.jpg",
                    cardDescription2: "在这一年里，你可能会惊奇的发现自己可能在诸多的异性中找到了自己的归宿，但是事实并非你想象的那么简单，可能到头来，你掏心掏肺对待的人其实是一只白眼狼，所有对感情的幻想将会在顷刻之间变成泡沫，让你竹篮打水一场空。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "女皇正位",
                    cardImg3: "/tarot1/card/3_nv_huang.jpg",
                    cardDescription3: "毫无疑问的，这一年里你的异性缘简直是斩也斩不断，桃花朵朵都在你身边不断绽放，你大可以放心收获一段甜蜜的爱情，但是因为摆在你面前的选择太多，也会使你变得犹豫不决！",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "星币八逆位",
                    cardImg4: "/tarot1/card/n/xing_bi_8.jpg",
                    cardDescription4: "这一年里你已经有了相当不错的异性缘了，但是对此仍然感到不满足的你还是想要再观望一段时间，看看是否有更合适的人选，可是做人最忌讳的就是贪心，你这一贪，不仅无法得到什么，反而会把之前对你有些好感的异性全耗光了热情，百害而无一利。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/26shengzhijiaxing.jpg",
                    picSquare: "/tarot1/img/26shengzhijiaxings.jpg", //在列表中展示的方形图
                    isBanner: true, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "2019年你能否把握住加薪升职的机会？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "愚人正位",
                    cardImg1: "/tarot1/card/0_yu_ren.jpg",
                    cardDescription1: "抽到这张牌的朋友，你的职场能力令人担心。目前的你缺乏方向或尚无目标，整天毫无目的，你应该努力改变现状，在工作中提升自己的职场能力。否则，你不可能抓住升迁机会。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "宝剑骑士正位",
                    cardImg2: "/tarot1/card/bao_jian_qi_shi.jpg",
                    cardDescription2: "抽到这张牌的朋友，你需要设定目标，你存在着没有目标的问题。你需要的不是升迁的机会，而是在工作中集中精神，设定更明确的目标。目标是你前进的方向，只有目标明确你才有可能获得成功。而且，当你完成目标后，会特有成就感，对自己所从事的工作更有兴趣和激情。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "星币八正位",
                    cardImg3: "/tarot1/card/xing_bi_8.jpg",
                    cardDescription3: "抽到这张牌的朋友，你正在努力创造升迁的机会。建议力量有必要更集中一些。如果你能好好的确定方向，获取更大的成功对你来说并非难事。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "皇帝正位",
                    cardImg4: "/tarot1/card/4_huang_di.jpg",
                    cardDescription4: "抽到这张牌的朋友，你可能会错过升迁的机会，你的能力很强，但是你的野心很大，所以易杂乱无章，各种目标都想达到，这会使你因忙乱而错过成功的机会。你不妨与这方面的成功人士谈谈，或许你的成就动机很强，但欠缺必要的知识和方向，不要让你的野心毁了你的前程。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/27daomeizhishu.jpg",
                    picSquare: "/tarot1/img/27daomeizhishus.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "近期你的倒霉指数是多少？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "恋人逆位",
                    cardImg1: "/tarot1/card/n/6_lian_ren.jpg",
                    cardDescription1: "意味着分离、对立以及三角关系。选到这张牌的朋友，你的倒霉指数大概是60%，最明显是体现在爱情方面。对于有伴侣的人来说，近期你们的爱情会历经挫折。你和伴侣有可能会爆发争吵、冷战、甚至决定分开的状况。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "圣杯三逆位",
                    cardImg2: "/tarot1/card/n/sheng_bei_3.jpg",
                    cardDescription2: "意味着团体失和、结盟失败及容易乐极生悲。选到这张牌的朋友，你的倒霉指数大概是55%，最明显是体现在人际关系方面。近期你与工作团队伙伴或身边的朋友们会出现关系生隙的状况，造成这种状况的原因可能是因为你们之间意见不合、原则上的观念发生了分歧。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "权杖九正位",
                    cardImg3: "/tarot1/card/quan_zhang_9.jpg",
                    cardDescription3: "意思是警觉、防御以及自我保护。选到这张牌的朋友，你的倒霉指数大概是70%，最明显是体现在精神及健康方面。近期你或许会迎来生活上的一些重大挑战，这个挑战可能会带给你较大的精神压力，你须得鼓起勇气，强悍一点，以坚定的信念去应对危机。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "星币五正位",
                    cardImg4: "/tarot1/card/xing_bi_5.jpg",
                    cardDescription4: "意味着艰困、物质或精神上的匮乏。选到这张牌的朋友，你的倒霉指数大概是65%，最明显是体现在金钱物质方面。在近段时间你的财务状况可能不太如意，或会出现破财、花销过大的情况，严重者还可能会入不敷出，收支失衡，缺乏财务支持，甚至负债。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/28shibiehuangyan.jpg",
                    picSquare: "/tarot1/img/28shibiehuangyans.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你识别谎言的能力有多强？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "正义正位",
                    cardImg1: "/tarot1/card/11_zheng_yi.jpg",
                    cardDescription1: "代表理性和公平。抽到这张牌的朋友，说明你本身是一个嫉恶如仇的人。在你的世界里，黑白分明，没有灰色地带。你观察事物的能力很强，许多人没有注意到的细节都逃不过你的眼睛。只要有人在你面前撒谎，你基本上都能看得出来。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "圣杯侍从正位",
                    cardImg2: "/tarot1/card/sheng_bei_shi_cong.jpg",
                    cardDescription2: "代表善良和单纯。抽到这张牌的朋友，说明你是一个心地善良的人。在与别人交往的过程中，你总不愿意把人往坏处想。所以，与其说你识别谎言的能力不高，不如说你不愿辜负人与人之间的基本善意。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "隐士正位",
                    cardImg3: "/tarot1/card/9_yin_shi.jpg",
                    cardDescription3: "代表智慧和清高。抽到这张牌的朋友，你看待事物的角度比较客观，很少会感情用事。由于你长时间以第三角度去观察事物，所以你识谎的能力很高，直觉也很敏锐。不过大部分时候，你都懒得去管其他人的闲事，所以你的能力并不被大多数人所知道。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "月亮正位",
                    cardImg4: "/tarot1/card/18_yue_liang.jpg",
                    cardDescription4: "代表多疑和不安。抽到这张牌的朋友，说明你是一个没有安全感的人。你认为别人撒谎欺骗你是常事，每时每刻都想拆穿谎言寻找真相。虽然有时的确让你撞破了谎言，但你的怀疑大部分都是错的。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/29xinggequedian.jpg",
                    picSquare: "/tarot1/img/29xinggequedians.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你性格中最大的缺点是什么？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "宝剑骑士正位",
                    cardImg1: "/tarot1/card/bao_jian_qi_shi.jpg",
                    cardDescription1: "代表着强势、狂放、急躁及言行不一。选到这张牌的朋友，你性格里有个很大的缺点，就是想事情可能会极端，耐心不足。\n你的脾气不好，比较急躁，做事或会不计后果，容易和别人起冲突。建议要适当收敛自己的脾性，以免吃了性格的亏，败坏自己的人缘。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "圣杯七正位",
                    cardImg2: "/tarot1/card/sheng_bei_7.jpg",
                    cardDescription2: "意思是想象、梦境、选择以及幻想。选到这张牌的朋友，你最大的性格缺点是不切实际、幻想过多。比如在做一件事或一项工作之前，你总是对其抱有无限憧憬，认为前景大好，却不会多作分析调研，但凭感觉做事，到最后得到的结果往往不如人意。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "宝剑二正位",
                    cardImg3: "/tarot1/card/bao_jian_2.jpg",
                    cardDescription3: "意思是僵持、对立、逃避以及过度自我保护。选到这张牌的朋友，你最大的性格缺点是逃避问题。当遇上棘手的难题时，有时候并非你自身能力不足以解决，而是你害怕面对问题，宁愿采取逃避的方式，也不愿意直面解决问题前或会令你感到痛苦的过程。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "力量逆位",
                    cardImg4: "/tarot1/card/n/8_li_liang.jpg",
                    cardDescription4: "意思是缺乏自信、退缩以及情绪化。选到这张牌的朋友，你最大的性格缺点是对自己没有信心。这个缺点可能会导致你失去一些本该可以得到的机会。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/30aicuorenle.jpg",
                    picSquare: "/tarot1/img/30aicuorenles.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你爱错人了吗？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "魔术师正位",
                    cardImg1: "/tarot1/card/1_mo_shu_shi.jpg",
                    cardDescription1: "这张牌表示主动，开始和沟通，意味着你们的关系处在比较良性的状态。因为你本人很有魅力，也拥有让自己幸福的能力，所以你和Ta在一起无关于对错，你总是能把生活越过越好。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "战车正位",
                    cardImg2: "/tarot1/card/7_zhan_che.jpg",
                    cardDescription2: "这张牌有空虚和强硬的意思，代表你们之间缺少情感交流和软性对话。也表示对待感情你的处理方式太过糟糕，你总是能把一段感情搞得一团乱麻。所以先改变自己，再对Ta提要求吧。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "命运之轮正位",
                    cardImg3: "/tarot1/card/10_ming_yun_zhi_lun.jpg",
                    cardDescription3: "这张牌表示转变和契机。在感情方面有姻缘天定的意思，所以请相信，你并没有爱错人。抽到这张牌意味着在Ta心中，你很重要。相识至今，你们经历了很多风风雨雨，Ta早已经做好了和你白头偕老的打算。\n从这张牌看，你们迎来了感情的转折点，这段关系将发生实质性的变化，不过这种变化是在向好的方向发展，你们的关系会逐渐升温，彼此之间也会重新燃起激情。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "月亮正位",
                    cardImg4: "/tarot1/card/18_yue_liang.jpg",
                    cardDescription4: "这张牌表示不安和多变，意味着你对这段感情充满了担忧。所以你们这段感情的未来并不乐观，你值得更好的对待。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/31xiaoquexing.jpg",
                    picSquare: "/tarot1/img/31xiaoquexings.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "近期你的生活会有哪些小确幸？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "星币五正位",
                    cardImg1: "/tarot1/card/xing_bi_5.jpg",
                    cardDescription1: "抽到这张牌的人未来一段时间会印证一句话：越努力越幸运。当下，你对自己其实有很多不满，对外表有诸多挑剔，你清晰的认识到自己的才华撑不起野心，你特想改变。好消息是，接下来这段时间是你的幸运期，只要你愿意去行动，都会收获到不错的成果。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "圣杯十正位",
                    cardImg2: "/tarot1/card/sheng_bei_10.jpg",
                    cardDescription2: "前段时间，感情经历一片荒芜和混乱的人有福啦，未来一段时间，在情感方面你会遇到一些很好的事情。单身者有邂逅一段感情的可能哦。有伴者接下来一段时间会进入满足期，你们的感情会变得更加甜蜜。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "权杖七正位",
                    cardImg3: "/tarot1/card/quan_zhang_7.jpg",
                    cardDescription3: "这段时间对你而言是很好的提升期，你整体的行动力，创意和思路都会得到提升，之前遭遇的瓶颈期也会有突破性进展。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "教皇正位",
                    cardImg4: "/tarot1/card/5_jiao_huang.jpg",
                    cardDescription4: "抽到这张牌的人，未来一段时间，你的好运主要体现在两个方面：第一，单身者的桃花运开始走升，这段时间你很可能会遇到一个有意思的人，彼此擦出火花。\n第二，这段时间你在事业方面会有贵人相助。对方可能会解决你某个难题或者带给你一些很好的资源，传授你一些不错的赚钱方式等等。另外，如果你还是学生，最近学业运很好哦。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/32xiaoqueshang.jpg",
                    picSquare: "/tarot1/img/32xiaoqueshangs.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "近期你的生活会有哪些小确丧？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "星币五正位",
                    cardImg1: "/tarot1/card/xing_bi_5.jpg",
                    cardDescription1: "破财会是未来一段时间，你遇到的最倒霉的一件事。抽到这张牌的人原本就很缺钱，可是雪上加霜的是，接下来你的生活各种意外支出会增多。例如冲动消费，电子产品损坏，各种学习费用、物品丢失或者投资借贷等方面出现问题等等。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "圣杯十正位",
                    cardImg2: "/tarot1/card/sheng_bei_10.jpg",
                    cardDescription2: "这段时间你的人际关系不太和谐，可能会被人背后非议或者背黑锅等等，尤其是事业上和同事的关系会变得很紧张。\n建议抽到这张牌的人，未来一段时间时间做人切勿张扬，多做事少说话，不要太较真，控制好自我情绪，能够避开很多烦心事情的发生。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "权杖七正位",
                    cardImg3: "/tarot1/card/quan_zhang_7.jpg",
                    cardDescription3: "未来一段时间，你在感情方面的发展很不顺利。单身者感情难有进展，虽然你有认识新朋友，但彼此很难来电。另外，要特别提醒，部分女性要小心骗P男，切记，切记！",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "教皇正位",
                    cardImg4: "/tarot1/card/5_jiao_huang.jpg",
                    cardDescription4: "这段时间，你在交流方面容易出现问题。在工作时，你和同事可能会因为词不达意或者沟通方式不对导致彼此关系出现一些不愉快。在感情方面，可能会因为太敏感容易想太多，或者因为一些小事就开始作，对方会感觉你太无理取闹。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/33xingzuoyuanfen.jpg",
                    picSquare: "/tarot1/img/33xingzuoyuanfens.jpg", //在列表中展示的方形图
                    isBanner: true, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你和哪些星座最有缘分？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "皇帝正位",
                    cardImg1: "/tarot1/card/4_huang_di.jpg",
                    cardDescription1: "意思是是权力、威严、自信和克己严谨。选到这张牌的朋友，你跟白羊座、狮子座、金牛座最有缘分。\n白羊座敢于挑战，喜欢迎难而上，面对挫折从不轻言放弃；狮子座自信霸气，有着非同一般的领导能力，并且待人真诚；金牛座成熟稳重，能给人以踏实及安全感。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "正义正位",
                    cardImg2: "/tarot1/card/11_zheng_yi.jpg",
                    cardDescription2: "意思是公正、均衡、理性的思考。选到这张牌的朋友，你跟天秤座、双子座、水瓶座最有缘分。\n天秤座追求平衡公正，凡事要求公平，看问题不会带个人主观意识；双子座可动可静，该正经的时候从不会误事；水瓶座智商很高，知性与理性并存。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "恶魔正位",
                    cardImg3: "/tarot1/card/15_e_mo.jpg",
                    cardDescription3: "恶魔正位的含义是欲望、物质以及对目标的积极争取。选到这张牌的朋友，你跟摩羯座、天蝎座、巨蟹座最有缘分。\n摩羯、天蝎和巨蟹其实都是野心勃勃的星座，摩羯座冷静沉稳，遇到再大的事也不会方寸大乱；天蝎座气魄十足，重情重义；巨蟹座温柔细腻，有不达目的不放弃的决心。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "圣杯骑士正位",
                    cardImg4: "/tarot1/card/sheng_bei_qi_shi.jpg",
                    cardDescription4: "意思是创意、梦幻、艺术，通常代表着一位浪漫的情人。选到这张牌的朋友，你跟射手座、处女座和双鱼座最有缘分。\n射手座热情奔放，见解独到，很受异性的欢迎；处女座追求完美，做人做事几乎都无可挑剔；双鱼座想象力丰富，极富创意，是制造浪漫的能手。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/34jisuikaigua.jpg",
                    picSquare: "/tarot1/img/34jisuikaiguas.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你的人生会在几岁开挂？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "隐士正位",
                    cardImg1: "/tarot1/card/9_yin_shi.jpg",
                    cardDescription1: "意思是内敛、孤独、智慧及行事谨慎，选到这张牌的朋友，你是属于大器晚成的类型。你的人生大约在38岁以后会像开了挂一样。你是一个注重细节的完美主义者，这个特点将随着你年龄的增长而变得愈发明显。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "权杖国王正位",
                    cardImg2: "/tarot1/card/quan_zhang_guo_wang.jpg",
                    cardDescription2: "意思是热情、坚毅、创造力及权威领导者，选到这张牌的朋友，你的人生大约在35-40岁之间会像开了挂一样。你是一个行动力十足的人，拥有强烈的决心，性格也如烈火一般热情活跃。你敢于冒险，精于开辟疆土。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "战车正位",
                    cardImg3: "/tarot1/card/7_zhan_che.jpg",
                    cardDescription3: "战车牌的含义是意志、自律及强烈的野心。选到这张牌的朋友，你的人生大约在27-33岁之间会像开了挂一样。你是一个好胜心比较强的人，怀有强烈的野心。在你喜爱的行业中，你很容易能成为那个领域里的佼佼者。因为你的意志力足够坚定，你的人生不会开挂得太晚，当机遇来临时要注意把握。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "星币王后正位",
                    cardImg4: "/tarot1/card/xing_bi_wang_hou.jpg",
                    cardDescription4: "含义是繁荣、安定及财富的成功。选到这张牌的朋友，你的人生大约在30-36岁之间会像开了挂一样。你善用理性思维逻辑思考事情，很有经商头脑，能干可靠的品性让许多人都愿意相信你，你也凭着自己的努力获得不俗的成绩，财务富足。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/35chuguizhishu.jpg",
                    picSquare: "/tarot1/img/35chuguizhishus.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你在爱情中的出轨指数是多少？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "权杖九正位",
                    cardImg1: "/tarot1/card/quan_zhang_9.jpg",
                    cardDescription1: "选择这张牌的朋友，出轨指数是百分之二十八。你是一个在婚姻关系中占有欲很强的一个人，小到家里的柴米油盐，大到重大事情的决策，你都希望对方能够听你的，或者是跟你报备，你希望时刻掌握对方的一举一动。所以，这样过分在乎对方的你，怎么会选择出轨呢？",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "权杖首牌正位",
                    cardImg2: "/tarot1/card/quan_zhang_1.jpg",
                    cardDescription2: "选择这张牌的朋友，出轨指数是百分之六十五。在你的心目中，婚姻并不是生命中最重要的一部分，或者说哪怕是婚姻也只是你的一个跳板，你是一个很会审时度势的人，如果当一段关系已经对你没有好处的时候，你就会毫不犹豫选择放弃。所以这样的你，会出轨的指数毫不犹豫是第一。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "圣杯侍从逆位",
                    cardImg3: "/tarot1/card/n/sheng_bei_shi_cong.jpg",
                    cardDescription3: "选择这张牌的朋友们，你的出轨指数是百分之三十二。你是一个比较容易喜欢胡思乱想的人，当你们之间出现问题的时候，你的第一选择不是跟对方说清楚，而是逃避，哪怕你真的对他有什么不满的地方，你也不会去说，只会一个人憋在心里胡思乱想。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "宝剑十正位",
                    cardImg4: "/tarot1/card/bao_jian_10.jpg",
                    cardDescription4: "你的出轨指数是百分之十，你是一个有极强控制欲的人，对于你来说，只要是你的人或者是你的物，就要听你的话。当你喜欢一个人的时候，会死心塌地，那个人越不理睬你，相反你就越爱他；但是当你被别人喜欢的时候，你又想退缩，只想待在自己的世界之中。这样的你，出轨几率少之又少！",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/36meilizhi.jpg",
                    picSquare: "/tarot1/img/36meilizhis.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你的魅力值是什么？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "圣杯皇后正位",
                    cardImg1: "/tarot1/card/sheng_bei_wang_hou.jpg",
                    cardDescription1: "选择这张牌的朋友，拥有着高贵的的情感和纯洁的心灵，想象力丰富，具有爱心和母性以及温柔的特质。深情并珍惜爱情，是个热心公正的人，属于倾听多，说的少的人。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "星币国王正位",
                    cardImg2: "/tarot1/card/xing_bi_guo_wang.jpg",
                    cardDescription2: "选择这张牌的朋友，脚踏实地，责任心很强，尽管缺少了冒险精神。但是，是最值得他人信任的人。很务实。为人慷慨大方，富足并且事业有成，性格稳重，愿意与他人分享。对爱情的表现是愿意提供物质上的满足，虽然不够浪漫，但是稳健可靠。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "权杖侍从正位",
                    cardImg3: "/tarot1/card/quan_zhang_shi_cong.jpg",
                    cardDescription3: "选择这张牌的朋友，长相清秀，精力充沛。热情洋溢。安静对他来说有一点困难。待人热忱而和善。只是不太能了解对方的感受。但是也是忠诚的人。在感情方面愿意付出如一的坚持。对家庭和伴侣也是懂得照顾跟体贴的人。但是会有些急躁。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "宝剑骑士正位",
                    cardImg4: "/tarot1/card/bao_jian_qi_shi.jpg",
                    cardDescription4: "选择这张牌的朋友，勇往直前，豪气云天。不畏权贵，喜欢新鲜事物与改变。年龄介于22到30岁之间，思维敏捷，属于行动派。对于感情的稳定性有所欠缺，但是跟你在一起会有很多新奇的体验。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/37qianrengonglue.jpg",
                    picSquare: "/tarot1/img/37qianrengonglues.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你的前任现在对你什么感觉？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "死神正位",
                    cardImg1: "/tarot1/card/13_si_shen.jpg",
                    cardDescription1: "选择这张牌的朋友，代表你的前任对你已经完全放下了，他觉得你们之间的感情已经画上了一个句号。所以呢，希望你也可以尽快放下，挥别错的，才能相逢对的，告别过去，才能迎接新的开始。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "圣杯六正位",
                    cardImg2: "/tarot1/card/sheng_bei_6.jpg",
                    cardDescription2: "选择这张牌的朋友，代表你的前任对你还没有完全放下，你们过去的点点滴滴和美好回忆还时常浮现在ta的脑海里。所以如果你有想重新修复这段感情的想法，可以尝试一下。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "星币二正位",
                    cardImg3: "/tarot1/card/xing_bi_2.jpg",
                    cardDescription3: "选择这张牌的朋友，代表你的前任对你并没有完全放下，可能也会有想复合的想法，但是呢，也许他/她身边已经有一个新的人出现，他/她现在正处于犹豫和纠结中，接下来怎么做，还要取决于你内心真实的想法。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "宝剑十逆位",
                    cardImg4: "/tarot1/card/n/bao_jian_10.jpg",
                    cardDescription4: "选择这张牌的朋友，代表你之前做了一些事儿深深伤害了你的前任，虽然这些不好的情绪和感受还是会触动到ta，但是他/她已经开始慢慢从过去的阴影中走了出来，想要重新开始，所以ta不希望和你再有任何瓜葛。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/38shihunduixiang.jpg",
                    picSquare: "/tarot1/img/38shihunduixiangs.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你的适婚对象啥时候出现？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "权杖五正位",
                    cardImg1: "/tarot1/card/quan_zhang_5.jpg",
                    cardDescription1: "抽到这张牌的人眼光很高，但你的性格太被动，没有100%的把握，让你主动告白很难。你可能在感情上受过伤，在内心深处并不相信永恒的爱情，这种戒备敏感的心理也让你错过了不少缘分。未来一段时间脱单有一定难度。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "战车正位",
                    cardImg2: "/tarot1/card/7_zhan_che.jpg",
                    cardDescription2: "抽到这张牌的人很多都是母胎单身，基本处于只想暴富，对脱单不抱希望的状态了。从这张牌看，运气多出现在职场和财运方面，桃花运一般。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "星星正位",
                    cardImg3: "/tarot1/card/17_xing_xing.jpg",
                    cardDescription3: "抽到这张牌说明你很享受目前的单身生活，虽然有时候难免会感觉孤独，但还是不愿意凑合将就。在生活和工作上，你变得越来越优秀，但身边的朋友圈层级却没有提升，目前你陷入一个高不成低不就的尴尬中。不过，从这张牌看，近期你的桃花运会很不错。要记得好好把握哦。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "宝剑二正位",
                    cardImg4: "/tarot1/card/bao_jian_2.jpg",
                    cardDescription4: "你单身的原因很简单，圈子太小，你又太宅，让你去认识新朋友，你又太懒了。从这张牌看，这个春天能否脱单全看你自己的选择。你身上其实一直有一种特殊的魅力，让异性忍不住靠近，不过你的心态和做法却白白错过或舍弃多次脱单的机会。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/39qinmidu.jpg",
                    picSquare: "/tarot1/img/39qinmidus.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你和Ta的感情亲密度有多少？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "皇后正位",
                    cardImg1: "/tarot1/card/3_nv_huang.jpg",
                    cardDescription1: "亲密度：80%。对待感情，你的态度一直是理智而成熟，你注重感情中的平等，清楚自己要什么，也懂得调节双方的情绪，所以和你在一起是一件很幸福的事情。从这张牌看，你们的未来比较乐观，虽然还会遇到其他困难，但只要你们愿意去解决，难题都是纸老虎，不堪一击。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "星币四正位",
                    cardImg2: "/tarot1/card/xing_bi_4.jpg",
                    cardDescription2: "亲密度：60%。对待感情问题时，你太敏感了，总习惯胡思乱想，而且你控制欲和占有欲也太强，总希望在一段感情中拥有绝对的支配权。从这张牌看，对方虽然喜欢你，但和你在一起很累，接下来的一段时间，你们的关系会经受一些考验。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "圣杯八正位",
                    cardImg3: "/tarot1/card/sheng_bei_8.jpg",
                    cardDescription3: "亲密度：40%。抽到这张牌说明对这段感情你一直有很多不满足，总是情不自禁的羡慕别人，拿另一半和其他人作对比。很遗憾你们的亲密度并不高，和Ta在一起你感觉很委屈，而Ta内心也承受了很大的压力，加上你们平时又很少沟通，凡事都习惯性憋着，这段关系其实已经岌岌可危了。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "太阳正位",
                    cardImg4: "/tarot1/card/19_tai_yang.jpg",
                    cardDescription4: "亲密度：99%。抽到这张牌说明相比于以前在感情中的猜忌追逐，现在的你更倾向于一段稳定的关系，想和另一半能够相互扶持，一起对抗未来的风雨。从这张牌看，我要恭喜你，因为Ta对你的亲密度远超你的预期，你在Ta心中非常重要。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/40xingyunzhishu.jpg",
                    picSquare: "/tarot1/img/40xingyunzhishus.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你近期的幸运指数有多高？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "太阳正位",
                    cardImg1: "/tarot1/card/19_tai_yang.jpg",
                    cardDescription1: "代表快乐和希望。抽到这张牌意味着近期你的状态很好。在职场上，你基本是顺风顺水的。即使偶尔遇到一些难题，你也能很快解决，与周围人的相处也很融洽。除此之外，你的心态也很好。不会为还未发生的事情过分担忧。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "倒吊人正位",
                    cardImg2: "/tarot1/card/12_dao_diao_ren.jpg",
                    cardDescription2: "代表换位思考和等待。抽到这张牌意味着近期你有一点点倒霉。工作上，你负责的内容有些停滞。你用了很多的办法，却依旧没有任何的进展。感情方面，单身者则一直没有桃花出现。有伴者，则会与伴侣产生不少的矛盾。此刻你应该先暂停一切行动，及时调整好自己的心态，转变看问题的角度，好好想清楚目前问题的根源在哪再作打算。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "权杖十正位",
                    cardImg3: "/tarot1/card/quan_zhang_10.jpg",
                    cardDescription3: "代表压力和责任。抽到这张牌意味着，近期你不论是身体还是精神的状态都不太好。主要原因在于你对自己的要求太高了，总是希望能把身边的每件事情都做到一百分，丝毫不考虑自身的承受能力。每个人的精力都是有限的。是时候该把一些事情放下，让该承担的人去承担起，你才能好好休息。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "命运之轮正位",
                    cardImg4: "/tarot1/card/10_ming_yun_zhi_lun.jpg",
                    cardDescription4: "代表机会和进展。抽到这张牌意味着，近期你的运气忽好忽坏。有时运气非常好，随便抽个奖都能得到自己喜欢的物品。但有时运气又非常差，突然会发生一些不好的事情。感觉命运天天和你开玩笑，让你无可奈何。不过，多数情况下还是好事占的比例多一些。",
                    rateName4: "",
                    rate4: 0
                });


                await Models.divination.create({
                    picTop: "/tarot1/img/41konghunzhishu.jpg",
                    picSquare: "/tarot1/img/41konghunzhishus.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你的恐婚指数是多少？",
                    priceOld: 1990,
                    priceNew: 690,
                    sales: 35,
                    introduction: "塔罗测试介绍",
                    notice: "notice",
                    cardName1: "愚人正位",
                    cardImg1: "/tarot1/card/0_yu_ren.jpg",
                    cardDescription1: "含义是自由、天真以及流浪。选中这张牌的朋友，你有着中度的恐婚心态。要你安定下来是一件比较难的事情，你不会遵循传统思想，认为结婚生子是人生必经的阶段。相反，对你来说，若人生剔除了结婚生子这两项任务，你将能空出更多的时间去探索新奇事物，去四处旅游，看看更为广阔的世界。",
                    rateName1: "",
                    rate1: 0,
                    cardName2: "宝剑王后正位",
                    cardImg2: "/tarot1/card/bao_jian_wang_hou.jpg",
                    cardDescription2: "含义是道德、正义以及理智。选到这张牌的朋友，你有着重度的恐婚心态。感情本是凭借感性主导的事情，可在面对爱情时你会用理性的态度去看待，甚至随时想结束一段感情。如果要你因为恋爱了很久、已经到了适婚年龄而结婚的话，那么你更情愿继续单身下去。",
                    rateName2: "",
                    rate2: 0,
                    cardName3: "世界正位",
                    cardImg3: "/tarot1/card/21_shi_jie.jpg",
                    cardDescription3: "含义是整合、成就、满足以及实现。选到这张牌的朋友，你有着轻微的恐婚心态。你有着凡事顺其自然的理念，所以你其实并不算真正的恐婚，就算有恐婚的时候，也不过是到了适婚的年龄，又或是已经准备步入婚姻殿堂时才会有所焦虑。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "隐士正位",
                    cardImg4: "/tarot1/card/9_yin_shi.jpg",
                    cardDescription4: "含义是探索、清高以及独立。选到这张牌的朋友，你有着极重的恐婚心态。很多人在看到身边的朋友一个个结婚时，内心都会焦急不已。可你却不一样，当你看到身边的朋友并非为了爱情而结婚时，你会感到悲哀与恐惧。你恐惧自己有一天也会向传统观念妥协，担忧自己会和一个适合却没有爱情的人结婚，于你而言这简直是噩梦般的存在。",
                    rateName4: "",
                    rate4: 0
                });

                console.log("插入数据成功：divination");

                await Models.channel.create({
                    id: "official",
                    name: "自营渠道",
                    description: "自营渠道"
                });
                console.log("插入数据成功：channel");

                let userData = {
                    openid: "ofPbp1XuYIMpD1CUUTWsqmMcB63c",
                    unionid: "orLCIt7g80RkTeq3STM850vAaJ4Q",
                    wechatName: "wangpan🐆",
                    avatar: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJGLmN0Fooy9wTnHrhiaQJSiayueGhlUQnI36ibNsGFdicLbC9PXUrOTnH3NQbx58I46cAeJU7mAwQVkQ/132",
                    channelId: 'official'
                };
                await  Models.user.create(userData);
                // userData.openid = "2";
                // userData.unionid = "unionid2";
                // userData.wechatName = "name2";
                // userData.avatar = "avatar2";
                // await  Models.user.create(userData);
                console.log("插入数据成功：user");
            }

            await sequelize.close();
            console.log("关闭数据库连接成功");
            console.log("bye!");
        } catch (err) {
            console.log("出错了：", err);
        }
    })();