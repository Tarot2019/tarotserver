//create all tables
const Models = require('./models.js');
const { sequelize } = require('./db');
const insertDebugData = true;
(async () => {
        try {
            if(insertDebugData) {
                await Models.order.drop();
                await Models.user.drop();
                await Models.divination.drop();
                console.log("-------- 全部表删除完成 --------");
            }


            console.log("-------- begin 创建关联 --------");
            Models.user.belongsToMany(Models.divination, {as: "Preorders", through: "userPreorder"});
            Models.divination.belongsToMany(Models.user, {as: "Collectors", through: "userPreorder"});

            Models.user.belongsToMany(Models.divination, {as: "Orders", through: Models.order});
            Models.divination.belongsToMany(Models.user, {as: "Consumers", through: Models.order});

            Models.channel.hasMany(Models.user);
            Models.channel.hasMany(Models.order);
            Models.channel.hasMany(Models.tarot2record);
            // Models.user.belongsToMany(Models.divination, {through: Models.order});
            // Models.divination.belongsToMany(Models.user, {through: Models.order});

            // Models.divination.hasMany(Models.preorder);
            // Models.divination.hasMany(Models.order);
            // Models.preorder.hasOne(Models.divination);
            // Models.order.hasOne(Models.divination);
            console.log("-------- end 创建关联 --------");


            await sequelize.sync();
            // await Models.divination.sync();
            // console.log("创建表成功：divination");
            // await Models.user.sync();
            // console.log("创建表成功：user");
            // await Models.preorder.sync();
            // console.log("创建表成功：preorder");
            // await Models.order.sync();
            // console.log("创建表成功：order");
            console.log("++++++++ 全部表创建完成 ++++++++");

            //插入测试数据
            if (insertDebugData) {
                //1
                await Models.divination.create({
                    picTop: "/tarot1/img/1fenshoufuhe.jpg",
                    picSquare: "/tarot1/img/1fenshoufuhes.jpg", //在列表中展示的方形图
                    isBanner: true, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "测测你和ta分手后还会复合吗？",
                    priceOld: 4000,
                    priceNew: 2000,
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
                    priceOld: 4000,
                    priceNew: 2000,
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
                    isBanner: true, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你现在的工作还值不值得坚持？",
                    priceOld: 4000,
                    priceNew: 2000,
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
                    isBanner: true, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你会遇见什么样的爱情？",
                    priceOld: 4000,
                    priceNew: 2000,
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
                    priceOld: 4000,
                    priceNew: 2000,
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
                    priceOld: 4000,
                    priceNew: 2000,
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
                    priceOld: 4000,
                    priceNew: 2000,
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
                    priceOld: 4000,
                    priceNew: 2000,
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
                    picTop: "/tarot1/img/1fenshoufuhe.jpg",
                    picSquare: "/tarot1/img/1fenshoufuhes.jpg", //在列表中展示的方形图
                    isBanner: false, //是否在首页Banner
                    isHome: true, //是否展示在首页
                    title: "塔罗测试",
                    subTitle: "你最让异性着迷的特质是什么？",
                    priceOld: 4000,
                    priceNew: 2000,
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
                    priceOld: 4000,
                    priceNew: 2000,
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
                    priceOld: 4000,
                    priceNew: 2000,
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
                    priceOld: 4000,
                    priceNew: 2000,
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
                    priceOld: 4000,
                    priceNew: 2000,
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
                    priceOld: 4000,
                    priceNew: 2000,
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
                    priceOld: 4000,
                    priceNew: 2000,
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
                    cardName3: "恋人",
                    cardImg3: "/tarot1/card/6_lian_ren.jpg",
                    cardDescription3: "抽到恋人牌，意味着你们一定是经营在阳光下的健康恋情，命中真爱的几率非常大，想恋爱的可以放心投入，享受过程，想结婚的遇到这样的恋爱对象就嫁了吧。",
                    rateName3: "",
                    rate3: 0,
                    cardName4: "圣杯四",
                    cardImg4: "/tarot1/card/sheng_bei_4.jpg",
                    cardDescription4: "选择这张牌的朋友，一副对你不感兴趣不理人的样子，不是你单相思就是他一头热，或许是近期本来就不打算谈恋爱，也或许是激情耗尽早已有了分手的打算。总之，遇到这样的人就克制克制你躁动的心，别去热脸贴人家冷屁股了，都懒得搭理你，谈真爱就未免太可笑了，不爱你的人果断放弃，没感觉的恋爱分手对双方都是解脱。",
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