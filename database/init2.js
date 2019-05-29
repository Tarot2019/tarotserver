//create all tables
const Models = require('./models.js');
const { sequelize } = require('./db');
const insertDebugData = true;

const interpretation = Models.interpretation;
const card = Models.card;
const question = Models.question;
const questionGroup = Models.questionGroup;
const tarot2record = Models.tarot2record;
(async () => {
        try {
            if(insertDebugData) {
                await interpretation.drop();
                await card.drop();
                await question.drop();
                await questionGroup.drop();
                await tarot2record.drop();
                console.log("-------- tarot2 全部表删除完成 --------");
            }


            console.log("-------- tarot2 begin 创建关联 --------");
            question.belongsTo(questionGroup);
            questionGroup.hasMany(question);
            question.belongsToMany(card, {through: interpretation});
            card.belongsToMany(question, {through: interpretation});
            console.log("-------- tarot2 end 创建关联 --------");


            await sequelize.sync();
            console.log("++++++++ tarot2 全部表创建完成 ++++++++");

            //插入测试数据
            if (insertDebugData) {
                let card0yr = await card.create({
                    name: "愚人",
                    element: "风",
                    tag: "天真、好奇、新鲜感",
                    img: "/tarot1/card/0_yu_ren.jpg",
                    orientation: "positive",
                    description: "一个穿着夸张可笑衣服的人，很快乐的走近了悬崖边，他的表情似乎不知道自己已经在危险边缘了。也许他会继续往前进，而掉入了悬崖，也许他会回头走，选择别条道路，一切都是未知的。" +
                    "但无论如何，此时此刻的他是十分自得其乐的，内心觉得非常愉悦的，有点盲目乐观、有点不畏艰难，这就是他的性格。" +
                    "旁边有一只狗跟着他，似乎是在提醒着他，危险就在眼前，似乎想唤回他，面对现实的世界，但“愚者”此时此刻的心，已经被快乐愉悦所笼罩了，他当下只想随心所欲，下一步怎么走，都还是未知数呢!"
                });
                let card0yr1 = await card.create({
                    name: "愚人",
                    element: "风",
                    tag: "天真、好奇、新鲜感",
                    img: "/tarot1/card/n/0_yu_ren.jpg",
                    orientation: "negative",
                    description: "一个穿着夸张可笑衣服的人，很快乐的走近了悬崖边，他的表情似乎不知道自己已经在危险边缘了。也许他会继续往前进，而掉入了悬崖，也许他会回头走，选择别条道路，一切都是未知的。" +
                    "但无论如何，此时此刻的他是十分自得其乐的，内心觉得非常愉悦的，有点盲目乐观、有点不畏艰难，这就是他的性格。" +
                    "旁边有一只狗跟着他，似乎是在提醒着他，危险就在眼前，似乎想唤回他，面对现实的世界，但“愚者”此时此刻的心，已经被快乐愉悦所笼罩了，他当下只想随心所欲，下一步怎么走，都还是未知数呢!"
                });
                let card1mss = await card.create({
                    name: "魔术师",
                    element: "风",
                    tag: "独特、想象、创造力",
                    img: "/tarot1/card/1_mo_shu_shi.jpg",
                    orientation: "positive",
                    description: "一个眼神坚定、自信满满的、穿着祭袍的男人，正在举行着神秘的仪式，他就是法力无边的“魔术师”，他在祭坛前面展现无限大的法力，一手拿着魔法棒指着天、另一手指着地，代表他有着上通天文、下通地理的能力，他是上天与人类沟通的使者。\n" +
                    "\n" +
                    "祭坛上摆放着火、土、风、水等四大元素的法器，他不但可以运用自如，而且掌握着世间的知识与沟通，透过与天地合而为一的仪式，他正自信的展现至高无上的法力。"
                });
                let card1mss1 = await card.create({
                    name: "魔术师",
                    element: "风",
                    tag: "独特、想象、创造力",
                    img: "/tarot1/card/n/1_mo_shu_shi.jpg",
                    orientation: "negative",
                    description: "一个眼神坚定、自信满满的、穿着祭袍的男人，正在举行着神秘的仪式，他就是法力无边的“魔术师”，他在祭坛前面展现无限大的法力，一手拿着魔法棒指着天、另一手指着地，代表他有着上通天文、下通地理的能力，他是上天与人类沟通的使者。\n" +
                    "\n" +
                    "祭坛上摆放着火、土、风、水等四大元素的法器，他不但可以运用自如，而且掌握着世间的知识与沟通，透过与天地合而为一的仪式，他正自信的展现至高无上的法力。"
                });

                let card2njs = await card.create({
                    name: "女祭司",
                    element: "水",
                    tag: "神秘、高知、冷静",
                    img: "/tarot1/card/2_nv_ji_si.jpg",
                    orientation: "positive",
                    description: "一个眼神坚定、自信满满的、穿着祭袍的男人，正在举行着神秘的仪式，他就是法力无边的“魔术师”，他在祭坛前面展现无限大的法力，一手拿着魔法棒指着天、另一手指着地，代表他有着上通天文、下通地理的能力，他是上天与人类沟通的使者。\n" +
                    "祭坛上摆放着火、土、风、水等四大元素的法器，他不但可以运用自如，而且掌握着世间的知识与沟通，透过与天地合而为一的仪式，他正自信的展现至高无上的法力。"
                });
                let card2njs1 = await card.create({
                    name: "女祭司",
                    element: "水",
                    tag: "神秘、高知、冷静",
                    img: "/tarot1/card/n/2_nv_ji_si.jpg",
                    orientation: "negative",
                    description: "女祭司身着法袍，手捧圣经端坐在宝座上。牌中月亮、圣经、水都是智慧和直觉力的象征。身后的两根柱子有着不同的含义：左边代表逻辑（务实与力量），右边代表想象（直觉与接受）。\n" +
                    "女祭司可能代表一个双鱼座的人。这张牌也可以代表直觉、洞察，或是从生活中退隐下来，好好思考某个问题或形势。有时候女祭司暗示一种拥有高度精神或心灵发展的关系。"
                });

                let card3nh = await card.create({
                    name: "女皇",
                    element: "土",
                    tag: "富裕、享受、务实",
                    img: "/tarot1/card/3_nv_huang.jpg",
                    orientation: "positive",
                    description: "美丽的女皇坐在优雅舒适的椅子上，四周一片茂密森林，令人有种无忧无虑、悠闲自在的感觉。椅子旁放着一颗心。女皇是热情与高贵的体现。和魔术师一样，女皇右手也高举着权杖。这是天地间掌管生命的法器。在女皇的脚下，是金色的麦田。"
                });
                let card3nh1 = await card.create({
                    name: "女皇",
                    element: "土",
                    tag: "富裕、享受、务实",
                    img: "/tarot1/card/n/3_nv_huang.jpg",
                    orientation: "negative",
                    description: "美丽的女皇坐在优雅舒适的椅子上，四周一片茂密森林，令人有种无忧无虑、悠闲自在的感觉。椅子旁放着一颗心。女皇是热情与高贵的体现。和魔术师一样，女皇右手也高举着权杖。这是天地间掌管生命的法器。在女皇的脚下，是金色的麦田。"
                });

                let card4hd = await card.create({
                    name: "皇帝",
                    element: "火",
                    tag: "权力、自信、稳定",
                    img: "/tarot1/card/4_huang_di.jpg",
                    orientation: "positive",
                    description: "一国之尊的皇帝头戴皇冠，身着红袍，足蹬象征严格纪律的战靴，自信满满的端坐在宝座上。\n" +
                    "他左手拿着一个水晶球，象征秩序严谨有条，右手则握着一个法杖，象征生命与权利。在王座上有四个白羊头浮雕，强调了皇帝对应的星象——白羊座。作为十二星座之首，这里的白羊座象征着勇敢、积极、野心和自信。"
                });
                let card4hd1 = await card.create({
                    name: "皇帝",
                    element: "火",
                    tag: "权力、自信、稳定",
                    img: "/tarot1/card/n/4_huang_di.jpg",
                    orientation: "negative",
                    description: "一国之尊的皇帝头戴皇冠，身着红袍，足蹬象征严格纪律的战靴，自信满满的端坐在宝座上。\n" +
                    "他左手拿着一个水晶球，象征秩序严谨有条，右手则握着一个法杖，象征生命与权利。在王座上有四个白羊头浮雕，强调了皇帝对应的星象——白羊座。作为十二星座之首，这里的白羊座象征着勇敢、积极、野心和自信。"
                });

                let card5jh = await card.create({
                    name: "教皇",
                    element: "土",
                    tag: "教导、保守、贵人",
                    img: "/tarot1/card/5_jiao_huang.jpg",
                    orientation: "positive",
                    description: "牌面上的教皇，高举着双手向世人传播教义。教皇是天上真理的人间显示，同时也是传统知识和保守道德的代表。三层的王冠代表物质、感情、心灵的整合。他的权杖象征三者的升华。他左右脚下的信徒，象征臣服和纯洁的动机。身上的红袍象征着热情。"
                });
                let card5jh1 = await card.create({
                    name: "教皇",
                    element: "土",
                    tag: "教导、保守、贵人",
                    img: "/tarot1/card/n/5_jiao_huang.jpg",
                    orientation: "negative",
                    description: "牌面上的教皇，高举着双手向世人传播教义。教皇是天上真理的人间显示，同时也是传统知识和保守道德的代表。三层的王冠代表物质、感情、心灵的整合。他的权杖象征三者的升华。他左右脚下的信徒，象征臣服和纯洁的动机。身上的红袍象征着热情。"
                });

                let card6lr = await card.create({
                    name: "恋人",
                    element: "风",
                    tag: "爱情、信任、乐观",
                    img: "/tarot1/card/6_lian_ren.jpg",
                    orientation: "positive",
                    description: "在阳光普照的伊甸园里面，裸体的亚当和夏娃分别站在两边。" +
                        "夏娃背后有一棵生长了苹果的知识之树，亚当背后是生命之树，有12团火焰，也是欲望之火。" +
                    "两个人背后是有着紫色翅膀的风之天使拉斐尔，穿着象征忠贞的紫色袍子。亚当望着夏娃，夏娃看着天使，象征着人类的意识——潜意识——超意识。"
                });
                let card6lr1 = await card.create({
                    name: "恋人",
                    element: "风",
                    tag: "爱情、信任、乐观",
                    img: "/tarot1/card/n/6_lian_ren.jpg",
                    orientation: "negative",
                    description: "在阳光普照的伊甸园里面，裸体的亚当和夏娃分别站在两边。" +
                        "夏娃背后有一棵生长了苹果的知识之树，亚当背后是生命之树，有12团火焰，也是欲望之火。" +
                    "两个人背后是有着紫色翅膀的风之天使拉斐尔，穿着象征忠贞的紫色袍子。亚当望着夏娃，夏娃看着天使，象征着人类的意识——潜意识——超意识。"
                });

                let card7zc = await card.create({
                    name: "战车",
                    element: "水",
                    tag: "挑战、克制、旅程",
                    img: "/tarot1/card/7_zhan_che.jpg",
                    orientation: "positive",
                    description: "一位头戴八芒星战盔、身着盔甲的勇士驾着一辆由两只狮身人面兽拉着的战车。向着胜利勇往直前，气势无人可挡。车前左侧的黑色狮身人面兽代表严厉，白色代表慈悲，一黑一白同时也代表代表阴阳平衡。"
                });
                let card7zc1 = await card.create({
                    name: "战车",
                    element: "水",
                    tag: "挑战、克制、旅程",
                    img: "/tarot1/card/n/7_zhan_che.jpg",
                    orientation: "negative",
                    description: "一位头戴八芒星战盔、身着盔甲的勇士驾着一辆由两只狮身人面兽拉着的战车。向着胜利勇往直前，气势无人可挡。车前左侧的黑色狮身人面兽代表严厉，白色代表慈悲，一黑一白同时也代表代表阴阳平衡。"
                });

                let card8ll = await card.create({
                    name: "力量",
                    element: "火",
                    tag: "勇气、信心、力量",
                    img: "/tarot1/card/8_li_liang.jpg",
                    orientation: "positive",
                    description: "力量牌暗示你拥有足够的内在力量去面对人生。\n" +
                    "在力量牌上面，一个女人正在安抚一头狮子。尽管狮子可以轻易的撂倒她，然而它却在她的爱和温柔当中平静了下来。此时天际晴朗无云，而一串花环围绕于她的腰间。头上方代表无限的符号暗示，她正开发出一种无穷无尽的能量来源。"
                });
                let card8ll1 = await card.create({
                    name: "力量",
                    element: "火",
                    tag: "勇气、信心、力量",
                    img: "/tarot1/card/n/8_li_liang.jpg",
                    orientation: "negative",
                    description: "力量牌暗示你拥有足够的内在力量去面对人生。\n" +
                    "在力量牌上面，一个女人正在安抚一头狮子。尽管狮子可以轻易的撂倒她，然而它却在她的爱和温柔当中平静了下来。此时天际晴朗无云，而一串花环围绕于她的腰间。头上方代表无限的符号暗示，她正开发出一种无穷无尽的能量来源。"
                });

                let card9ys = await card.create({
                    name: "隐士",
                    element: "土",
                    tag: "孤独、内省、指引",
                    img: "/tarot1/card/9_yin_shi.jpg",
                    orientation: "positive",
                    description: "画面蓝色背景象征着平静的精神力量，我们看见隐士站在孤冷的山峰之上，他从外在世界抽离进入无意识的心灵层面，唤醒内在自我，在心灵灵性层去探寻真理！\n" +
                    "隐士一手手持魔法拐杖，这是一根能帮助我们开启内在觉知的教法。另一手提着散发星光的灯笼，这位灵性导师手提明灯会为我们指引正确的道路！"
                });
                let card9ys1 = await card.create({
                    name: "隐士",
                    element: "土",
                    tag: "孤独、内省、指引",
                    img: "/tarot1/card/n/9_yin_shi.jpg",
                    orientation: "negative",
                    description: "画面蓝色背景象征着平静的精神力量，我们看见隐士站在孤冷的山峰之上，他从外在世界抽离进入无意识的心灵层面，唤醒内在自我，在心灵灵性层去探寻真理！\n" +
                    "隐士一手手持魔法拐杖，这是一根能帮助我们开启内在觉知的教法。另一手提着散发星光的灯笼，这位灵性导师手提明灯会为我们指引正确的道路！"
                });

                let card10myzl = await card.create({
                    name: "命运之轮",
                    element: "水",
                    tag: "未来、注定、因果循环",
                    img: "/tarot1/card/10_ming_yun_zhi_lun.jpg",
                    orientation: "positive",
                    description: "命运之轮转动生生不息，循环往替正如我们人生一般起起伏伏，我们在不同人生阶段都会有不同的运气！\n" +
                    "画面上最中心的三个圈，分别代表宇宙的创造力，形成力和物质世界，最小的圈代表宇宙无限的源头，中间的圈分别画有炼金术符号的火水风土四元素，这是构成物质世界的基本元素。\n" +
                    "牌面的四个角分别有狮子、老鹰、天使和神牛。他们都拿着书本，代表他们需要生生不息的学习和成长。"
                });
                let card10myzl1 = await card.create({
                    name: "命运之轮",
                    element: "水",
                    tag: "未来、注定、因果循环",
                    img: "/tarot1/card/n/10_ming_yun_zhi_lun.jpg",
                    orientation: "negative",
                    description: "命运之轮转动生生不息，循环往替正如我们人生一般起起伏伏，我们在不同人生阶段都会有不同的运气！\n" +
                    "画面上最中心的三个圈，分别代表宇宙的创造力，形成力和物质世界，最小的圈代表宇宙无限的源头，中间的圈分别画有炼金术符号的火水风土四元素，这是构成物质世界的基本元素。\n" +
                    "牌面的四个角分别有狮子、老鹰、天使和神牛。他们都拿着书本，代表他们需要生生不息的学习和成长。"
                });

                let card11zy = await card.create({
                    name: "正义",
                    element: "风",
                    tag: "公平、客观、合理",
                    img: "/tarot1/card/11_zheng_yi.jpg",
                    orientation: "positive",
                    description: "画面上的女神端坐在宝座上一手执掌代表公平、公正的天秤，一手执掌代表智慧的宝剑，宝剑尖端朝上不偏不倚代表任何的裁决都是基于公正的立场！\n" +
                    "女神身穿绿色的披肩和手持的天平是天秤座的象征，后面的两个柱代表正面和负面的能量，柱子灰色代表中性和中立。紫色的帷幔代表内在的智慧，背景、皇冠、天平和头发都是黄色代表心智的力量。"
                });
                let card11zy1 = await card.create({
                    name: "正义",
                    element: "风",
                    tag: "公平、客观、合理",
                    img: "/tarot1/card/n/11_zheng_yi.jpg",
                    orientation: "negative",
                    description: "画面上的女神端坐在宝座上一手执掌代表公平、公正的天秤，一手执掌代表智慧的宝剑，宝剑尖端朝上不偏不倚代表任何的裁决都是基于公正的立场！\n" +
                    "女神身穿绿色的披肩和手持的天平是天秤座的象征，后面的两个柱代表正面和负面的能量，柱子灰色代表中性和中立。紫色的帷幔代表内在的智慧，背景、皇冠、天平和头发都是黄色代表心智的力量。"
                });

                let card12ddr = await card.create({
                    name: "倒吊人",
                    element: "水",
                    tag: "牺牲、等待、换个角度",
                    img: "/tarot1/card/12_dao_diao_ren.jpg",
                    orientation: "positive",
                    description: "“吊人”的眼睛是闭着的，若有所思的表情好像神游去了，也好像在睡梦中得到了启发，没有人知道他吊在树上有多久了，也没有人知道这趟修练历程将持续多久。\n" +
                    "因为倒吊着的关系，所以“吊人”看世界的角度是不一样的，可以说是与一般人相反的，他的快乐和满足是精神层次的，不在乎世俗眼光是他修练的法则。他倒吊的姿势，似乎是一种舞姿，或者是一种功法，尽管肉体看来是受煎熬的，尽管无法得知是否会成功，但他却是乐在其中的。从牺牲奉献中得到快乐，就是“吊人”修练的原动力。"
                });
                let card12ddr1 = await card.create({
                    name: "倒吊人",
                    element: "水",
                    tag: "牺牲、等待、换个角度",
                    img: "/tarot1/card/n/12_dao_diao_ren.jpg",
                    orientation: "negative",
                    description: "“吊人”的眼睛是闭着的，若有所思的表情好像神游去了，也好像在睡梦中得到了启发，没有人知道他吊在树上有多久了，也没有人知道这趟修练历程将持续多久。\n" +
                    "因为倒吊着的关系，所以“吊人”看世界的角度是不一样的，可以说是与一般人相反的，他的快乐和满足是精神层次的，不在乎世俗眼光是他修练的法则。他倒吊的姿势，似乎是一种舞姿，或者是一种功法，尽管肉体看来是受煎熬的，尽管无法得知是否会成功，但他却是乐在其中的。从牺牲奉献中得到快乐，就是“吊人”修练的原动力。"
                });

                let card13ss = await card.create({
                    name: "死神",
                    element: "水",
                    tag: "结束、转变、新生",
                    img: "/tarot1/card/13_si_shen.jpg",
                    orientation: "positive",
                    description: "骑着白马的黑色死亡骑士，手上拿着瘟疫旗帜，所到之处死亡便跟随而来，连物质世界的领导者“皇帝”也不免一死，满地疮痍的恐怖景象，似乎是了无生机了。\n" +
                    "但意外的是，“教皇”与小孩幸存了下来，虽然“死神”的力量连“教皇”都敌不过，但是只要固守着精神堡垒的不死，一切都有重新开始的机会。旧有的世界摧毁之后，新生命却诞生了，生气勃勃的迎接着旭日，“死神”虽带来了死亡，却也给予了重建的希望，因为有所破坏，才有所建设的空间。"
                });
                let card13ss1 = await card.create({
                    name: "死神",
                    element: "水",
                    tag: "结束、转变、新生",
                    img: "/tarot1/card/n/13_si_shen.jpg",
                    orientation: "negative",
                    description: "骑着白马的黑色死亡骑士，手上拿着瘟疫旗帜，所到之处死亡便跟随而来，连物质世界的领导者“皇帝”也不免一死，满地疮痍的恐怖景象，似乎是了无生机了。\n" +
                    "但意外的是，“教皇”与小孩幸存了下来，虽然“死神”的力量连“教皇”都敌不过，但是只要固守着精神堡垒的不死，一切都有重新开始的机会。旧有的世界摧毁之后，新生命却诞生了，生气勃勃的迎接着旭日，“死神”虽带来了死亡，却也给予了重建的希望，因为有所破坏，才有所建设的空间。"
                });

                let card14jz = await card.create({
                    name: "节制",
                    element: "火",
                    tag: "适度、耐心、协调",
                    img: "/tarot1/card/14_jie_zhi.jpg",
                    orientation: "positive",
                    description: "牌面上天使双手拿着两只圣杯，它们分别代表“物质”和“精神”，天使在不停地用圣杯相互倒水使两只圣杯的水保持平衡和融合。代表着：调和、融合、平衡、中庸…就类似我们中国的太极，或者《道德经》所称的上善若水。"
                });
                let card14jz1 = await card.create({
                    name: "节制",
                    element: "火",
                    tag: "适度、耐心、协调",
                    img: "/tarot1/card/n/14_jie_zhi.jpg",
                    orientation: "negative",
                    description: "牌面上天使双手拿着两只圣杯，它们分别代表“物质”和“精神”，天使在不停地用圣杯相互倒水使两只圣杯的水保持平衡和融合。代表着：调和、融合、平衡、中庸…就类似我们中国的太极，或者《道德经》所称的上善若水。"
                });

                let card15em = await card.create({
                    name: "恶魔",
                    element: "土",
                    tag: "欲望、金钱、性",
                    description: "代表沉溺于物质与欲望的一张牌，它象征着黑暗面的沉沦！\n" +
                    "牌面上恶魔的手一边朝上一边朝下，朝上的手，中指留一缝，这个手势是古代耶路撒冷大祭司引导灵能的姿势，手掌心刻有占星学土星的符号，代表限制和约束！\n" +
                    "朝下的手中拿着一根火把，熊熊燃烧的火焰点燃了亚当的尾巴，点燃了他体内的欲望（拙火）。在这里象征无法抗拒沉溺于感官需求的人！夏娃的尾巴上成熟的葡萄果实也象征成熟的欲望以及感官需求！",
                    img: "/tarot1/card/15_e_mo.jpg",
                    orientation: "positive"
                });
                let card15em1 = await card.create({
                    name: "恶魔",
                    element: "土",
                    tag: "欲望、金钱、性",
                    description: "代表沉溺于物质与欲望的一张牌，它象征着黑暗面的沉沦！\n" +
                    "牌面上恶魔的手一边朝上一边朝下，朝上的手，中指留一缝，这个手势是古代耶路撒冷大祭司引导灵能的姿势，手掌心刻有占星学土星的符号，代表限制和约束！\n" +
                    "朝下的手中拿着一根火把，熊熊燃烧的火焰点燃了亚当的尾巴，点燃了他体内的欲望（拙火）。在这里象征无法抗拒沉溺于感官需求的人！夏娃的尾巴上成熟的葡萄果实也象征成熟的欲望以及感官需求！",
                    img: "/tarot1/card/n/15_e_mo.jpg",
                    orientation: "negative"
                });


                let card16gt = await card.create({
                    name: "高塔",
                    element: "火",
                    tag: "崩溃、痛苦、吵架",
                    description: "代表晴天霹雳一般的巨变，灾难和破坏，一切要催倒重来！\n" +
                    "牌面上的高塔象征我们的物质世界，塔上的皇冠代表物质世界的成就及荣耀，当天空的雷电霹雳而下，皇冠顷刻翻倒，财富和成就化为乌有，昭示一种我们不愿意接受的巨变。\n" +
                    "牌面上的两个人一无所有从塔中坠落而下，预示着在面对突如其来的的天灾和巨变的毁灭时，人为的力量是渺小的，且不论你是王公贵族或是平民百姓，灾难面前人人平等！",
                    img: "/tarot1/card/16_gao_ta.jpg",
                    orientation: "positive"
                });
                let card16gt1 = await card.create({
                    name: "高塔",
                    element: "火",
                    tag: "崩溃、痛苦、吵架",
                    description: "代表晴天霹雳一般的巨变，灾难和破坏，一切要催倒重来！\n" +
                    "牌面上的高塔象征我们的物质世界，塔上的皇冠代表物质世界的成就及荣耀，当天空的雷电霹雳而下，皇冠顷刻翻倒，财富和成就化为乌有，昭示一种我们不愿意接受的巨变。\n" +
                    "牌面上的两个人一无所有从塔中坠落而下，预示着在面对突如其来的的天灾和巨变的毁灭时，人为的力量是渺小的，且不论你是王公贵族或是平民百姓，灾难面前人人平等！",
                    img: "/tarot1/card/n/16_gao_ta.jpg",
                    orientation: "negative"
                });

                let card17xx = await card.create({
                    name: "星星",
                    element: "风",
                    tag: "希望、灵感、光明",
                    description: "这是一张充满希望的牌。\n" +
                    "在希望之星——天狼星的照耀下，希望女神把圣水瓶中的希望圣水倒入象征潜意识的水池中。她知道人们是如此地需要希望，所以当一瓶圣水倒完时，她又在倒另一瓶。只要有希望人们才能有足够的动力去完成许多事，所以说希望就是人类的活力之源。",
                    img: "/tarot1/card/17_xing_xing.jpg",
                    orientation: "positive"
                });
                let card17xx1 = await card.create({
                    name: "星星",
                    element: "风",
                    tag: "希望、灵感、光明",
                    description: "这是一张充满希望的牌。\n" +
                    "在希望之星——天狼星的照耀下，希望女神把圣水瓶中的希望圣水倒入象征潜意识的水池中。她知道人们是如此地需要希望，所以当一瓶圣水倒完时，她又在倒另一瓶。只要有希望人们才能有足够的动力去完成许多事，所以说希望就是人类的活力之源。",
                    img: "/tarot1/card/n/17_xing_xing.jpg",
                    orientation: "negative"
                });

                let card18yl = await card.create({
                    name: "月亮",
                    element: "水",
                    tag: "欺骗、直觉、不安",
                    description: "从“月亮”牌面的图画上，很明显的感受到了恐惧不安的气息。\n" +
                    "变幻莫测的“月亮”里，藏了一个女性的脸孔，她的眉头深锁、表情阴郁，似乎隐藏了无法告人的秘密。\n" +
                    "女性的周期是“月亮”所影响的，女性的潜意识是“月亮”所控制的，于是女性的性格里就潜藏了“月亮”不安的特质，容易产生怀疑，容易看不清现实，也容易自我欺骗。\n" +
                    "从水里往陆上爬行的甲壳动物，正朝着毁灭之路行走着，而两旁的受到恐怖气氛所惊吓的狗，因恐惧而发出叫声，似在警告人们不要被负面情绪或邪恶欲望所影响，蒙蔽了清明的理智。",
                    img: "/tarot1/card/18_yue_liang.jpg",
                    orientation: "positive"
                });
                let card18yl1 = await card.create({
                    name: "月亮",
                    element: "水",
                    tag: "欺骗、直觉、不安",
                    description: "从“月亮”牌面的图画上，很明显的感受到了恐惧不安的气息。\n" +
                    "变幻莫测的“月亮”里，藏了一个女性的脸孔，她的眉头深锁、表情阴郁，似乎隐藏了无法告人的秘密。\n" +
                    "女性的周期是“月亮”所影响的，女性的潜意识是“月亮”所控制的，于是女性的性格里就潜藏了“月亮”不安的特质，容易产生怀疑，容易看不清现实，也容易自我欺骗。\n" +
                    "从水里往陆上爬行的甲壳动物，正朝着毁灭之路行走着，而两旁的受到恐怖气氛所惊吓的狗，因恐惧而发出叫声，似在警告人们不要被负面情绪或邪恶欲望所影响，蒙蔽了清明的理智。",
                    img: "/tarot1/card/n/18_yue_liang.jpg",
                    orientation: "negative"
                });

                let card19ty = await card.create({
                    name: "太阳",
                    element: "火",
                    tag: "满足、快乐、正大光明",
                    description: "“太阳”灿烂的高挂在晴空中，地面也是宽阔明朗的，阳光之下有一位纯真的小孩，他代表了生命的喜悦，因为年纪还极小，所以潜力是无穷的、发展是无限的。\n" +
                    "小孩的裸体豪不遮掩的面对世界，代表了光明磊落与毫不欺瞒的态度，年幼的小孩正愉悦的玩耍着，他健康快乐的成长，未来是充满希望的，这是“太阳”所带来的保证。\n" +
                    "在“太阳”热力十足的照射之下，小孩毫无恐惧的尝试新鲜事物，他对世界的认知，如同太阳般的温暖，而他未来的道路，目标也是十分明确的。",
                    img: "/tarot1/card/19_tai_yang.jpg",
                    orientation: "positive"
                });
                let card19ty1 = await card.create({
                    name: "太阳",
                    element: "火",
                    tag: "满足、快乐、正大光明",
                    description: "“太阳”灿烂的高挂在晴空中，地面也是宽阔明朗的，阳光之下有一位纯真的小孩，他代表了生命的喜悦，因为年纪还极小，所以潜力是无穷的、发展是无限的。\n" +
                    "小孩的裸体豪不遮掩的面对世界，代表了光明磊落与毫不欺瞒的态度，年幼的小孩正愉悦的玩耍着，他健康快乐的成长，未来是充满希望的，这是“太阳”所带来的保证。\n" +
                    "在“太阳”热力十足的照射之下，小孩毫无恐惧的尝试新鲜事物，他对世界的认知，如同太阳般的温暖，而他未来的道路，目标也是十分明确的。",
                    img: "/tarot1/card/n/19_tai_yang.jpg",
                    orientation: "negative"
                });

                let card20sp = await card.create({
                    name: "审判",
                    element: "水",
                    tag: "复活、觉醒、知道结果",
                    description: "审判牌类似一张站在十字路口的选择牌，我们内在需要做出选择和改变！牌面上方是水之天使加百列，加百列吹响号角负责引导灵魂转生，号角上的红色十字旗象征着疗愈和业力平衡，我们有限的生命时间与灵魂永恒的一种交汇！牌面一条宽广的河流象征着潜意识的灵性觉知！远方高耸入云的山脉象征普通人无法企及的永恒真理（宇宙的平衡）！\n" +
                    "牌面下方许多死去的人听到了大天使的号角的召唤、灵魂纷纷从棺材里站起来，等待着加百列最终的业力审判和灵魂的轮回，裸体的男人女人及小孩，在这里男人代表意识女人代表潜意识，小孩象征着父母的结合同时又代表一种全新的新生命！",
                    img: "/tarot1/card/20_shen_pan.jpg",
                    orientation: "positive"
                });
                let card20sp1 = await card.create({
                    name: "审判",
                    element: "水",
                    tag: "复活、觉醒、知道结果",
                    description: "审判牌类似一张站在十字路口的选择牌，我们内在需要做出选择和改变！牌面上方是水之天使加百列，加百列吹响号角负责引导灵魂转生，号角上的红色十字旗象征着疗愈和业力平衡，我们有限的生命时间与灵魂永恒的一种交汇！牌面一条宽广的河流象征着潜意识的灵性觉知！远方高耸入云的山脉象征普通人无法企及的永恒真理（宇宙的平衡）！\n" +
                    "牌面下方许多死去的人听到了大天使的号角的召唤、灵魂纷纷从棺材里站起来，等待着加百列最终的业力审判和灵魂的轮回，裸体的男人女人及小孩，在这里男人代表意识女人代表潜意识，小孩象征着父母的结合同时又代表一种全新的新生命！",
                    img: "/tarot1/card/n/20_shen_pan.jpg",
                    orientation: "negative"
                });

                let card21sj = await card.create({
                    name: "世界",
                    element: "土",
                    tag: "圆满、尽善尽美、成就",
                    description: "“世界”女神正以完美的舞姿，在命运之轮的圆圈里起舞着，她带来的并不是一个不安的变动，反而是一种稳定的循环与律动，这象征了生命的圆满的结束之后，代之而起的又是另一个充满活力的新生。\n" +
                    "“世界”女神所带来的，是万世万物生生不息的最高道理，所有的生命都将会走到结束的境地，但每一个结束都会唤起另一个生命的诞生，如此循环不绝，正是生命不变的真理。\n" +
                    "女神手中的权杖代表生命的活跃，无限大的符号则是女神无穷的力量，她同样也掌控了四元素，她是享受成果并创造新生的。",
                    img: "/tarot1/card/21_shi_jie.jpg",
                    orientation: "positive"
                });
                let card21sj1 = await card.create({
                    name: "世界",
                    element: "土",
                    tag: "圆满、尽善尽美、成就",
                    description: "“世界”女神正以完美的舞姿，在命运之轮的圆圈里起舞着，她带来的并不是一个不安的变动，反而是一种稳定的循环与律动，这象征了生命的圆满的结束之后，代之而起的又是另一个充满活力的新生。\n" +
                    "“世界”女神所带来的，是万世万物生生不息的最高道理，所有的生命都将会走到结束的境地，但每一个结束都会唤起另一个生命的诞生，如此循环不绝，正是生命不变的真理。\n" +
                    "女神手中的权杖代表生命的活跃，无限大的符号则是女神无穷的力量，她同样也掌控了四元素，她是享受成果并创造新生的。",
                    img: "/tarot1/card/n/21_shi_jie.jpg",
                    orientation: "negative"
                });

                let card22sb6 = await card.create({
                    name: "圣杯六",
                    element: "水",
                    tag: "童年、回忆、照顾",
                    img: "/tarot1/card/22_sheng_bei_6.jpg",
                    orientation: "positive",
                    description: "在一座宁静安祥的庄园里，有六个盛装着五角星花朵的圣杯，一个小男孩捧着圣杯，似乎在嗅着花香，又好像要把圣杯献给小女孩。背景充斥着代表快乐的鲜黄色，天气晴和。让人仿佛有置身于童话故事里的感觉。"
                });
                let card23xb2 = await card.create({
                    name: "星币二",
                    element: "土",
                    tag: "波动、抉择、平衡",
                    img: "/tarot1/card/23_xing_bi_2.jpg",
                    orientation: "positive",
                    description: "一个红衣装扮，头戴高帽，类似街头卖艺的男子，正在耍弄两个钱币，钱币外围的带子形成了8字形无限符号。他背后的海面起伏剧烈，两首船正在上面行驶。"
                });
                let card24bj101 = await card.create({
                    name: "宝剑十",
                    element: "风",
                    tag: "惨痛、结束、受伤",
                    img: "/tarot1/card/n/bao_jian_10.jpg",
                    orientation: "negative",
                    description: "一个男子躺在地上，背上插着十把宝剑，有一把甚至从耳朵插进去了。这画面实在令人触目惊心。牌面中有一半被黑色的天空和乌云所占据，暗示着宝剑十是大家唯恐不及的坏牌象征。"
                });
                let card25qz6 = await card.create({
                    name: "权杖六",
                    element: "火",
                    tag: "胜利、进展、自信",
                    img: "/tarot1/card/25_quan_zhang_6.jpg",
                    orientation: "positive",
                    description: "一位年轻男子，戴着胜利的桂冠，骑着白马凯旋而归。四周都是围绕簇拥着他的群众，白色代表纯洁，马象征力量。/n红色的外衣象征积极主动和热忱，男子手持的权杖装饰着花环，艰辛的战斗已然过去，他现在抬头挺胸，享受着胜利的时刻。"
                });
                let card26sb4 = await card.create({
                    name: "圣杯四",
                    element: "水",
                    tag: "不满、拒绝、冷淡",
                    img: "/tarot1/card/26_sheng_bei_4.jpg",
                    orientation: "positive",
                    description: "一个男子百无聊懒地坐在树下，双眼紧闭，双手双脚合在一起，形成了防御的姿势。/n他前方的三个杯子象征着他过去的经验，云中伸出一只手给他第四个杯子，他却视而不见，独自沉浸在自己的世界当中。"
                });
                let card27sb10 = await card.create({
                    name: "圣杯十",
                    element: "水",
                    tag: "满足、和谐、家庭",
                    img: "/tarot1/card/27_sheng_bei_10.jpg",
                    orientation: "positive",
                    description: "在图中，我们看到一家四口，其乐融融。父母亲抱着彼此，各举一双手迎向圣杯彩虹，两个孩子快乐的手牵手跳舞，背景是青翠的树木河流，和一栋房屋。"
                });
                let card28sb3 = await card.create({
                    name: "圣杯三",
                    element: "水",
                    tag: "欢庆、结盟、宴会",
                    img: "/tarot1/card/28_sheng_bei_3.jpg",
                    orientation: "positive",
                    description: "三个女子紧靠彼此，围成圆圈，高举圣杯互相庆贺。她们头上都戴着象征丰收的花圈，穿着色彩艳丽的袍子，脸上幸福洋溢。四周有藤蔓、葫芦及南瓜，一位女子手上提着一串葡萄...这些植物很容易让人联想到丰收的时节。/n这三位女子分别有不同颜色的头发与眼珠，穿戴的衣服花环也都各有不同，代表她们都是独立的个体，有独立的个性。但是，在这个团体中，她们都能尊重彼此，敬爱彼此。三人围成圆圈的型态，表示她们之间没有尊卑之分，在这个欢庆的场合里，每个人都是如此平等。"
                });
                let card29sb9 = await card.create({
                    name: "圣杯九",
                    element: "水",
                    tag: "享乐、得意、美梦成真",
                    img: "/tarot1/card/29_sheng_bei_9.jpg",
                    orientation: "positive",
                    description: "一个财主装扮的的男子坐在小凳上，双手抱胸，神情怡然自得。他身后的高桌上，覆盖着蓝色桌布，九个圣杯排排站。背景则是一片光明的鲜黄色。"
                });
                let card30xbqs = await card.create({
                    name: "星币骑士",
                    element: "土",
                    tag: "现实分子、工作狂",
                    img: "/tarot1/card/30_xing_bi_qi_shi.jpg",
                    orientation: "positive",
                    description: "骑士笔直地坐在黑马背上，仔细打量手上的钱币。黑马也牢牢地站在地面，是四张骑士牌中唯一不动的座骑，反映出谨慎务实的态度。骑士的头盔上有绿叶装饰。远方的地面是一片经过细心耕耘的田地，背景是一片鲜黄色。"
                });
                let card31bjqs = await card.create({
                    name: "宝剑骑士",
                    element: "风",
                    tag: "战士、极端分子、反叛人士",
                    img: "/tarot1/card/31_bao_jian_qi_shi.jpg",
                    orientation: "positive",
                    description: "宝剑骑士和圣杯骑士一样，都是骑着白马，但宝剑骑士这匹马在狂风中极速奔驰，与圣杯骑士中平缓前进的马形成了强烈的对比。/n间接反映了主人个性的差异，宝剑骑士将宝剑高举过头，表情狰狞，往前冲杀。马鞍上装饰着蝴蝶和鸟儿，象征着风元素，宝剑骑士穿着铁甲，外袍也有鸟的图案，靴子前后都带着尖刺，在战场上毫不留情。云和树都被狂风吹得七零八落。空中飞翔的鸟儿，队形也略微散乱。"
                });
                let card32qz1 = await card.create({
                    name: "权杖首牌",
                    element: "火",
                    tag: "新行动、机会、创造",
                    img: "/tarot1/card/32_quan_zhang_1.jpg",
                    orientation: "positive",
                    description: "一只手从云中伸出，强而有力，握住一根长满绿叶的令牌。那根令牌是如此茂盛，以致鲜嫩的绿叶几乎从杖上「爆」开，有八片叶子脱离令牌，在空中飞舞。遍地青草溪流。远方的城堡似乎暗示着未来成功的可能。"
                });
                let card33xb5 = await card.create({
                    name: "星币五",
                    element: "土",
                    tag: "贫穷、欠缺、艰困",
                    img: "/tarot1/card/33_xing_bi_5.jpg",
                    orientation: "positive",
                    description: "冰天雪地中，两个乞丐蹒跚前行，又瘸又驼背，身上的衣服破烂不堪。他们经过一间象征物质与精神庇护的教堂，却视而不见，挺着饥饿且疲惫的身躯，径自赶路。"
                });
                let card34xb4 = await card.create({
                    name: "星币四",
                    element: "土",
                    tag: "获利、占有、控制",
                    img: "/tarot1/card/34_xing_bi_4.jpg",
                    orientation: "positive",
                    description: "图中的男人戴着皇冠，身穿象征统治威权的红色袍子，下摆饰以蓝边，显示出崇高的领主身分。他坐在一个箱子上，头顶一枚钱币，双手紧抓着另一枚，双脚又各踩着两枚，紧张的神情似乎深怕他失去任何一丁点财产。/n这个人虽有钱，却孤绝于城市人群之外。钱币四有个昵称叫「小气鬼」或「守财奴」。"
                });
                let card35xb6 = await card.create({
                    name: "星币六",
                    element: "土",
                    tag: "慷慨、理财、慈善",
                    img: "/tarot1/card/35_xing_bi_6.jpg",
                    orientation: "positive",
                    description: "一个商人装扮的男子，脚边跪着两个乞丐。商人右手施舍其中一名乞丐，左手拿着象征平衡的天秤。"
                });
                let card36bj3 = await card.create({
                    name: "宝剑三",
                    element: "风",
                    tag: "悲伤、失落、延迟",
                    img: "/tarot1/card/36_bao_jian_3.jpg",
                    orientation: "positive",
                    description: "映入眼帘的是一幅令人痛苦的画面。即使是完全没有接触过塔罗牌的朋友，也可以轻易道出宝剑三的涵义──伤心。三把剑合力刺进一颗鲜红的心，背景是灰暗的雨和云。某些版本的塔罗牌给这张牌一个更直接的名称，叫做「悲伤」。"
                });
                let card37qz7 = await card.create({
                    name: "权杖七",
                    element: "火",
                    tag: "防御、挑战、勇气",
                    img: "/tarot1/card/37_quan_zhang_7.jpg",
                    orientation: "positive",
                    description: "绿衣男子站在青葱的山顶上，手持权杖，奋力迎击敌人从山下攻上来的六根权杖，他高举右手，表情坚毅。"
                });
                let card38bj6 = await card.create({
                    name: "宝剑六",
                    element: "风",
                    tag: "忧郁、疗伤、旅行",
                    img: "/tarot1/card/38_bao_jian_6.jpg",
                    orientation: "positive",
                    description: "一艘小船上插着六把宝剑，船上有一个女人、一个小孩与一位船夫。/n船缓缓的朝远方的岸边前进，而此端的水汹涌，彼方的水平静。象征伤害的六把剑插在船身上，以及三个主角哀伤的背影，构成宝剑六缓慢低回的基调。沉重的剑身让船夫只能缓行，疗伤的过程亦同。但是我们不能把宝剑抽起，否则船会沉，正如我们不能把过去的哀伤连根拔起，只能轻轻的抚平。也许你该庆幸，这些宝剑并不能使船沉没。"
                });
                let card39qz10 = await card.create({
                    name: "权杖十",
                    element: "火",
                    tag: "疲劳、压力、努力",
                    img: "/tarot1/card/39_quan_zhang_10.jpg",
                    orientation: "positive",
                    description: "一个男人奋力的扛着十根沉重的权杖，朝着远方的房子前进。他被权杖的重量压得喘不过气来，疲劳万分。但是他仍不愿意放弃，为了生活，一步一个脚印的往前走。"
                });
                let card40sb2 = await card.create({
                    name: "圣杯二",
                    element: "水",
                    tag: "恋情、友谊、合作",
                    img: "/tarot1/card/40_sheng_bei_2.jpg",
                    orientation: "positive",
                    description: "一男一女面对彼此，向对方持杯致意。两人头上都戴着花环，男人身躯微微向前，左脚踏出，右手也伸向女人，而女人站姿端凝如山。/n他们中间浮着一根两条蛇缠绕的杖，称为「赫米斯之杖」，是治疗的象征。杖上的狮子头象征沟通，而两片翅膀象征圣灵，使人联想到恋人牌中的天使。远方是一座城镇。"
                });
                let card41xb8 = await card.create({
                    name: "星币八",
                    element: "土",
                    tag: "技能、勤劳、工作",
                    img: "/tarot1/card/41_xing_bi_8.jpg",
                    orientation: "positive",
                    description: "一位雕刻匠坐在长板凳上，专注而勤劳地刻着五角星钱币。他前面已经完成了六个了，脚边还有一个未完成。有一条黄色的道路连接远方的市镇与雕刻匠，连接工作与社会，无论什么工作，目的都是服务人群，雕刻匠并没有忘记这一点。"
                });
                let card42qzwh = await card.create({
                    name: "权杖王后",
                    element: "火",
                    tag: "女中豪杰、阳光女孩、快乐",
                    img: "/tarot1/card/42_quan_zhang_wang_hou.jpg",
                    orientation: "positive",
                    description: "权杖王后戴着盛开绿叶的王冠，穿着阳光般金黄的服饰，坐在宝座上。她的体能强健，腿是张开的，暗示着性能量。/n她的左手拿着一朵向日葵，象征着光明与欢乐，也暗示她有能力掌管着大自然。她的右手持权杖，眼光向左望。宝座的扶手是两只狮子，象征权杖王后能够掌控内心的兽性。后面悬吊的帷幕上，再度出现火象的狮子图腾和向日葵。/n她前方有一只黑猫守护，象征灵感与直觉。在基督教文化中，黑猫是巫婆的守护者，这里的黑猫似乎也在保护权杖王后，使她免于受伤害。远方有三座金字塔，天空是一片既明亮又祥和的浅蓝色。"
                });
                let card43bjgw = await card.create({
                    name: "宝剑国王",
                    element: "风",
                    tag: "专业人士、律师",
                    img: "/tarot1/card/43_bao_jian_guo_wang.jpg",
                    orientation: "positive",
                    description: "宝剑国王是四张国王牌（圣杯国王、权杖国王、星币国王）中唯一一位以正面出现的。他穿着蓝色内袍和红色披风，象征他必须把智慧以行动表现。他的右手持剑，剑尖偏右，偏向行动的那一边。/n左手戴着象征权力的戒指，轻松的放在腿上。他后方的帷幕上装饰着象征灵魂和风要素的蝴蝶花纹。天空中的鸟带领他远离火要素的热情、水要素的情感和土要素的物质，而进入纯然风要素的领域。"
                });
                let card44bjsc = await card.create({
                    name: "宝剑侍从",
                    element: "风",
                    tag: "间谍、狗仔队",
                    img: "/tarot1/card/44_bao_jian_shi_cong.jpg",
                    orientation: "positive",
                    description: "战争时，宝剑国王运筹帷幄，宝剑骑士亲临战场，宝剑侍从则待在高地上刺探军情。他两手握着宝剑，眼光朝着远方。他的头发和背景中的树木都被风吹得飞扬起来，远方天空中有十只小鸟成群飞舞，背景的灰云带来些许混乱。"
                });
                let card45sbqs = await card.create({
                    name: "圣杯骑士",
                    element: "水",
                    tag: "白马王子、浪漫诗人",
                    img: "/tarot1/card/45_sheng_bei_qi_shi.jpg",
                    orientation: "positive",
                    description: "不同于权杖骑士或宝剑骑士的迅捷骑马姿态，圣杯骑士的白马很有绅士风度，优雅地行进，跟主人一样。圣杯骑士平举着圣杯，他的眼光有些梦幻，深深注视着圣杯。他的衣服上有红鱼图案，鱼象征想象力、创意和精神，红色则指出骑士的热忱。他的头盔和鞋子上都有翅膀图案，象征想象力。这一人一马就这样朝着河流前进。"
                });
                let card46xbwh = await card.create({
                    name: "星币王后",
                    element: "土",
                    tag: "职业妇女、老板娘",
                    img: "/tarot1/card/46_xing_bi_wang_hou.jpg",
                    orientation: "positive",
                    description: "星币王后两手捧着钱币，低头对着钱币沉思，她的宝座有许多植物和天使图案。扶手有个牛头图案，她坐在长满丰盛植物的平原。头顶上方有玫瑰形成的拱门。右下角有一只不明显的兔子，象征多产和富饶。"
                });
                let card47sb7 = await card.create({
                    name: "圣杯七",
                    element: "水",
                    tag: "选择、想象、梦境",
                    img: "/tarot1/card/47_sheng_bei_7.jpg",
                    orientation: "positive",
                    description: "七个圣杯漂浮在云雾弥漫的半空中，杯中分别装着城堡（象征冒险）、珠宝（财富）、桂冠（胜利）、龙（诱惑）、人头、盖着布发光的人（自己）以及蛇（智慧）。/n注意桂冠下方有一颗不显眼的骷髅头，成功与死亡并存，似乎在给人予警惕。画面中的人面对着这些圣杯，不知道该如何抉择，身体姿势好像透露出些微的恐惧。"
                });
                let card48bj2 = await card.create({
                    name: "宝剑二",
                    element: "风",
                    tag: "紧张、抗拒、僵局",
                    img: "/tarot1/card/48_bao_jian_2.jpg",
                    orientation: "positive",
                    description: "一名身穿浅灰色长袍的女子，端坐在灰色的石凳上面，背对着澎湃汹涌、暗礁遍布的海洋。她眼睛矇着白布，双手交叉，各持一把宝剑。远处的天边，高挂着一轮新月。"
                });
                let card49bjwh = await card.create({
                    name: "宝剑王后",
                    element: "风",
                    tag: "冰山美人、强悍女性、铁娘子",
                    img: "/tarot1/card/49_bao_jian_wang_hou.jpg",
                    orientation: "positive",
                    description: "宝剑王后戴着蝴蝶花纹的王冠，象征灵魂，也象征着风元素。她穿着灰色内袍，和蓝天灰云花纹的披风。她的表情坚毅，似乎皱着眉头，左手却对世界敞开。她的右手高举宝剑，剑尖笔直向上，象征她能够破除迷惑，看清真相。"
                });
                let card50xb10 = await card.create({
                    name: "星币十",
                    element: "土",
                    tag: "富裕、物质成功、传承",
                    img: "/tarot1/card/50_xing_bi_10.jpg",
                    orientation: "positive",
                    description: "钱币十的近景是一位老年人，他舒服的坐着，身旁围绕着两只狗。拱门外的市镇中有一对青年男女，似乎在讨论什么，还有一个小孩子。十个钱币排列成生命之树的符号。"
                });
                let card51xb3 = await card.create({
                    name: "星币三",
                    element: "土",
                    tag: "合作、协调、计划",
                    img: "/tarot1/card/51_xing_bi_3.jpg",
                    orientation: "positive",
                    description: "在一座修道院里头，有位雕刻师正在工作，旁边两位修道人拿着草图，似乎正在和雕刻师讨论工作的进度。"
                });

                console.log("tarot2 插入数据成功：card");


                let groupInstance = {
                    name: "爱情桃花",
                    image: "/tarot1/question_group.jpg"
                };
                let groupResult = await questionGroup.create(groupInstance);
                let questionResult = await groupResult.createQuestion({name: "2019年桃花运如何？", count: 132, priceOld: 9800, priceNew: 990});
                await questionResult.addCard(card0yr, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "你自己应该很享受当下的生活，对爱情基本上就是随遇而安的态度，跟异性相处完全凭感觉，自己也没有什么择偶标准。\n" +
                        "2019年你的桃花运整体来说比较一般般，并没有一个让你眼前一亮，怦然心动的ta出现，而且你自己还没玩儿够，也没有想稳定谈恋爱的打算，即使有追求者，对待ta们多半也是三分钟热度。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "欢乐跳脱的你可能会吸引到很多朋友跟你一起玩耍，但因为你向往自由自在漂泊不定的生活，在感情上很难安定下来，对于爱情的追求比较盲目、容易冲动。\n" +
                        "这些“不靠谱”的行为方式会给到异性不真诚的感觉。会成为你爱情路上的不小障碍。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "愚者牌，在感情当中象征着稚气未脱、不成熟，双方只重视交往过程中的欢乐气氛，不会在意对方的年龄、思想、金钱甚至对于未来都没有明确的想法，今朝有酒今早醉，不考虑未来。\n" +
                        "即使身边有些异性出现，ta们也多是难以捉摸的、天真的，或者不愿受到任何长期计划和关系的约束，自然不是正缘。"
                    },
                    {
                        title: "情感建议",
                        content: "如果你想拥有一份稳定的感情，就收收自己爱玩儿的心吧，感情的世界里，每个人都需要安全感的，不然你整天一副快乐的单身主义作风，怕是对你有好感的异性也不敢上前了。"
                    }
                    ])}});
                await questionResult.addCard(card0yr1, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "这张牌代表目前你对感情没有清晰的目标与长远的打算。你对爱情随遇而安的态度，跟异性相处完全凭感觉的行为作风，会导致你身边还是朋友哥们儿居多，真正能碰撞出爱情火花的寥寥无几，异性都把你当小孩儿看，还是那种不注意形象、时常让人摸不着头脑的形象。\n" +
                        "不太靠谱大概就是你给到别人最直观的印象了，因此桃花运不是很理想。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "欢乐跳脱的你可能会吸引到很多朋友跟你一起玩耍，但因为你向往自由自在、漂泊不定的生活，在感情上很难安定下来，对于爱情的追求比较盲目、容易冲动。\n" +
                        "这些“不靠谱”的行为方式会给到异性不真诚的感觉，会成为你爱情路上的障碍。 \n" +
                        "此外，好的异性缘也需要好看的外表，平时不注意外在形象的你会很难让心仪异性发现你有魅力的一面。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "真正的缘份是相互吸引，相互喜欢，相互包容，一起计划未来。随便玩玩、不敢承诺或承担责任的暧昧关系并不算正缘。"
                    },
                    {
                        title: "情感建议",
                        content: "第一步，提升衣服品位；第二步，提升情商；第三步，对待感情认真一点，多一些目标和长远规划吧！"
                    }
                ])}});
                await questionResult.addCard(card1mss, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "今年，你很幸运，爱情上的发展将会有无限的可能。从潜意识来看，你选择魔术师这张牌，象征了新的一年，你在感情上会有多种选择的可能性。\n" +
                        "首先，魔术师在塔罗中序号是一。这预示一切的开始。牌面中的魔术师站在桌前，桌上有剑、杯、星和杖，象征物质构成四要素：权杖（火）、圣杯（水）、宝剑（风）和钱币（土）。\n" +
                        "四大元素的集合，象征着完美。他手持魔杖，天地会赐予他力量。这象征着你将会获得好运的加持。\n" +
                        "魔术师身披的大红色披风，象征着你会展开一段激情、热烈的恋情，而白色的衣服又代表了纯洁、美好的爱情。\n" +
                        "因此，整体来看，今年的你会获得一份很不错的恋情。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "不过，需要注意的是，因为你很幸运，所以可能会同时遇见几个桃花，你需要识别究竟谁才是真正适合你的人。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "对你而言，新桃花是不是正缘，主要还是看你能不能擦亮眼睛从众多桃花中选中真正合适的那一位。"
                    },
                    {
                        title: "情感建议",
                        content: "刻意增加自己在爱情中的判断能力，此外，遇到特别喜欢的对象，要多表现自己，幸运之神站在你这边，加油！"
                    }
                ])}});
                await questionResult.addCard(card1mss1, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "你身边会有新桃花出现，但烂桃花的概率会更大，很可能还有严重的性格缺陷、心理问题。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "你大概就是典型的吸渣体质了，性格随和人也很好，身边就是会出现好多烂桃花，要么是想搞搞暧昧，要么是随便玩玩。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "对你而言，遇到一个真正喜欢的人很难，对于另一半要求也会比较高，追求者往往很难达到你的预期。"
                    },
                    {
                        title: "情感建议",
                        content: "对于自己不感兴趣的人，不要做过多纠缠，不然就是给自己挖坑，恋爱的节奏要自己把握，遇到喜欢的要主动出击。"
                    }
                ])}});
                await questionResult.addCard(card2njs, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "虽然高冷，但你个人很有魅力，会让很多人都觉得你有个性，很特别，所以暗恋者也是比较多的，如果他们鼓起勇气，新桃花就出现了。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "你平时应该就是一副拒人于千里之外的样子，身边的异性都会觉得你比较高冷，不好接近，给人压力比较大。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "暗恋你的异性多会觉得配不上你，其实你自己也非常有自己的标准，你更希望另一半跟自己心灵契合，可以一起学习成长和进步，不太自信的暗恋者肯定不能算正缘了。"
                    },
                    {
                        title: "情感建议",
                        content: "学着平易近人一点，你喜欢的人没准儿也喜欢你，只是你们性格相似，都不愿意先开口罢了。"
                    }
                ])}});
                await questionResult.addCard(card2njs1, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "虽然高冷，但你个人很有魅力，会让很多人都觉得你既漂亮又聪慧，所以暗恋者也是比较多的，如果他们鼓起勇气，新桃花就出现了，但是出现的新桃花会比较滥情，追你可能只是因为你的一些外在条件。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "你平时应该就是一副拒人于千里之外的样子，身边的异性都会觉得你比较高冷，不好接近，给人压力比较大。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "暗恋你的异性多会觉得自己配不上你，其实你自己也非常有自己的标准，你更希望另一半跟自己心灵契合，可以一起学习成长和进步，不太自信的暗恋者肯定不能算正缘了，烂桃花自然也算不上正缘。"
                    },
                    {
                        title: "情感建议",
                        content: "学着平易近人一点，你喜欢的人没准儿也喜欢你，只是你们性格相似，都不愿意先开口罢了，对于目的不纯的追求者直接忽视。"
                    }
                ])}});
                await questionResult.addCard(card3nh, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "对于你而言，收获一段美好的爱情不是难事，你随性包容的个性也会让对方非常轻松，享受跟你在一起的生活。整体来看，2019年你的桃花运不错哦。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "外表出众的你总是能够在所处环境中吸引到异性的目光，但你自身条件太好有时也会给异性造成压力。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "你是一个谈恋爱就很认真，对对方也会非常好的人，由于自身条件的优越，能被你选中投入一段恋情的人自然不差，遇到正缘的可能性比较大，过程中要好好把握。"
                    },
                    {
                        title: "情感建议",
                        content: "你和伴侣是透过感情和欢乐来贴近人生，而不是经由思想。在这段关系中，有更多的成长和活力产生，但如果想长久在一起，就要努力达到灵魂的契合。"
                    }
                ])}});
                await questionResult.addCard(card3nh1, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "对于你而言，收获一段美好的爱情不是难事，你随性包容的个性也会让对方非常轻松，享受跟你在一起的生活。整体来看，2019年你的桃花运还算不错。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "你是有了谈恋爱的念头，但却发现自己无法为两性关系付出日复一日的努力，理想主义干扰了对感情的体验。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "由于自身条件的优越，能被你选中投入一段恋情的人自然不差，遇到正缘的可能性比较大。不过似乎你自己在感情中总会犹豫不决，还有可能脚踩两只船。"
                    },
                    {
                        title: "情感建议",
                        content: "对待感情，需要冷静地思考所有的选择之后，再运用理性来解决问题。女皇倒立还意味着你对爱过于知性或理想化了。"
                    }
                ])}});
                await questionResult.addCard(card4hd, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "从这张牌来看，今年你会遇到新桃花。但是，对方在感情里的占有欲很强，经常比较极端，以确保能够驾驭这段关系，特别是在物质层面上。由于对方的自律和喜欢勤奋地工作，所以通常做生意方面都可以得到成功。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "在感情方面对方可能会比较压抑，因为对方很难理解看不见的东西，很多时候并不能让你体会到恋爱的感觉。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "如果你也刚好不是热衷于幻想的浪漫主义，那你遇到的新桃花是正缘的可能性就很大了，对方虽然不太懂得表达感情，但很有能力也很独立，能够给到你足够的安全感，相处起来并不会有太多物质条件方面的压力。"
                    },
                    {
                        title: "情感建议",
                        content: "对对方而言，付出就是给予某些具体的东西，在感情里，跟这样的人在一起要实际点，最好打消太浪漫的奢求。"
                    }
                ])}});
                await questionResult.addCard(card4hd1, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "从这张牌来看，今年你会遇到新桃花，但是这个异性很喜欢驾驭掌握一段关系，控制欲极强，有时候近乎偏执。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "在感情方面对方可能会比较压抑，对方很难理解看不见的东西，很多时候并不能让你体会到恋爱的感觉。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "一种缺乏自律的状态，对方可能缺乏对你的承诺，或可能不止拥有一个伴侣，不算正缘。"
                    },
                    {
                        title: "情感建议",
                        content: "在选择伴侣的时候人品很重要，对待感情，冷静地思考所有的选择之后，运用理性来解决问题。"
                    }
                ])}});
                await questionResult.addCard(card5jh, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "你身边不缺新桃花，但周围的异性大多是家人安排的相亲对象，处于被动状态的你也很难面对自己的心意。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "在感情中有自己的原则和期待，但却没有坚持自我的勇气，经常被家人朋友的想法所左右。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "新桃花一般就是父母觉得合适，条件相符，门当户对，对方对你也还不错，但你并没有心动的感觉，也算不上是正缘。"
                    },
                    {
                        title: "情感建议",
                        content: "你的两性关系已流于一种形式或规矩，你的态度变成“别人怎么做，我就跟着怎么做”，而这并不是去经历一段两性关系的唯一方式。你应该去找寻另一种新方式。"
                    }
                ])}});
                await questionResult.addCard(card5jh1, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "你身边不缺新桃花，但周围的异性大多是家人安排的相亲对象，固定的生活圈子让你很难有其他的突破。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "在感情中太有自己的原则和期待，经常盲目拒绝一些还不错的机会。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "新桃花一般就是父母觉得合适，条件相符，门当户对，对方对你也还不错，但你并没有心动的感觉，也算不上是正缘。"
                    },
                    {
                        title: "情感建议",
                        content: "保持自己的新思想、观念，拒绝一些流于俗态的观念，但也要学会扩大自己的社交圈，寻求更多选择机会，对于条件不错的对象试着相处后再下结论。"
                    }
                ])}});
                await questionResult.addCard(card6lr, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "恋人牌是代表爱情最好的一张牌，出现这张牌，代表你今年桃花运非常的旺盛。\n" +
                        "新桃花出现指数非常高，你自己也决定去爱，开展一段新关系，而且身边可选择对象也比较多。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "恋人本身就是象征浪漫爱情的一张牌，感情方面并不会有太多的阻碍。所以大可放心，尽情去爱吧。  "
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "心灵契合，身心愉悦，家人支持，朋友羡慕——ta就是适合你的另一半，两个人都想奔着结婚去发展，你就好好珍惜属于你的缘分吧。"
                    },
                    {
                        title: "情感建议",
                        content: "面临多个选择的时候跟着自己的心走，不要被外在条件所限制，只有真爱才会被大天使所卷顾、祝福。"
                    }
                ])}});
                await questionResult.addCard(card6lr1, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "恋人牌是代表爱情最好的一张牌，虽然此处是逆位，不过整体来看。今年新桃花出现指数还是非常高的。只是你自己还没决定好去爱，去开展一段新关系，而是沉浸在自己的幻想中。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "对待感情你可能太过于理想化，逃避承诺和责任，很有可能还在受上一段感情的影响。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "在情绪混乱的时候做的决定往往也是不靠谱的，还没有整理好心情好好了解对方，把握一段关系，结果自然也是有缘无分。"
                    },
                    {
                        title: "情感建议",
                        content: "早点想办法从过去的感情阴影中走出来，敞开心扉迎接新的恋情，切实的去体验，而不是永远沉浸在自己的美好幻想中。"
                    }
                ])}});
                await questionResult.addCard(card7zc, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "身边出现新桃花的可能性比较大，但是矛盾和争执又会使双方的关系无法进一步推进，总是无法和谐统一。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "在感情中很难控制自己的情绪，无法消除来自内心的不安全感，犹豫不决。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "即使进入到一段恋爱关系中，两个人也很难有大的突破步入婚姻，很大可能短暂的交往后就不了了之了，也算不上是正缘。"
                    },
                    {
                        title: "情感建议",
                        content: "一段感情关系中，良好的沟通是必不可少的，不要把情绪压在心里，压抑到极点就会暴发，感情也会随之分崩离析。"
                    }
                ])}});
                await questionResult.addCard(card7zc1, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "身边出现新桃花的可能性比较大，但是矛盾和争执又会使双方关系无法进一步推进，总是无法和谐统一。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "容易被情绪左右，蒙蔽视线，不善于沟通表达，协调关系，无法消除来自内心的不安全感，犹豫不决。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "即使进入到一段恋爱关系，两个人也很难有大的突破步入婚姻，很大可能短暂的交往后就不了了之了，也算不上是正缘。"
                    },
                    {
                        title: "情感建议",
                        content: "一段感情关系中，良好的沟通是必不可少的，不要把情绪压在心里，压抑到极点就会暴发，感情也会随之分崩离析。"
                    }
                ])}});
                await questionResult.addCard(card8ll, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "身边出现新桃花的可能性还是有的，你也拥有足够的勇气和力量迎接新的感情，两个人可以相互倾听倾诉。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "在感情中你己经掌握了如何去处理任何可能出现的难题，无需因恐惧而逃避，也就没有什么阻碍。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "对于自己的选择你有着发自内心的信心和把握，而且也可以让一段感情发展出真正的亲密感，算是不错的缘分。"
                    },
                    {
                        title: "情感建议",
                        content: "对于你而言，勇敢不代表你没有恐惧，而是虽然你有恐惧，你还是愿意对自己喜欢的人有所承诺，建议你调整好自己，避免情绪积压。"
                    }
                ])}});
                await questionResult.addCard(card8ll1, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "当抽到力量逆位时，代表着缺乏勇气、信心和耐心，对应到感情上，今年新桃花出现的可能性并不大，或许你正处于自我封闭的状态，还没有调整好自己的状态去迎接一个新的恋情。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "感情中你有着较强的控制欲，但你面对感情的勇气已经减少了，徒留一种被击垮或了无希望的感觉。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "你害怕热情和欲望会摧毁你所自觉的人格，或你为自己所建立的安全模式。躲在角落里，拒绝情感投入的状态也就谈不上能不能遇到正缘了。"
                    },
                    {
                        title: "情感建议",
                        content: "对于你而言，勇敢不代表你没有恐惧，而是虽然你有恐惧，你还是愿意对自己喜欢的人有所承诺，建议你调整好自己，避免情绪积压，直面自己情感的内心世界。"
                    }
                ])}});
                await questionResult.addCard(card9ys, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "或许你正用了比平常更多的时间来疏远两性关系，而将思想更集中于自己身上，一副活在自己世界里的样子，异性自然无法靠近。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "你暂时从一段两性关系中退出，正在思考决定你想要什么、要往哪里去。因此暂时并没有谈恋爱的心思。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "没有新桃花也无所谓正缘，相比感情而言，你更想要让你的过去、现在，以及未来成为有意义的时刻。"
                    },
                    {
                        title: "情感建议",
                        content: "你追求的是独立性，需要独处以面对你的内在需求。但面对感情，还是要敞开心扉，接纳适合自己的另一半。"
                    }
                ])}});
                await questionResult.addCard(card9ys1, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "或许你正用了比平常更多的时间来疏远两性关系，而将思想更集中于自己身上，一副活在自己世界里的样子，异性自然无法靠近。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "你暂时从一段两性关系中退出，决定你想要什么、要往哪里去，并没有谈恋爱的心思。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "没有新桃花也无所谓正缘，相比感情而言，你更想要让你的过去、现在，以及未来成为有意义的时刻。"
                    },
                    {
                        title: "情感建议",
                        content: "你追求的是独立性，需要独处以面对你的内在需求。但面对感情，还是要敞开心扉，接纳适合自己的另一半。"
                    }
                ])}});
                await questionResult.addCard(card10myzl, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "一个两性关系日趋圆满的机会或可能性在增加时，可以理解为改善情况的机会越来越近了。但新桃花短时间内出现的可能性并不大。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "你的社交圈子小会导致你没有机会结识更多优秀的异性，很多客观因素并不是人为可以解决的。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "没有新的人际关系，没有新的桃花，又是正缘遥遥无期的一段时光。"
                    },
                    {
                        title: "情感建议",
                        content: "增加社交圈，多参加同学、朋友聚会，多认识新的异性，也可以多出去走走，看看外面的世界，旅游是不错的选择，没准儿会偶遇新桃花。"
                    }
                ])}});
                await questionResult.addCard(card10myzl1, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "一个两性关系日趋圆满的机会或可能性在减少时，可以理解为改善情况的机会越来越远了。因此新桃花短时间内出现的可能性并不大。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "你的社交圈子小会导致你没有机会结识更多优秀的异性，很多客观因素并不是人为可以解决。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "没有新的人际关系，没有新的桃花，又是正缘遥遥无期的一段时光。"
                    },
                    {
                        title: "情感建议",
                        content: "增加社交圈，多参加同学朋友聚会，多认识新的异性，也可以多出去走走看看外面的世界，旅游是不错的选择，没准儿会偶遇新桃花。"
                    }
                ])}});
                await questionResult.addCard(card11zy, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "你的新桃花很可能来自于靠谱人士（父母或领导）的介绍，对方各方面条件都不错，跟你的三观也比较一致。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "你在感情中太过追求付出与回报的相对平等，反而失去了很多乐趣和情趣。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "你和新桃花之间的争执基本上都可以通过沟通和解，而且两个人都有一种完全诚实和负责任的态度，都很认真的在往结婚的方向走，是不错的缘分。"
                    },
                    {
                        title: "情感建议",
                        content: "感情中没有绝对的公平，总有一个人会格外包容另一个人，如果遇到对的人，不要事事追求平衡，有时候付出也是一件值得开心的事情。"
                    }
                ])}});
                await questionResult.addCard(card11zy1, {through: {interpretation: JSON.stringify([
                    {
                        title: "有没有新桃花",
                        content: "你的新桃花很可能来自于靠谱人士的介绍，父母或领导，对方各方面条件都不错，但跟你的三观不一致，会引发很多争吵和矛盾。"
                    },
                    {
                        title: "桃花运障碍点",
                        content: "你在感情中太过追求付出与回报的相对平等，反而失去了很多乐趣和情趣。"
                    },
                    {
                        title: "新桃花是不是正缘",
                        content: "你们之间会互相指责、推委责任。对于你的付出你还是会得到回报，或者说你仍可以收割到你的耕耘，只不过这不太可能会是个欢愉的收获，最终矛盾升级，算不上正缘。"
                    },
                    {
                        title: "情感建议",
                        content: "你对自己或其他人可能并不诚实。你并不愿意追踪现今事件的原因，而总是因你的窘境去责备他人。如果你如此怠惰的话，恐怕会丧失更深刻了解自己，以及人生的机会。"
                    }
                ])}});
                await questionResult.addCard(card12ddr, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "在两性关系分析当中，倒吊人代表一段反省的时光。或许你正从一个两性关系的日常生活中抽离出来，以反省你的精神方向，以及两性关系的方向。内在的矛盾和挣扎会伴随着这张牌而来，因此很难在情感或社交上与此刻的你接近，并不能吸引到新桃花。"
                        }, {
                            title: "桃花运障碍点",
                            content: "无法得到超越社会压力的自由。它代表你会听从别人对你的期望，而非顺从你内在的声音。或许你一直都在利用角色模式引导你，而非直接去体验感情。"
                        }, {
                            title: "新桃花是不是正缘",
                            content: "这段时间你会把注意力集中在自己，而非另一半身上。这可能是要求你周遭的人多谅解及付出耐心了，这样的状态下出现的缘分算不上正缘。"
                        }, {
                            title: "情感建议",
                            content: "现在不是挣扎的时候，建议静下来好好思考你过去的行为以及未来的计划。这只是一个暂时的状态，只要你妥善的运用这段时间，对你应该是有好处的。让生命中的事物自然而然的发生，或许你会对结果感到惊喜，顺其自然，等待对的人即可。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card12ddr1, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "死亡牌象征一个两性关系即将发生深刻的改变，或是你对两性关系的态度即将发生深刻的改变。它可能是一段关系的结束，譬如某种分别，或关系中某个阶段的结束，不太会有新桃花的出现。"
                        }, {
                            title: "桃花运障碍点",
                            content: "生命中的某个章节就要结束了，而你对这份改变的接纳，将使得变化自然而然地发生，而你似乎并没有做好准备。"
                        }, {
                            title: "新桃花是不是正缘",
                            content: "正在经历着一段关系的分离或结束，并没有新的桃花，也就没有正缘。"
                        }, {
                            title: "情感建议",
                            content: "抱持着“生命将会带来某些比它从你身上拿走的更美好的东西”的信念。不要抗拒目前经历的改变，试着去接纳它吧。"
                        }
                        ])
                    }
                });

                await questionResult.addCard(card13ss, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "死亡牌象征一个两性关系即将发生深刻的改变，或是你对两性关系的态度即将发生深刻的改变。它可能是一段关系的结束，譬如某种分别，或关系中某个阶段的结束，不太会有新桃花的出现。"
                        }, {
                            title: "桃花运障碍点",
                            content: "生命中的某个章节就要结束了，而你对这份改变的接纳，将是变化自然而然地发生，而你似乎并没有做好准备。"
                        }, {title: "新桃花是不是正缘",
                            content: "正在经历着一段关系的分离或结束，并没有新的桃花，也就没有正缘。"
                        }, {
                            title: "情感建议",
                            content: "抱持着“生命将会带来某些比它从你身上拿走的更美好的东西”的信念。不要抗拒目前经历的改变，试着去接纳它吧。"
                        }
                        ])
                    }
                });

                await questionResult.addCard(card13ss1, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "死亡牌象征一个两性关系即将发生深刻的改变，或是你对两性关系的态度即将发生深刻的改变。它可能是一段关系的结束，譬如某种分别，或关系中某个阶段的结束，不太会有新桃花的出现。"
                        }, {
                            title: "桃花运障碍点",
                            content: "生命中的某个章节就要结束了，而你对这份改变的接纳，将是变化自然而然地发生，而你似乎并没有做好准备。"
                        }, {title: "新桃花是不是正缘",
                            content: "正在经历着一段关系的分离或结束，并没有新的桃花，也就没有正缘。"
                        }, {
                            title: "情感建议",
                            content: "抱持着“生命将会带来某些比它从你身上拿走的更美好的东西”的信念。不要抗拒目前经历的改变，试着去接纳它吧。"
                        }
                        ])
                    }
                });

                await questionResult.addCard(card14jz, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "你可能会在旅游的过程中遇到自己的新桃花，还可能会是一个射手座的人，你们通过交流互动沟通而相互了解。"
                        }, {
                            title: "桃花运障碍点",
                            content: "节制是一张代表行为，而非观念的牌。它代表对某种特定状况的适当行为。显示一种因为行为及情绪的结合，而带来内在平静的感觉，感情对你而言并没有太大障碍。"
                        }, {title: "新桃花是不是正缘", content: "在一段两性关系中，激情和灵性的和谐融合，让两个人的恋情细水长流，是很不错的缘分。"}, {
                            title: "情感建议", content: "你较高层次的自我，和较低层次的自我可以和谐共存，不管是精神上或实质上的行动。你都会尽力而为，只要不留遗憾就可以，很多事情不必强求。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card14jz1, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "你可能会在旅游的过程中遇到自己的新桃花，还可能会是一个射手座的人，你们通过交流互动沟通而相互欣赏。"
                        }, {title: "桃花运障碍点", content: "高层次的自我，和低层次的自我之间产生分裂，因而导致毫无节制的行为，对待感情不真诚。"}, {
                            title: "新桃花是不是正缘",
                            content: "你对于在感情状况内该怎么办缺乏了解，经常从一个极端走向另外一个极端。为了得到满足感而不断寻找目标，而结果却只有失望，以及继续地设定下一个目标，自然不是正缘。"
                        }, {
                            title: "情感建议",
                            content: "努力让自己较高层次的自我，和较低层次的自我可以和谐共存，容许更多的改变发生，或是让更多的事物远离你的生活，如此你才能看得更远或更清楚。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card15em, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "一份由爱开始的两性关系，结果却变成一种束缚，出现新桃花的可能性挺大，但会是一段建立在嫉妒或强烈控制欲之上的两性关系。"
                        }, {title: "桃花运障碍点", content: "你被欲望或惯性所支配，而非依循你更佳的判断行事。"}, {
                            title: "新桃花是不是正缘",
                            content: "只是为了性爱的理由而维系一段关系，被金钱和欲望所奴役，这样的感情充满诱惑和危险，并不算好的缘分。"
                        }, {
                            title: "情感建议", content: "摆正三观，一段感情无法提供你任何学习、成长或快乐的机会，还是远离为好，尝试性的走向自由，做出选择，把你的理性力量用于你的欲望之上。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card15em1, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "一份由爱开始的两性关系，结果却变成一种束缚，出现新桃花的可能性挺大，但会是一段建立在嫉妒或强烈控制欲之上的两性关系。"
                        }, {title: "桃花运障碍点", content: "在感情中，大多数时候，你会被欲望或惯性所支配，而非依循你更佳的判断行事。"}, {
                            title: "新桃花是不是正缘",
                            content: "只是为了性爱的理由而维系一段关系，被金钱和欲望所奴役，这样的感情充满诱惑和危险，并不算好的缘分。"
                        }, {
                            title: "情感建议", content: "摆正三观，一段感情无法提供你任何学习、成长或快乐的机会，还是远离为好，尝试性的走向自由，做出选择，把你的理性力量用于你的欲望之上。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card16gt, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "当高塔牌出现时，便到了改变的时刻。现在再来为改变做准备，或选择如何改变都已太迟，现在你需要做的就是丢掉旧东西，来一次心灵的洗礼，你无暇顾及身边是否有新桃花的出现。"
                        }, {title: "桃花运障碍点", content: "此刻的你正陷入困境而无法和平地自我解放，太过于墨守成规。"}, {
                            title: "新桃花是不是正缘",
                            content: "突如其来的改变会让你再次成长，现阶段并不能够把握住一段新的感情，自然算不上正缘。"
                        }, {
                            title: "情感建议", content: "打破固有模式，迎接新的挑战，努力提升自己，优秀的你自然能吸引到好的桃花。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card16gt1, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "当高塔牌出现时，便是到了改变的时刻。现在再来为改变做准备，或选择如何改变都已太迟，现在你需要做的就是丢掉旧东西，来一次心灵的洗礼，你无暇顾及身边是否有新桃花的出现。"
                        }, {title: "桃花运障碍点", content: "此刻的你正陷入困境而无法和平地自我解放，太过于墨守成规。"}, {
                            title: "新桃花是不是正缘",
                            content: "突如其来的改变会让你再次成长，现阶段并不能够把握住一段新的感情，自然算不上正缘。"
                        }, {
                            title: "情感建议", content: "打破固有模式，迎接新的挑战，努力提升自己，优秀的你自然能吸引到好的桃花。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card17xx, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "你有足够的自由和空间，来寻求新的机会，并且也很可能遇到一段自由的两性关系。"
                        }, {title: "桃花运障碍点", content: "在感情中你经常依赖于自己的幻想，而非实实在在的体验。"}, {
                            title: "新桃花是不是正缘",
                            content: "你们会一起度假，在结伴关系中，你拥有自主的空间和地位。因果循环也是这张牌的隐喻，所以你们很可能是命中注定要在一起的，或注定要经历这段关系。"
                        }, {
                            title: "情感建议", content: "不要总停留在幻想中，要对感情有信心，相信事物都会朝着好的方向发展，你也会是自由的。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card17xx1, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "你有足够的自由和空间，来寻求新的机会，并且也很可能遇到一段自由的两性关系。"
                        }, {title: "桃花运障碍点", content: "在感情中你经常依赖自己的幻想，而非实实在在的体验，缺乏信心。"}, {
                            title: "新桃花是不是正缘",
                            content: "你们会一起度假，在结伴关系中，你拥有自主的空间和地位。因果循环也是这张牌的隐喻，所以你们很可能是命中注定要在一起的，或注定要经历这段关系。"
                        }, {
                            title: "情感建议", content: "不要总停留在幻想中，要对感情有信心，相信事物都会是乐观的，你也会是自由的"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card18yl, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "表面上一切事情都很美好，但是底层却波涛汹涌——在日常生活中一切都圆满和谐，但是暗地里却存在着某些没有被讨论，被认知或尚未解决的事情，会有出现新桃花的可能，但无法真正了解。"
                        }, {title: "桃花运障碍点", content: "你无法面对你的恐惧，它们可能会阻碍你去做某些事情，或获得某些东西。"}, {
                            title: "新桃花是不是正缘",
                            content: "你对于更深刻的承诺怀有某种恐惧，你也想要离开这段关系，然而恐惧却又把你拉了回来。你的伴侣或许会令你回想起过去的两性关系，并不能真正摆脱过去，你们很可能是有缘无分。"
                        }, {
                            title: "情感建议", content: "事情不能光看表面，要学会透过现象看本质，想清楚自己真正想要的到底是什么。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card18yl1, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "表面上一切事情都很美好，但是底层却波涛汹涌——在日常生活中一切都圆满和谐，但是暗地里却存在着某些没有被讨论，被认知或尚未解决的事情，会有出现新桃花的可能，但无法真正了解。"
                        }, {title: "桃花运障碍点", content: "你无法面对你的恐惧，它们可能会阻碍你去做某些事情，或获得某些东西。"}, {
                            title: "新桃花是不是正缘",
                            content: "你对于更深刻的承诺怀有某种恐惧，你也想要离开这段关系，然而恐惧却又把你拉了回来。你的伴侣或许会令你回想起过去的两性关系，并不能真正摆脱过去，你们很可能是有缘无分。"
                        }, {
                            title: "情感建议", content: "事情不能光看表面，要学会透过现象看本质，想清楚自己真正想要的到底是什么。\n" +
                            "重拾希望和信心。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card19ty, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "你充满希望、理想主义，天真率直的性情会吸引到一些异性，因此新桃花出现的机率还是蛮大的。"
                        }, {title: "桃花运障碍点", content: "对待感情有时候你的想法太过天真，会有些幼稚。"}, {
                            title: "新桃花是不是正缘",
                            content: "虽然你总是保有孩子般的天真和童趣，但时间久了，关系也只能够维持表面的和谐，这些都是假象，关系很难得到进一步突破。"
                        }, {
                            title: "情感建议", content: "真实表达自我的同时也多留意对方的状态，及时了解感情中出现的问题和走向，积极面对。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card19ty1, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "你充满希望、理想主义，天真率直的性情会吸引到一些异性，因此新桃花出现的机率还是蛮大的。"
                        }, {title: "桃花运障碍点", content: "对待感情有时候你的想法太过天真，会有些幼稚。"}, {
                            title: "新桃花是不是正缘",
                            content: "虽然你总是保有孩子般的天真和童趣，但时间久了，关系也只能够维持表面和谐，这些都是假象，关系很难得到进一步突破。"
                        }, {
                            title: "情感建议", content: "真实表达自我的同时也多留意对方的状态，及时了解感情中出现的问题和走向，积极面对。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card20sp, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "你目前所有的一切并非偶然，跟过去的状态息息相关，身边也是旧人多，容易受到之前感情状况的影响，并没有什么新桃花出现。"
                        }, {
                            title: "桃花运障碍点",
                            content: "需要彻底放下过去，才能够重新来过。想要开启新的恋情，遇到一份好的桃花，需要你能够从过往的阴影中走出来。"
                        }, {
                            title: "新桃花是不是正缘",
                            content: "你了解你的精神目的，也知道要达成它的必要步骤，你能清楚地看到自己，如果投入到一段感情，那就是合适的人，但这样的可能性并不是很大。"
                        }, {
                            title: "情感建议", content: "疏理清楚自己的想法，按照自己的意愿去做就好，有没有新感情，能不能遇到对的人还是要看缘分。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card20sp1, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "你目前所有的一切并非偶然，跟过去的状态息息相关，身边也是旧人多，容易受到之前感情状况的影响，并没有什么新桃花出现。"
                        }, {title: "桃花运障碍点", content: "对待感情你缺乏清晰的判断力，情绪混乱，无法做出适合自己的正确决定。"}, {
                            title: "新桃花是不是正缘",
                            content: "你并不了解你的精神目的，也不知道要达成它的必要步骤，你不能清楚地看到自己，如果投入到一段感情，那就是盲目投入。"
                        }, {
                            title: "情感建议", content: "疏理清楚自己的想法，想清楚自己真正想要的是什么，需要的是什么，为自己的人生负起责任。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card21sj, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "抽到世界牌，代表着圆满、尽善尽美之意。你希望处于一种共荣的两性关系中，你和伴侣能够在你们所同意的范围内完全的成长、发展和生活，而你遇到这样新恋情的可能性非常大，尤其是到另一个地方旅游的时候。"
                        }, {title: "桃花运障碍点", content: "世界牌代表来自内心的快乐。它也可能暗示持久的成功，并没有什么阻碍。"}, {
                            title: "新桃花是不是正缘",
                            content: "你就站在生命希望你站的地方，而你也能感受到生命及你周遭的人的支持。这种快乐它不是来自拥有或耕耘，而是来自存在。命中注定大概就是这个样子。"
                        }, {
                            title: "情感建议", content: "遇到喜欢的人就好好把握，错过就真的回不去了，享受拥有，珍惜当下。"
                        }
                        ])
                    }
                });
                await questionResult.addCard(card21sj1, {
                    through: {
                        interpretation: JSON.stringify([{
                            title: "有没有新桃花",
                            content: "你希望处于一种共荣的两性关系中，你和伴侣能够在你们所同意的范围内完全的成长、发展和生活，而当你到另一个地方旅游的时候，遇到新桃花的可能性比较大。"
                        }, {title: "桃花运障碍点", content: "判断模糊不清，缺乏清晰的判断力。"}, {
                            title: "新桃花是不是正缘",
                            content: "短暂的恋情，也或许只是短暂的暧昧关系，跟你所设想和希望的完全不同，最终只能放弃掉。"
                        }, {
                            title: "情感建议",
                            content: "好比正在攀爬一座很高的山岳，结果却发现它的陡坡遮住另一座更高、更需要去爬的山。有人认为是这项成功带来了快乐，却不知道其实是快乐带了成功，所以建议你先找到真正的自己，再寻找爱情。"
                        }
                        ])
                    }
                });



                questionResult = await groupResult.createQuestion({name: "你们之间会不会复合？", count: 143, priceOld: 9800, priceNew: 990});
                await questionResult.addCard(card0yr, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "从这张牌来看，你们之间，情感上的起伏比较大。他比较热衷于追逐新鲜的事物。就算复合了，也并不会是一个如胶似漆的日子。整体来看，愚人牌看到当下的复合可能性为：⭐⭐ \n如果复合了，你们即将会步入一段相对轻松简单的感情生活。彼此都是很自由自在的。"},{title: "复合的障碍点",content: "愚人是一个不受世俗规范的人，也代表着自我，所以说他当下比较享受一个人自由自在，无拘无束的时光，不太想被爱情所束缚。"},{title: "情感建议",content: "可以说这段感情对你的影响非常大，你内心依然有ta，只是你太心急想要复合，挽回的方法用错了，现阶段你追逐ta，只会让ta越来越厌烦，建议你别着急，先沉淀一段时间，先改变自我，等过段时间再谈复合吧，反而会有不错的结果哦。"}])}});
                await questionResult.addCard(card0yr1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "抽到愚人逆位，意味着你比正位时更飘忽不定，更不想受到束缚。往往这种复合原因是带有情感上的空虚，会有忽冷忽热的感情。就算复合，也很难长久持续。\n你们之间的关系会变得很不稳定。总体来说是朝着一个错误的方向去发展，除了自己的不安外，也会有不支持你们的声音出现哦。\n未来你们之间的感情进展缓慢，短期之内想要复合不是很容易。对方的内心对你是有感情的，但是没有办法对你保持专一，目前的状态发展下去，很容易因为冲动做出不计后果的行为。两个人虽然不至于形同陌路，但是短期之内想要复合阻碍还是比较大的。\n整体来看，抽到愚人牌逆位时，复合概率为：⭐⭐"},{title: "复合的障碍点",content: "对待感情过于轻率，缺乏长久持续的融入感，对于婚姻会感到束缚，忽冷忽热。对待感情也会出现不专一。"},{title: "情感建议",content: "真正的缘份是相互吸引，相互喜欢，相互包容，一起计划未来。随便玩玩、不敢承诺或承担责任的爱情注定不会长久。"}])}});
                await questionResult.addCard(card1mss, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "很多时候你都搞不懂，你们怎么会走到了分手这一步，曾经彼此那么深爱，最终还是分手了，你心里还有不舍，想要挽回，更害怕复合了还会再分手，不管现在你们发生了什么，只要你能够冷静下来思考问题，你们的缘分是还会有的。\n毕竟，作为塔罗里的1号牌，抽到魔术师，最明显的含义就是你们之间的沟通很顺畅。很大可能性会展开一段区别于以往的全新恋情，会品尝到爱情的喜悦、轻松。\n整体来看，你们之间的复合概率：⭐⭐⭐⭐"},{title: "复合的障碍点",content: "在感情当中，双方处于年轻的热恋，有新鲜的热度，但是要注意关系当中充满了无限的变化。"},{title: "情感建议",content: "其实你不必想太多，ta心里还有你，建议你大胆的把自己的想法告诉ta，还是有可能会在一起的。"}])}});
                await questionResult.addCard(card1mss1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "当魔术师是正位的时候，代表着彼此沟通顺畅，很大可能性展开一段全新的恋情。会品尝到爱情的喜悦、轻松的交往。\n当抽到的是逆位魔术师则不太乐观，这代表着彼此之间会缺少热情跟沟通。会存在多心和不信任，导致结果不太乐观。\n整体来看，你们之间复合概率：⭐"},{title: "复合的障碍点",content: "热情热度消退，原本在沟通天地间的流动手势，也因逆位时失去正确导引的力量方向，而产生能量的凌乱，投射在关系中，展现为沟通不佳。"},{title: "情感建议",content: "彼此之间坦诚相待才是相处之道，不论是否可以复合都是你生命中必须经历的成长，所以不要太消极，对待感情还是要抱有希望哦~"}])}});
                await questionResult.addCard(card2njs, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "虽然是分手了，但你却未在他心中留下很差的印象，过去可能觉得性格不合适而和平分手，或是一时矛盾冲动分手。你们之间还有继续下去的可能。虽说对你没恨，不过却也没多少爱。\n女祭司牌的出现意味着你们还有机会复合是因为ta仍然觉得你是一个不错的人，但仅此并不足以让ta主动找你复合。所以你可能无法等到要等到人，不想错过只能主动把握。\n整体来看，你们之间的复合概率为：⭐⭐⭐"},{title: "复合的障碍点",content: "双方可能淡淡的，对感情总有保留。但内心或许隐藏着微微的对感情的期望。就总体上来说，可能关系上缺乏亲密的特质，对于男女情感的投入热度稀少。 "},{title: "情感建议",content: "理智是对的，但是过于理智就会失去行动哦，你可以尝试主动争取，希望还是会有的。但是要考虑是否足够相爱，或者是否自己独处更加快乐。"}])}});
                await questionResult.addCard(card2njs1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "要继续下去很难。\n女祭司逆位牌显示了你们之间的感情缺乏了更深层次的关系纽带，这种关系是极其危险的。一旦有问题的积累和矛盾爆发，你们就有可能渐行渐远。\n如今的状态，也是你们感情当中一个非常巨大的瓶颈，怎么为这一段感情增添更多的和谐与快乐，就看双方是否能为这段感情共同付出了。\n整体来看，你们的感情复合概率：⭐"},{title: "复合的障碍点",content: "彼此会产生情绪上的溃堤，潜意识的躁动，或是毛躁的情绪，情感不再被压抑，崭露了出来。此外还会展现冷漠的一面，口是心非，不够真诚。可以说是反反覆覆，情绪潮起潮落，情绪不稳定，可能变得无法掌握对方的心情。"},{title: "情感建议",content: "发展到如今，也没必要勉强。你们的缘分若隐若现，但是现实情况却让你不得不为此放弃。不管怎么样，先把控好自己的情绪吧。你的方向如何？矛盾的关键点又在哪？这些要想清楚。"}])}});
                await questionResult.addCard(card3nh, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "你们之间再次复合的机会是很大的。\n两个人曾经经过了许多风风雨雨，感情基础相对来说比较深厚。两人之间以前并没有太大的矛盾，因为小事争吵，相互猜疑渐渐信任缺失导致现在的沟通困难。\n一段感情或多或少总会遭遇一些难以预料的阻碍，能够跨过去才能够修成正果，如果不努力去化解这些问题，很可能感情就会就此终结。整体来看，抽到女皇牌，复合的概率为：⭐⭐⭐⭐"},{title: "复合的障碍点",content: "这张牌强调物质，容易沉浸在物质当中，世俗的快乐是女皇所追逐的目标。相对而言，彼此之间少了一些精神上的沟通和契合。"},{title: "情感建议",content: "虽然你们之间的缘分很深，但是再深的缘分也经不起等待，你什么都不做肯定也不能够得到你想要的。现在对方没有动力，可能就需要你来推动这段感情的发展，如果你现在不努力，这段感情的未来就很难说了。"}])}});
                await questionResult.addCard(card3nh1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "不得不说，你们复合的机会很小，基本上是到了缘分尽头。\n你们的生活里已经可以没有彼此了，各有各的世界，像两条平行线，你也没有之前那么在意对方了。偶尔还是会回想起，但已经都是过去的事情了，不会再在一起了。\n抽到女皇牌逆位时，整体来看，复合的概率为：⭐"},{title: "复合的障碍点",content: "逆位的女皇牌，代表丰盛的能量枯萎，形成一种贫瘠，掉落的权杖与从椅上跌落表示无法再享受生活，这一切可能让女皇感到情绪上的焦躁，心生欲求不满的情绪。"},{title: "情感建议",content: "没有结果的爱就不要勉强了，如果想继续，先去找出你们感情中最大的阻碍和问题吧，找出来并且解决它这是你当前首要做到的东西。"}])}});
                await questionResult.addCard(card4hd, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "你们有复合的机会，但是，结果不一定会是好的。\n因为失而复得，有些人会更加珍惜这份爱，但有些人则会变本加厉。\n想要抓住TA的心是一件比较困难而且非常疲惫的事情，所以就算你们最后复合了，你也不一定会幸福的。\n整体来看，抽到皇帝牌，你们复合的可能性为：⭐⭐⭐"},{title: "复合的障碍点",content: "在关系当中缺乏一些浪漫情调，有点大男子主义。不太善于表达感情，太过实际会导致这段感情变得枯燥乏味。"},{title: "情感建议",content: "过去的都已经过去了，这段感情会让你更加的成熟，明白怎样与人相处，你以后的感情生活，未来发展会因此更加美好。"}])}});
                await questionResult.addCard(card4hd1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "你们复合的可能性微乎其微，Ta现在已经有新的生活，甚至开始尝试其他异性。Ta的脑中早已经将你忘记，所以即使你创造机会和Ta见面，Ta也没有复合的念头。\n整体来看，你们复合的可能性为：⭐"},{title: "复合的障碍点",content: "当抽到的牌是逆位时，意味着你丧失了“皇帝”的管理特质，失去掌控的能力与缺乏先机，大男人的特质失去了，表示无法承担责任。代表着，可能会在面临严苛抉择时退却下来，因为缺乏向目标迈进所需的训练。"},{title: "情感建议",content: "你们是真的不适合，所以想要继续下去是很难的，咬咬牙，放下Ta才会遇见更好的感情。"}])}});
                await questionResult.addCard(card5jh, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "你在对方心里还有一定的位置，在这段感情或者婚姻当中你们曾经因为一些现实的原因而出现问题导致分手。\n你们之间存在第三者的牵连或者很大可能会有一方存在婚姻的牵连，两个人缺乏相互的信任，所以会沟通出现问题，这次分手显得有点匆忙。\n或许双方都有从头再来的意愿，但是会因为某些原因而不愿意向对方妥协，所以这段感情再次复合的机会还是挺大的。\n整体来看，你们复合的可能性为：⭐⭐⭐"},{title: "复合的障碍点",content: "对你而言，现在对这段感情缺乏信心，也不知道造成这段感情失败的主要原因是什么？你们之间最大的阻碍是缺乏相互的信任而导致沟通出现问题，但是需要你做出一定的努力和主动才有可能复合。"},{title: "情感建议",content: "主动和对方好好沟通下吧，总需要一个人勇敢迈出这一步。你们的基础还在，复合可能性也不错，要复合就行动起来。"}])}});
                await questionResult.addCard(card5jh1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "教皇逆位牌显示，你们的精神联系已经荡然无存。预示着你们大概是结束了。\n即使你再放不下或者再舍不得也没办法，强求也是不现实的，感情是两个人的事，你一厢情愿最终伤害的是你自己，所以ta主动回来找你的机会很小。\n整体来看，你们复合的可能性为： ⭐"},{title: "复合的障碍点",content: "感情上缺乏了能够复合的精神基础，外在的努力短时间内无法向对方证明结果会发生根本的变化。"},{title: "情感建议",content: "在选择一段关系的时候，并不是真正地去聆听自己的声音，而是参考一些“前辈”的意见，认为这样能够使得自己少走弯路。最终就会导致感情缺少了精神上的基础，会变得很脆弱。"}])}});
                await questionResult.addCard(card6lr, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "恋人牌是代表爱情最好的一张牌，出现这张牌，证明你们之间缘分未尽，是可以复合的，请不要放弃。不仅是你想着复合，对方的心里大概率也是这么想的，只差谁主动开口打破局面，便可以重归于好。\n整体来看，复合概率为：⭐⭐⭐⭐⭐"},{title: "复合的障碍点",content: "恋人本身就是象征浪漫爱情的一张牌，感情方面并不会有太多的阻碍。唯一需要的就是注意下，两人身边还是充满了一些选择跟诱惑。"},{title: "情感建议",content: "在你们的感情中你需要每一步都得走对，选择对的方式和模式是一件非常重要的事。多做些对你们感情好的事，不该做的就别做，小心身边的诱惑，只要做到这些你们的感情就能顺利的好好的发展下去。"}])}});
                await questionResult.addCard(card6lr1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "你们复合的机会低到不能再低，几乎是不可能的任务了。\n恋爱毕竟是双方面的事情，更何况未来呢？也许会受到不只双方面的影响也不一定。你们两人之间已经没有情爱了，也许未来做个好朋友还是有机会的，但也许就这样再也不联络了吧！？不要对未来抱持希望，对你来说可能会好过一点。放下，才有更光明的道路在等你前进。\n整体来看，复合概率为：⭐"},{title: "复合的障碍点",content: "中间的天使加于两端，似乎也暗示着关系当中第三人现身的可能性，或是出现了竞争者，爱情中有了第二选择。"},{title: "情感建议",content: "感情中，有时候需要懂得放手，往前看，或许对自己以及对方都是很好的解脱。要相信，一切都是最好的安排。"}])}});
                await questionResult.addCard(card7zc, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "你们还有比较好的复合的希望，一段感情分手总会有一些客观的原因，找到问题所在，并加以反省改正，避免在未来复合以后重蹈覆辙。\n这段感情很大可能是因为你的性格过于强势，又有一些任性，给对方带来很大的压力使对方觉得很疲惫，才出现今天这种分手、很难沟通的状态。\n整体来看，复合可能性:⭐⭐⭐⭐"},{title: "复合的障碍点",content: "战车的出现，有时候会意味着出现了竞争者。这在某种程度上，会给你们复合带来一定的阻碍。"},{title: "情感建议",content: "这段感情未来发展的主动权在你这里，可能你现在需要做出一些行动上的突破，才能扭转这个局面达到复合的状态。"}])}});
                await questionResult.addCard(card7zc1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "你们的内心以及现实状况都对你们之间产生了很大的影响，阻碍了复合的可能。\n你们的分手好像是顺理成章的事情，逆位战车显示的障碍也不能说是完全没有机会了。但是这条障碍显得无法跨越，有心坐下来走心的沟通却又不知道从哪里说起。\n可能是有一方在极力的逃避，这种状态要想办法消除他心中的顾虑。有障碍很常见，关键是能不能一起去面对。有心复合必须先化解眼前的障碍。\n整体来看，战车逆位时，你们复合可能性:⭐"},{title: "复合的障碍点",content: "战车的出现（战士、两头人面狮身兽呈三角形状），有时候会意味着出现了竞争者或者三角关系。你们分手的原因，有可能是因为有第三者的存在。这在某种程度上，会给你们复合带来一定的阻碍。"},{title: "情感建议",content: "对彼此的认可度并不高，爱意不深，反而是把自己放在更重要、更高的位置。因而容易产生矛盾、争执，令自己感觉疲惫和失望，所以只要多为对方考虑，解决彼此的冲突才有机会哦。"}])}});
                await questionResult.addCard(card8ll, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "抽到力量牌，代表着勇敢、信心和耐心。一个女子克服恐惧，且有信心和足够的耐心去驯服狮子。对应到感情中，代表着你是一位内心坚强的人，在面对困难（分手）的时候，你有着信心去解决它。\n你们的缘分很深，至于为什么分开，你们也有说不清道不明的误会。你不敢主动联系对方，而且你也固执的想这么久对方都不主动联系你，凭什么是你联系ta呢?其实，ta一直在你身边从未离开，你只要转个身一切都能真相大白哦。\n整体来看，复合概率为：⭐⭐⭐⭐"},{title: "复合的障碍点",content: "力量正位是一张不错的牌，在感情中，解决问题的勇气、信心、耐心，你都具备了。因此，复合没有多少障碍。"},{title: "情感建议",content: "经历了分手后，你懂得了反思自己，为自身的一些不足做出改变。你的内心变得更加强大，更加内敛有耐心。抽到力量牌就是提醒你要放慢脚步，要有耐心，以柔性力量采取行动。"}])}});
                await questionResult.addCard(card8ll1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "现在对方对你的感情已经完完全全比不上以前了。\n当面对对方的时候，是否感受到了对方在逃避你呢？没错，就当前来看，TA已经决定了放弃和你之间的感情。所以你们之间想要再复合希望很小，如果你不作为，那么你么的缘分也即将到此为止。\n整体来看，复合概率为：⭐⭐"},{title: "复合的障碍点",content: "在爱情上患得患失，缺乏自信和勇气。从牌面看，力量逆位的时候，狮子处于主导地位，也即我们被恐惧战胜了。"},{title: "情感建议",content: "不管你是否选择继续走下去，你在感情上都需要成熟独立起来。再来在这份感情中你需要把握好度，你可以选择做弱势的那一个，但不能弱到没有任何气势；同样你也可以做强势的那一个，但绝不能成为强势到完全不考虑对方的自我感觉。把握好对待另一半的度，是每一个人在爱情里都要学习的课题。"}])}});
                await questionResult.addCard(card9ys, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "你们之间还是有复合的希望的。\n这段时间里，你饱受煎熬，想继续和对方保持联系，但是现实落差又让你不知如何是好。\n其实对方目前也是很飘乎的，ta会回忆起你的好，只不过内心还有很多顾虑，不敢再迈出那一步。\n感情复苏之路，道阻且长。不过，你们还没有走到绝境，感情是可以缓慢升温的。\n整体来看，目前不是复合的最佳时机，需要耐心等待。复合可能性：⭐⭐⭐"},{title: "复合的障碍点",content: "孤独是为了自省，自省是为了寻找到答案。\n暂时单身或者退出一段感情的目的，是为了对关系做出反省和更多的思索。此次决定复合的关键在于对方自省的结果，更多取决于其内在的想法和态度，而非外在的努力。主观上能做的努力比较少！"},{title: "情感建议",content: "一段感情结束，此时你喜欢一个人冷静的思考和深思。虽然想念，但对于复合并不热衷。其实该不该复合，你应该听从你内心的声音，自我反省就是为了找到答案的！"}])}});
                await questionResult.addCard(card9ys1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "隐士逆位说明对方的内心现在处于封闭自我的状态，而且是有些在躲避你的。难以再对你敞开心扉。\n对于TA来说，你们之间并不合适，两个人缺少沟通的状态。这段感情本就是不稳定的，内心对你也难以信任，对你的感情是比较怀疑的。所以即使你去主动复合，未来你们之间的可能性也不大。\n此外，隐士是塔罗牌里的9号牌，前一张是8号牌力量牌，回到上一张牌来看，能不能复合很大程度上取决于女方的态度和决心。隐士的下一阶是高塔牌，高塔意味着分离、崩塌、感情的破裂。整体来看，复合的可能性为：⭐"},{title: "复合的障碍点",content: "隐士逆位时，意味着原来的老办法用不了，需要寻找伯乐来帮助，借助外力来帮助复合。"},{title: "情感建议",content: "你十分小心地维持这段关系，但是对于自己的付出又感觉没有价值，你需要开始学着敞开心扉，别习惯性将自己隐藏起来，又或者将真实的一面隐藏，虚假的一面暴露，这只会让对方感觉不到你的真心，只会让对方更远离你。"}])}});
                await questionResult.addCard(card10myzl, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "命运之轮是一张中性的牌，它是塔罗牌中的10号牌，意味着改变、变化。但是，是向着好的方向或坏的方向发展，并不那么明朗。整张牌预测着命运的不可预测，且其象征的命运不是人力可以控制的。它告诫我们得意时不要忘记失意时候的苦楚，失意时也别一蹶不振。相对来说，当命运之轮是正位的时候，这个转变是一种好的转变。\n对应到感情上来看，正位的时候，有一种双方姻缘天注定的意味，你们或许是一见钟情，或许是复合后会开启一段全新的关系。\n牌面上显示你们在分手那段时间，发生过争执，有过摩擦和误会，而且你们双方都说了伤人的话，对方有些气话你都当真了，所以你根本就不知道ta在想什么。不过从你抽到这张牌来说，一切都在往好的方向发展，ta会按捺不住自己来找你沟通并会提出复合。\n整体来看，复合可能性为：⭐⭐⭐"},{title: "复合的障碍点",content: "对于复合这个问题来说，很多因素，或者说结果是非人力可以控制的。如果时机没有到来，自身再努力可能作用也不大。"},{title: "情感建议",content: "面对你们感情的状况，建议是顺其自然比较好，别刻意的改变什么，只要做好未来世事无常的心理准备即可，不断的向着自己的目标前进。此外，遇到机会要及时勇敢地抓住！"}])}});
                await questionResult.addCard(card10myzl1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "命运之轮是一张中性的牌，它是塔罗牌中的10号牌，意味着改变、变化。\n抽到这张牌，不能果断的说你们之间绝对不会复合，但复合的几率不是很理想。其实你们之间缘分未尽，毕竟Ta并不讨厌你，你偶尔也会想Ta。不过在等待复合的过程中你们可能遇到其Ta的人，而这个人很可能会打断你们复合的可能。此外就是，你没有把握住最佳的复合时机去提出复合要求。也会导致，后面再要复合难度比较大。\n整体来看，复合可能性为：⭐⭐"},{title: "复合的障碍点",content: "当命运之轮逆位的时候，意味着当事人没有能够把握好最佳复合的时机。导致关系没有进展。"},{title: "情感建议",content: "命运之轮逆位的时候，预示着你人生的低迷时刻，也许你有些无法接受，但是若能以平常心来看待，这无疑是你成长的最好时机。虽然摆在你面前的是无数荆棘，但坚持下去将是平坦的大道。我们必须从有限的环境中，找到通往自由的道路。"}])}});
                await questionResult.addCard(card11zy, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "正义对应的是天秤座。\n一般出现这张牌，通常与某个决定有关。此刻的你或者对方，正在以心中的天秤来衡量各种因素，以做出最好的决定。你们在做决定的时候，会用理性的思考方式，仔细分析利弊。\n下决定的过程并不轻松，你心中的天秤会摇摆不定，好像坐在两根柱子中间的正义一样，你不知道该向左还是向右，该复合还是分手。不过，此刻是正位牌，相对来说，复合的可能性会稍微大一些。\n整体来看，复合概率：⭐⭐⭐"},{title: "复合的障碍点",content: "感情毕竟是感性的事，太过于理性地去分析利弊，最终做出的决定不一定是正确的。"},{title: "情感建议",content: "感情当中，追求关系的平等、公平并没有错误。\n不过，如果太过了，则会显得一板一眼，缺乏人情味道。要知道，感情中没有绝对的公平，总有一个人会格外包容另一个人，如果遇到对的人，不要事事追求平衡，有时候付出也是一件值得开心的事情。"}])}});
                await questionResult.addCard(card11zy1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "抽到塔罗牌正义逆位，证明你们之间的关系存在着严重的失衡状态。\n一方对另一方的付出远远大于回报。或许导致你们分手最主要的原因正在于一段关系不平等久了，或者其中一方长时间付出太多，收获太少，心灰意冷之后选择了放手。整体来看，你们复合的可能性：⭐"},{title: "复合的障碍点",content: "两人之间，性格并不是很合得来。分手的决定是长期积压后的爆发，并非一时的冲动，想要复合，需要能给到对方足够的信心。"},{title: "情感建议",content: "爱情当中，每个人对对方的爱有多有少，无法追求绝对的公平。但是谁也无法一直处于完全的忍让状态，不然早晚有一天会爆发。如果情况不会改变，那即使复合了，最终还是会分手，所以请考虑清楚再做决定。"}])}});
                await questionResult.addCard(card12ddr, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "抽到倒吊人这张牌，在复合问题上，情况不太乐观。\n倒吊人是塔罗牌中的12号牌，它的下一张牌是死神牌，死神牌意味着双方会有很大决心解决掉目前的情况，不管是彻底分开，还是彼此给双方一个机会重新开始，都会得到定论。\n整体来看，还是有可能复合，关键就看双方对复合的态度是不是积极的，以及有无共同的作品，比如孩子等，如果有的话，是会提升复合的概率的。综上，复合概率：⭐⭐"},{title: "复合的障碍点",content: "彼此之间缺少实际行动，缺少跟对方的沟通，太过于沉浸在自己的想法当中。"},{title: "情感建议",content: "倒吊人代表著一段反省的时光，但是一味的思考和等待也不是解决问题的办法，还是需要拿出一些实际行动来，不要拖延，直面问题，解决问题。"}])}});
                await questionResult.addCard(card12ddr1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "抽到倒吊人这张牌，在复合问题上，情况不太乐观。倒吊人是塔罗牌中的12号牌，倒吊人逆位意味着你需要回到上一张牌去理清现在的情况。上一张是正义牌，意味着你们之间的关系长期处于一种不公平的状态，失衡已久。\n此外，倒吊人逆位还意味着，你们之间的关系，可能会受到来自长辈或者其他一些外在因素的影响，导致你们无法独立去解决彼此之间的问题。整体来看，出现倒吊人逆位，复合概率：⭐"},{title: "复合的障碍点",content: "倒吊人正位代表着有时候你能够做到换个角度看世界，看问题。当其处于逆位的时候，意味着你缺失了这样的能力，针对目前的情况，你无法换个角度去洞悉它，帮助自己做出好的判断。你受到拘束，却很想得到自由。也许你并不了解现在到底是什么东西束缚了你，或者，这种束缚将会为你带来些什么？"},{title: "情感建议",content: "别人的建议固然重要，但是最终还是需要顺从你内心真正的想法。此刻的你，需要静下来好好思考你过去的行为以及未来的计划。这只是一个暂时的状态，只要你妥善的运用好这段时间，对你应该是有好处的。\n让生命中的事物自然而然的发生，或许你会对结果感到惊喜，顺其自然，等待对的人即可。"}])}});
                await questionResult.addCard(card13ss, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "抽到死神牌，基本可以断定复合的概率微乎其微。死神有很多象征含义，转变、新生等等，但是最主要的含义是结束。出现这张牌，意味着你们之间，应该是到了彻底结束的时刻了。\n整体来看，复合概率：⭐"},{title: "复合的障碍点",content: "死神就像一个橡皮擦，把过往的所有事物都擦掉了，任何试图阻挡的物体都将被摧毁。你能做的就是接受它。置之死地而后生。 "},{title: "情感建议",content: "俗话说“上帝在你眼前关上一扇门，必定为你打开另一扇窗”。到了该放下过往，重获新生的时刻了。希望能够勇敢一些！"}])}});
                await questionResult.addCard(card13ss1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "抽到死神牌，基本可以断定复合的概率微乎其微。当死神牌是逆位的时候，通常表示你不愿意结束，不肯放手。沉浸在过去，而不愿意展望未来。\n整体来看，复合概率：⭐"},{title: "复合的障碍点",content: "死神就像一个橡皮擦，把过往的所有事物都擦掉了，任何试图阻挡的物体都将会摧毁。你能做的就是接受它。置之死地而后生。 "},{title: "情感建议",content: "俗话说“上帝在你眼前关上一扇门，必定为你打开另一扇窗”。到了该放下过往，重获新生的时刻了。希望能够勇敢一些。死神逆位提醒我们，迟迟不肯放手，只会让最终的结束过程更加痛苦。既然无法挽回，不如早点迎接新的生活。"}])}});
                await questionResult.addCard(card14jz, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "节制这张牌，顾名思义，其意思是有所节制。对于大多数人而言，这意味着自我控制。因为懂得节制，所以能够达到平衡，进而能够实现和谐。\n出现节制牌，意味着你具备调和的能力，对应到感情上，象征着你们之间的感情会得到调和以及达到和谐，彼此沟通还是比较顺畅的。\n整体来看，复合概率：⭐⭐⭐⭐"},{title: "复合的障碍点",content: "节制是一张代表行为，而非观念的牌。它代表对某种特定状况的适当行为。显示一种因为行为及情绪的结合，而带来内在平静的感觉。目前来看，并没有太大障碍。"},{title: "情感建议",content: "节制是塔罗牌里的14号牌，下一张是恶魔牌，恶魔牌代表着欲望和束缚，如果成功复合，需要保持着节制牌里的调和沟通能力，避免犯下恶魔牌里的问题。"}])}});
                await questionResult.addCard(card14jz1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "节制逆位，代表着消耗、下降、走极端、疲劳、损失等。\n逆位的时候，天使杯子中的水会倾倒出来，对应到感情当中，象征着彼此之间的沟通出现了问题，虽然彼此还是会不断尝试沟通，但是每次沟通都没有结果，久而久之，会感到心累。有想要放弃的念头。\n整体来看，复合概率：⭐"},{title: "复合的障碍点",content: "节制逆位，代表着你们双方都是不容易向对方妥协并且没耐心容易情绪化的主，加上双方相处缺乏必要的沟通和自我调节，如果继续发展下去，你们的关系可谓非常危险！"},{title: "情感建议",content: "出现这张牌，提醒着你需要回到上一张牌（死神牌），仔细想一想，你渴求的是结束还是新生？你需要好好调整下自己的性格，别太任性也别太极端。\n在感情里可以允许有情绪出现，但情绪一旦出现要注意自我调节，稳住情绪，切忌情绪一来就发泄出去。同时在和对方的相处中要注意多沟通，很多事可能仅仅是小事而已，说开了就好，憋在心里不说，反而会让小事变成大事。"}])}});
                await questionResult.addCard(card15em, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "恶魔是塔罗牌里的15号牌，1+5=6，6号牌是恋人牌。恶魔是恋人牌的变种。代表着欲望、束缚、沉迷、物质主义等。出现恶魔牌暗示着你成为了自身欲望的奴隶。\n对应到感情中，恶魔牌代表的可能是一种束缚性的关系，也许是当事人明知道不好，却拒绝结束这段关系。也代表着有性无爱，或者说爱情里掺杂了太多物质的因素。整体来看，复合可能性为：⭐⭐⭐"},{title: "复合的障碍点",content: "这里的恶魔，更多的是性与欲望的满足，两人之间存在纠缠（铁链），但是这种纠缠实际上并不牢靠。"},{title: "情感建议",content: "恶魔牌的下一张是高塔，高塔的含义是无可避免的坍塌和无法扭转的、突如其来的改变，欲望如火，稍不小心，便会伤害到自己。你需要冷静思考，自己需要的是什么，以及可以多听一听旁人的建议。"}])}});
                await questionResult.addCard(card15em1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "恶魔逆位，套在脖子上的铁链便会脱落，代表着挣脱了欲望、或者心中恶魔的束缚。\n也许你们之前的关系或者爱情，掺杂了太多物质上或者性欲上的因素。当恶魔逆位的时候，象征着当事人心里想着摆脱纠缠，重获“自由”。\n整体来看，复合概率：⭐⭐"},{title: "复合的障碍点",content: "即将解开枷锁，不再受束缚了，脱身于权力的关系当中，卸下枷锁也代表着不再受其制约，不自欺欺人逐渐看清现实。"},{title: "情感建议", content: "恶魔是塔罗牌里的15号牌，当恶魔逆位的时候，提醒着我们，需要回到上一张牌好好修炼上一个课题。上一张牌是节制，也即需要学习如何和谐相处，控制好自己的情绪。\n目前来说，不要过分去纠缠对方，以朋友的名义去接近对方是最好的，你们的感情缺乏一个升温的过程，所以你要和对方通过沟通恢复到一个能和谐相处的程度，然后再考虑后续发展的问题。"}])}});
                await questionResult.addCard(card16gt, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "高塔是塔罗牌当中的16号牌，代表着突如其来的改变、无法挽回的崩塌。是一种剧变和灾难。\n应到你们的感情上，可能这次的分手，来的比较突然，有一方事先完全没有想到会走到这一步。\n整体来看，复合概率：⭐"},{title: "复合的障碍点",content: "高塔带来的剧变，一般都是当事人不可控制的。你们之间的分手，可能存在强有力的外力干涉。类似雷电击中了高塔，有可能一方的父母强烈反对你们在一起，最终导致了分手。"},{title: "情感建议",content: "你和伴侣间似乎发生了突如其来的改变或解体，你们之间的关系受到流言或者其他因素的破坏，使对方离你而去。\n高塔牌也暗示某种结构或模式已经没有办法继续存在，发生突然的改变是为了让你能再次成长。当高塔牌出现时，便到了改变的时刻。你必须舍弃以往的一切，来适应新的模式。"}])}});
                await questionResult.addCard(card16gt1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "高塔是塔罗牌当中的16号牌，代表着突如其来的改变、无法挽回的崩塌。是一种剧变和灾难。\n当高塔逆位的时候，提醒着当事人需要回到上一张牌去思索自己的问题所在，上一张牌是15号牌恶魔。可能你们之间的关系，长久以来处于一种掺杂了很多性欲望或者物质金钱等外在因素，你们之前在一起更多的是一种束缚性的关系，这种纠缠看似难舍难分，实际上并不牢靠。\n整体来看，复合概率：⭐"},{title: "复合的障碍点",content: "高塔带来的剧变，一般都是当事人不可控制的。你们之间的分手，可能存在强有力的外力的干涉。类似雷电击中了高塔，有可能一方的父母强烈反对你们在一起，最终导致了分手。"},{title: "情感建议",content: "你和伴侣间似乎发生了突如其来的改变或解体，你们之间的关系受到流言或者其他因素的破坏，使对方离你而去。高塔牌也暗示某种结构或模式已经没有办法继续存在，发生突然的改变是为了让你能再次成长。当高塔牌出现时，便到了改变的时刻。你必须舍弃以往的一切，来适应新的模式。\n没有非常的破坏，就没有非常的建设。破坏的过程很痛苦，但为了光明的前景，短暂的痛苦也值得。"}])}});
                await questionResult.addCard(card17xx, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "星星牌是塔罗牌里的17号牌。代表着希望、愿望满足、理想的对象、美好的恋情等。\n抽到这张牌，意味着你大概率能心想事成。对应到复合上，你们复合的概率还是很大的，整体来看，复合概率：⭐⭐⭐⭐"},{title: "复合的障碍点",content: "星星牌的下一张牌是18号月亮牌，月亮牌代表着恐惧、焦虑和担心。或许当事人心里也很倾向于复合，可是又对复合后的生活和关系充满了担心。"},{title: "情感建议",content: "不要总停留在幻想中，要对感情有信心，相信事物都会朝着好的方向发展，你也会是自由的。所以大胆的做出决定吧！很多事情，只有实践、行动了才会有答案。"}])}});
                await questionResult.addCard(card17xx1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "星星牌逆位，代表着挫折、失望、事与愿违、情况悲观等等。\n星星牌是一张好牌，但是逆位时则不太乐观。对应到复合上来看，你们复合的概率偏低，复合可能性为：⭐⭐"},{title: "复合的障碍点",content: "星星牌是塔罗牌里的17号牌，它的上一张是高塔牌，高塔牌的含义是突如其来的剧变，对于能不能复合，需要看导致你们分手的原因是否足够严重，有无可以调和、或者人为掌控的余地。"},{title: "情感建议",content: "或许你对上一段感情感到很失望、心有不甘。但是，不管结果如何，对待未来、对待接下来的生活，还是需要保有一颗积极乐观的心态。要相信，希望是自己创造出来的。"}])}});
                await questionResult.addCard(card18yl, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "月亮牌代表着不安、怀疑、恐惧。\n抽到这张牌，对应到感情上，意味着你们之间的关系缺少了一些信任，当事人很敏感、保持着高度警觉，害怕受到伤害，尽管有着伴侣的承诺，仍然会犹豫不决，甚至有着想要逃避的想法。\n整体来看，复合的概率偏低，复合可能性：⭐⭐"},{title: "复合的障碍点",content: "在爱情上，表面可能风平浪静，其实你的内心可能已陷入复杂的三角关系中，由于你对自己的心态都弄不清楚。情感的混乱蒙蔽了理智，内心充满了不安及迷惑。"},{title: "情感建议",content: "表面上看问题好像不大，实际上问题都潜藏在了当事人的内心里。需要让ta看到更多的希望和美好未来的可能性，才能促进复合的概率。"}])}});
                await questionResult.addCard(card18yl1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "当月亮逆位的时候，代表着存在于你们之间的问题开始浮现，你们开始愿意去直面问题了。只要彼此都以积极的态度去解决问题，那么复合的可能性还是蛮高的。\n整体来看，抽到月亮逆位，复合的可能性为：⭐⭐⭐"},{title: "复合的障碍点",content: "月亮是塔罗牌里的18号牌，当出现逆位的时候，提醒着当事人需要回到上一张牌——星星牌，去加强希望和信心。"},{title: "情感建议",content: "事情不能光看表面，要学会透过现象看本质，想清楚自己真正想要的到底是什么。\n重拾希望和信心。\n此外，如果只是停留在心中的梦魇中不去了解，那么困扰你的问题仍如同心中阴影般挥之不去。所以赶快走出来吧。"}])}});
                await questionResult.addCard(card19ty, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "太阳是塔罗牌当中的19号牌，代表着阳光、快乐、正大光明等。\n这是一张光明面最好的牌，对应到感情上，抽到这张牌，证明结果会很不错。整体来看，复合的可能性很高，复合概率：⭐⭐⭐⭐"},{title: "复合的障碍点",content: "对待感情有时候你的想法太过天真，会有些幼稚（小孩的寓意），考虑问题时会不够审慎。"},{title: "情感建议",content: "虽然说太阳如此光明，但过犹不及，任何事情都有隐藏的危险处。正如太阳虽然能给我们温暖与能量，但是也能灼伤我们。我们需要注意那些隐藏的问题，将其扼杀在萌芽状态中会比较好。"}])}});
                await questionResult.addCard(card19ty1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "太阳是塔罗牌当中的19号牌，代表着阳光、快乐、正大光明等。\n这是一张光明面最好的牌，对应到感情上，抽到太阳正位，证明结果会很不错。抽到逆位时，则不是很乐观，复合上会存在障碍。\n整体来看，复合概率：⭐⭐"},{title: "复合的障碍点",content: "太阳逆位，意味着热情消退，你们之间留存的感情正在变淡。分手时间越旧，可能复合的可能性就会越低。"},{title: "情感建议",content: "感情当中，要注意未雨绸缪，以及避免乐极生悲。当激情消退的时候，必然会回归到平淡相处的模式，需要了解这是爱情必经的过程和阶段。"}])}});
                await questionResult.addCard(card20sp, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "审判是塔罗牌里的20号牌，它的前一张是太阳牌，后一张是世界牌，都是很不错的牌。审判处在中间位置，含义也不差。代表着觉醒、复活、新的开始、新的关系等。\n对应到感情上，意味着你们经历分手期间的痛定思痛，即将迎来一段新的关系，一个重生的机会，整体来看复合概率：⭐⭐⭐⭐"},{title: "复合的障碍点",content: "需要彻底放下过去，才能够重新来过。要注意，复合之后是重生，而不是过去的重复，注意避免重蹈覆辙。"},{title: "情感建议",content: "失而复得的爱情来之不易，这是经历了分手、哭泣、沉思等代价换来的。如果复合了，需要加倍用心去经营。好好珍惜！"}])}});
                await questionResult.addCard(card20sp1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "审判是塔罗牌里的20号牌，它的前一张是太阳牌，后一张是世界牌，都是很不错的牌。审判处在中间位置，含义也不差。正位时，代表着觉醒、复活、新的开始、新的关系等。\n当抽到逆位时，则不太理想，对应到感情上，意味着你们分手这段时间，当事人依旧没有能够痛定思痛地反思上一段感情里的问题，还没有达到能够迎接新生的最佳时机。整体来看复合概率：⭐⭐"},{title: "复合的障碍点",content: "不愿意检视自己的内在，不愿意深刻的体会反省，事情无法重生，没有新的作为。过去的习惯会成为当前的行为根本，因为错误没有正确的被检讨改过。"},{title: "情感建议",content: "审判的过程是痛苦的，过去的作为展现在眼前，人就必须为其负责，必须偿还过去的种种。事情已经终结了，事实已就是如此，无法再改变了，消逝的时光不会回来，我们能够做的，就是用未来来补偿过去，尽力弥补这一切。"}])}});
                await questionResult.addCard(card21sj, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "抽到世界牌，代表着圆满、尽善尽美之意。对应到感情上，意味着彼此之间会有一个完美的结局或者新的开始。整体来看，复合概率：⭐⭐⭐"},{title: "复合的障碍点",content: "有可能是彼此给对方再一次机会，重新来过。也可能是彼此彻底结束，各自开启一段新的旅程。"},{title: "情感建议",content: "分手不一定意味着不好，复合也不一定意味着就好。跟随着自己的心去做决定即可。你觉得幸福就好。"}])}});
                await questionResult.addCard(card21sj1, {through: {interpretation: JSON.stringify([{title: "复合的可能性",content: "抽到世界牌正位，代表着圆满、尽善尽美之意。对应到感情上，意味着彼此之间会有一个完美的结局或者新的开始。当抽到逆位时，意思则相反，意味着不圆满，劳燕分飞等。整体来看，复合可能性：⭐⭐"},{title: "复合的障碍点",content: "世界牌倒立时，也可以暗示事两性关系上的成功，但是这种成功并不能持续，只好被放弃。在这项成功之外，其实还有更伟大的成功。虽然目前不顺利，但这只是时间早晚的问题而已。就好像有人以为是成功带来了快乐，却不知道其实是快乐带来了成功。"},{title: "情感建议",content: "只是寻求短暂回报，而忽略了最终的精神目标，会让人长期的处于不满足的状态中。在追寻比较小的目标的时候，也需要考虑下比较长远的、精神层次的目标。"}])}});




                questionResult = await groupResult.createQuestion({name: "两人未来发展趋势？", count: 232, priceOld: 9800, priceNew: 990});

                await questionResult.addCard(card0yr, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "愚人是一张代表着自由、天真的牌。\n抽到这张牌，意味着，你们之间可能会进入一段相对轻松、自在的感情生活，就像画面上的愚人那样，充满着欢快。但是与此同时，也需要注意到一些摆在眼前的危险。\n愚人代表着对方或你是一个不受世俗规范的人，比较自我，比较享受自由自在、无拘无束的时光，不太想被束缚。可是爱情是两人的事，鱼和熊掌不可兼得，你不可能又要爱，又要绝对的自由。这个是不现实的。\n愚人的下一张牌是魔术师，代表着沟通，如果你们想一直往前走下去，意味着你们之间需要加强彼此的沟通，了解彼此的诉求，掌握好爱情和自由之间的平衡点。这样感情才能一直顺顺利利。\n整体来看，你们的感情发展乐观指数：⭐⭐⭐"},{title: "情感建议",content: "你们的感情在未来会遇到各类的挫折和困难（脚下的悬崖），但那些并不是无法逾越的，只要你坚持你们最初的信念一切都有可能。\n此外，爱情的意义不在于结果，而是过程。很多时候，我们难以奢求完美的结果，过程快乐过也就够了。就像此刻的愚人一样，即使脚下有悬崖，他仍旧很开心的样子。"}])}});
                await questionResult.addCard(card0yr1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "愚人是一张代表着自由、天真的牌。当其逆位时，意味着比正位时候更加飘忽不定，不想受到任何束缚。\n此外，这张牌代表你们目前对感情没有清晰的目标与长远的打算，你对爱情随遇而安的态度会让对方缺乏安全感。 \n爱情是两个人的事，鱼和熊掌不可兼得，你不可能又要爱，又要绝对的自由。抱着这样的想法，早晚会出现问题。\n整体来看，你们的感情发展乐观指数：⭐⭐"},{title: "情感建议",content: "真正的缘份是相互吸引，相互喜欢，相互包容，一起计划未来。随便玩玩、不敢承诺或承担责任的爱情注定不会长久。"}])}});
                await questionResult.addCard(card1mss, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "魔术师在塔罗中，序号是1。这预示着一切的开始。牌面中的魔术师站在桌前，桌上有剑、杯、星和杖，象征物质构成四要素：权杖（火）、圣杯（水）、宝剑（风）和钱币（土）。四大元素的集合，象征着完美。他手持魔杖，天地会赐予他力量。这象征着你将会获得好运的加持。\n此外，魔术师还代表着良好的沟通。魔术师身披的大红色的披风，象征着你会展开一段激情、热烈的恋情，而白色的衣服又代表了纯洁美好的爱情。\n因此，整体来看，你们的感情发展乐观指数：⭐⭐⭐⭐"},{title: "情感建议",content: "彼此相处，需要继续保持着良好的沟通，遇到问题别闷在心里不说，独自生闷气。要知道，良好的沟通是你们感情得以一直和谐发展的关键所在！"}])}});
                await questionResult.addCard(card1mss1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "魔术师在塔罗中，序号是1。这预示着一切的开始。牌面中的魔术师站在桌前，桌上有剑、杯、星和杖，象征物质构成四要素：权杖（火）、圣杯（水）、宝剑（风）和钱币（土）。四大元素的集合，象征着完美。他手持魔杖，天地会赐予他力量。这象征着你将会获得好运的加持。\n当然，这是指魔术师是正位时候的意思。当魔术师逆位时，结果恰恰相反，这时的你们沟通不畅，感情会比较坎坷，争吵、冷战、甚至分手危机都会存在。\n整体来看，抽到魔术师逆位，意味着你们的感情发展乐观指数：⭐"},{title: "情感建议",content: "魔术师逆位时，代表着你们之间的热度消退，原本在沟通天地间的流动手势，也因逆位时失去正确导引的力量方向，而产生能量的凌乱。投射在关系中，展现为沟通不佳。这会给你们的感情带来致命的危险。因此，学会沟通、学会控制情绪变得极为重要。"}])}});
                await questionResult.addCard(card2njs, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "抽到女祭司这张牌，代表着你们的关系可能有些冷淡。双方的交集和接触并不多，即使在相处也仅仅是安静的坐着，一起看书又或者吃饭而已。\n你们之间话题太少，可能本身双方也都比较偏向内向，当然或许你们自己会觉得这样很安逸很好。　\n整体来看，你们的感情发展乐观指数：⭐⭐⭐"},{title: "情感建议",content: "抽到这张牌，代表着你或者对方都欣赏有内涵的人，仅靠外表是吸引不到彼此的。\n抽到这张牌，提醒着我们在闲暇时间需要多看书、多学习，这样才能在对方面前显得有内涵有水准。\n同时如果你希望你们的关系能进一步的发展，你得学着弄点小花样了，一起去游乐园又或者去露天酒吧疯一把都会是给爱情加热的不错方法。"}])}});
                await questionResult.addCard(card2njs1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "抽到这张牌，代表着你们之间要继续走下去会有些困难。\n女祭司逆位牌显示了你们之间的感情缺乏了更深层次的关系纽带，这种关系是极其危险的。一旦有问题的积累和矛盾的爆发，你们就有可能渐行渐远。\n如今的状态，也是你们感情当中一个非常巨大的瓶颈，怎么为这一段感情增添更多的和谐与快乐，就看双方是否能为这段感情共同付出了。\n整体来看，你们的感情发展乐观指数：⭐"},{title: "情感建议",content: "发展到如今，也没必要勉强。你们的缘分若隐若现，但是现实情况却让你不得不为此放弃。不管怎么样，先把控好自己的情绪吧。你的方向如何？矛盾的关键点又在哪？这些要想清楚。"}])}});
                await questionResult.addCard(card3nh, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "女皇在爱情上的分析，代表你和伴侣是透过感情和欢乐来贴近人生，并且拥有着活力和成长。它暗示你的两性关系朝著下一个自然段阶迈进，也可能形容怀孕。 因为婴儿的来临通常会让两性关系进入一个新的阶段。这是一张在感情描述上， 十分积极的牌喔！\n整体来看，感情发展乐观指数：⭐⭐⭐"},{title: "情感建议",content: "如果你是单身者，从牌面显示你的爱情暂时还不会有什么发展哦，但未来会有好转，就看你到时候能否把握住机会了，并且还需要不断提升自己。如果是有对象的人，还需要注意下平时的争执，好好经营你们的感情。"}])}});
                await questionResult.addCard(card3nh1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "逆位的女皇牌，代表丰盛的能量枯萎，形成一种贫瘠。掉落的权杖与从椅上跌落表示无法再享受生活，这一切可能让女皇感到情绪上的焦躁，心生欲求不满的情绪。女皇逆位，代表着你们未来的发展不是很顺利，在关于孩子的问题上，出现女皇逆位，还可能意味著流产，堕胎或生产。整体来看，感情发展乐观指数：⭐"},{title: "情感建议",content: "没有结果的爱就不要勉强了，如果想继续，需要先找出你们感情中最大的阻碍和问题。此外，对待感情，需要冷静地思考所有的选择，再运用理性来解决问题。女皇倒立还意味着你对爱过于知性或理想化了。"}])}});
                await questionResult.addCard(card4hd, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "皇帝牌对应的星座是白羊座，白羊座是12星座之首。有着积极、野心、自信的特质。是天生的领导者，敢于冒险，固执冲动。抽到这张牌，代表着你们的物质基础很不错，在感情发展趋势上也还行。你们对彼此的感情比较积极、且有着信心。\n不足的地方在于，你们的感情当中缺少了一些浪漫的气息。你或者对方不太善于表达感情，这会导致你们的感情稍显枯燥。\n整体来看，你们的感情发展乐观指数：⭐⭐⭐"},{title: "情感建议",content: "需要刻意学习浪漫这一门课程，在感情中，物质条件固然重要，但是如果能再增加一些情调的话，感情会迅速升温哦。"}])}});
                await questionResult.addCard(card4hd1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "正位的皇帝牌对应的星座是白羊座，白羊座是12星座之首。有着积极、野心、自信的特质。是天生的领导者，敢于冒险，固执冲动。\n当皇帝牌处于逆位的时候，则不太理想，代表着会显得没有担当，懦弱，刚愎自用，没有勇气去面对当前的一切，处处提防他人，显得防卫心极强，疑神疑鬼。\n不得不说你们的感情和性格将会是你们关系发展的最大阻碍，加上因为不够成熟的原因，你们的感情要有结果有点难。\n在你或者对方心里，另外一方属于既强势又不成熟、占有欲强，自己却总是为所欲为的人。对他人要求很高，自己却是个超级懒惰的人。\n整体来看，你们的感情发展乐观指数：⭐"},{title: "情感建议",content: "首先你需要让你自己成熟起来，不成熟的本质会成为你们感情中的最大阻碍，无论是针对这份感情还是你未来的爱情之路。\n再来你需要冷静下来好好考虑下这份爱是否值得继续走下去，是否有继续下去的必要。然后做出选择，顺着选择走下去。"}])}});
                await questionResult.addCard(card5jh, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "教皇所形容的这段关系，是遵从他人期望的一段关系。这段关系中的伴侣很难忠实于自己，也很难忠实于在两性关系中他们真正的需求，因为他们在适应他人对他们的期望上觉得压力重重。\n抽到这张牌暗示你们在这段恋情中，一开始感情没有开好头，以后进很容易走下坡路，你们的爱情发展可能会越来越低迷。\n你们的感情发展乐观指数：⭐⭐"},{title: "情感建议",content: "建议你们先相处一段时间吧，多磨合一下你们的契合度，放平心态不要急于升级关系。多关心生活，调整好自己，你们的爱情还是有可能会滋生出一些更加宝贵的东西。"}])}});
                await questionResult.addCard(card5jh1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "教皇逆位说明你们之间的感情进展缓慢，而且这段感情可能也是不被长辈所看好的。两个人之间彼此不够体贴，而且你的占有欲过重，在感情的相处之中是有些固执的，会不愿意听取他人的意见。你们的感情发展乐观指数：⭐⭐"},{title: "情感建议",content: "多尝试着去调整自己的状态，多去听取周围人的意见是对于你们之间的未来发展比较好的。"}])}});
                await questionResult.addCard(card6lr, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "抽到这张牌，你们大可以不用考虑太多，你们的感情绝对是能够有结果的那一个，你们的结合是最正确的选择。\n在一起的日子会非常幸福而且充满了浪漫与温馨。别怀疑，和ta相处在一起一定让你觉得很轻松愉快吧，你自己在面对ta的时候都会有种想要一直走下去，或者很惊讶怎么会有这样让你能够完全的无条件接受的人。\n整体来看，你们的感情发展乐观指数：⭐⭐⭐⭐⭐"},{title: "情感建议",content: "在你们的感情中你需要每一步都得走对，选择对的方式和模式是一件非常重要的事。多做些对你们感情好的事，吵架什么的都远离，不该做的就别做，只要做到这些你们的感情就能顺利的好好的发展下去。"}])}});
                await questionResult.addCard(card6lr1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你们彼此选择了对方从某种角度来讲就是个错误，你们要结合将会面临较大的问题！首先你们得先把你们要在一起的最大阻碍解决掉，不被祝福的爱情是很难有结果的。\n本身就不稳定的爱情里，你需要小心，可能你们之间已经有了第三者出现。你们之间有很大的概率因为支撑不了这份没有结果的爱，加上又有了新人，最终导致这段关系结束。你们的感情发展乐观指数：⭐"},{title: "情感建议",content: "其实在对方的心中，首先你需要明确你心中对爱情的需求是什么？是想稳定下来，找到合适的另一半就准备稳定的步入婚姻殿堂？还是暂时没考虑结婚，只想找个人谈谈恋爱，享受享受。如果是后者，选择ta并不差，如果是前者，那么你还是放手比较好哦。"}])}});
                await questionResult.addCard(card7zc, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你们的爱情就像烈火一般，充满活力激情还有冲动。可能本身你们的发展就是充满了各种冲动在里面的，就好像飞蛾扑火一般，开始时完全没考虑一切后果和结果。\n从某种角度来讲，你们的感情是不稳定的，在激情过后，平淡了以后，很容易就因为过去没考虑的问题而导致情感的结束。\n你们的感情发展乐观指数：⭐⭐⭐"},{title: "情感建议",content: "要想你们的感情能有长久的发展，你需要去多挖掘你们感情中其他的方面，比如兴趣爱好，比如现实条件等等。可以偶尔两人一起静静的做些什么，做一点不太浪漫甚至很平淡的事，有些时候简单反而更有其特殊的魅力哦。"}])}});
                await questionResult.addCard(card7zc1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "很明显你们之间的感情是充满挑战的，冲突点较多。不仅是性格方面的原因，两个人都缺乏主动去包容对方、维系感情这份心。\n事实上，在你们心中，对彼此的认可度并不高，爱意不深，反而是把自己放在更重要、更高的位置，可以说都还蛮自私的。\n因而，很容易产生矛盾、争执，令自己感觉疲惫和失望。并且带有较强烈的失败含义，也说明这段感情是偏向鲁莽和非理性的，你们很难就矛盾达成一致。哪怕现阶段的困难能够解决，未来也会因为相似的事情，再度引发感情危机。\n你们的感情发展乐观指数：⭐"},{title: "情感建议",content: "要想维系这段感情，会是一件非常累的事情。需要多为对方考虑，解决彼此的冲突才有机会哦。"}])}});
                await questionResult.addCard(card8ll, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "在这段感情中女方是占有绝对优势的一方，男性在这段感情里更多是“依附”或者说是比较让着依着女方。\n不得不说在这段感情里女方绝对是非常享受的那一个，不过似乎男方也并不反感。只要女方别做得太过分、太强势，这段感情的前景还是蛮不错的，是能够顺利的走到一起、走到最后的。\n你们的感情发展乐观指数：⭐⭐⭐⭐"},{title: "情感建议",content: "在你们相处中主体上还是按原来的模式进行就可以了，不过偶尔可以放低下自己的姿态。此外，要记得你们双方的相处中沟通会是非常关键的一个环节，心里有问题别压抑着，不然压抑的东西一旦爆发可不好承受。"}])}});
                await questionResult.addCard(card8ll1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你们的感情会比较平淡。两个人对对方已经没有太大的激情了，整天牵着对方的手，就跟牵着自己的手一样。只不过你们都是很有责任心的那种人，虽然没有激情，但是也已经把对方当成是家人一样的了，你们每天就都还能比较和善的相处。\n你们的感情发展乐观指数：⭐⭐"},{title: "情感建议",content: "不管你是否选择继续走下去，你在感情上都需要成熟独立起来。再来在这份感情中你需要把握好度，你可以选择做弱势的那一个，但不能弱到没有任何气势；同样你也可以做强势的那一个，但绝不能成为强势到完全不考虑对方的感觉。"}])}});
                await questionResult.addCard(card9ys, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你们的爱情运势很不好，基本上要到了分手的程度。这是因为你们越发的觉得，两个人的三观有很大的差距。在每一件事情上，彼此都会有很大的分歧。所以慢慢的，你们彼此都不想要跟对方说话了，因为很清楚，只要一说，那就要吵架的。\n整体来看，你们的感情发展乐观指数：⭐⭐⭐"},{title: "情感建议",content: "对于你们的关系，还需要进一步发展和接触才能下定论。发展到现在的程度并不容易，所以建议是再坚持一下好好走下去，或许柳暗花明又一村也不一定。希望和机会并不一定会送到你面前，如果你对ta有喜欢，那么先继续再说。"}])}});
                await questionResult.addCard(card9ys1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "对方对于这份感情已经没有了期待，他看不到一个明确的未来，跟你在一起ta失去了努力奋斗的动力，有时候甚至觉得自己一个人待着要比两个人一起生活还要好，想必你自己也有同样的想法。\n建议你们进行一次沟通，给双方重新确定一个目标，给你们的未来制定一个规划，共同为了这个目标去努力。\n整体来看，你们的感情发展乐观指数：⭐⭐"},{title: "情感建议",content: "是时候需要走出自己的小世界去接触和面对了，至少你需要走出来和你的另一半有更多的接触。你需要开始学着敞开心扉，别习惯性将自己隐藏起来，又或者将真实的一面隐藏，虚假的一面暴露，这只会让ta感觉不到你的真心，只会让ta更远离你。"}])}});
                await questionResult.addCard(card10myzl, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你们的相遇从某种角度来讲是命运最美的安排，即使你们没能走到最后拥有美满的结局，也会拥有一个不错的回忆！\n从某种角度来讲你们要有结果，概率是非常大的，但也要注意的是相遇是你们的开始，但并不代表结束一定是在一起。\n虽然你们拥有很深的缘分，但缘分天定事在人为，如果你希望你们的感情有结果，还是得靠双方努力哦。\n整体来看，你们的感情发展乐观指数：⭐⭐⭐⭐"},{title: "情感建议",content: "面对你们感情的状况，建议是顺其自然比较好，别刻意改变什么，只要做好未来世事无常的心理准备即可，不断的向着自己的目标前进。"}])}});
                await questionResult.addCard(card10myzl1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你和伴侣之间的感情发生了剧大的变化，由于现实生活的繁忙，彼此的热情逐渐淡去，两人的生活愈来愈枯燥乏味，缺少心灵的交流。\n这样的情况导致两人渐行渐远，你的伴侣可能会因另一段爱情而离开你。而分手之后，你还是迟迟无法忘怀这段感情中的甜蜜与伤害，因而也无法再接受一段新的恋情。\n整体来看，你们的感情发展乐观指数：⭐"},{title: "情感建议",content: "人在此中，除了重新检视自己的状况，探讨面对当前环境的态度之外，也要发挥自己的创造力，创造新的命运走向，以脱离命运的老路子。"}])}});
                await questionResult.addCard(card11zy, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你们的感情发展乐观指数：⭐⭐⭐⭐\n这里要恭喜你们，两个都是对美好爱情超级向往的人，而且彼此对自己的付出都觉得能得到相应回报，你们要把握好机会，好好发展发展。\n只要用心交往，就会慢慢走向你期待的结果。对感情你是有着信念感的，所以你是在对方心目中适合厮守一生的对象，你们性格及优缺点互补，经常会有一份心有灵犀的共鸣，不需要太多的言语，微微的动作就能让彼此感受到心意。"},{title: "情感建议",content: "在感情中减少偏见和私心，不要逃避责任，优柔寡断，正义牌出现，提醒你要用理性来解决问题，要审慎思考，要负起责任。"}])}});
                await questionResult.addCard(card11zy1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你们的感情发展乐观指数：⭐⭐\n看来你们目前的感情发展并不算平稳，在感情中太过斤斤计较而且又自私，认为自己的付出必须要得到对方相应的回报心里才能够平衡。其实在感情上如果不能心甘情愿的付出，总追求回报的话，会对感情有很大的影响，虽然不至于直接导致分手，但是争执的问题会不断出现。"},{title: "情感建议",content: "在感情中减少偏见和私心，不要太斤斤计较，不要逃避责任，优柔寡断，正义牌逆位出现，提醒你解决问题不要太过理性，要增加两个人之间的小情趣。"}])}});
                await questionResult.addCard(card12ddr, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐\n这张牌在感情上表明了在对方的心中，你们的感情并没有很大的希望，虽然对方对你也是有感情的，但你目前并不是对方认为最适合的人。所以在面对爱情抉择的时候，双方都显得比较犹豫和逃避。而且时间久了对方给你更多的是一种感情上的束缚，让彼此感觉很心累。"},{title: "情感建议",content: "检视自己，学会换位思考，换角度思考，寻找出问题的根源以及解决方法，学会经营感情，改善你们之间的关系，就是你们走向幸福的桥梁。"}])}});
                await questionResult.addCard(card12ddr1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐\n这张牌在感情上表明了在对方的心中，你们的感情并没有很大的希望，虽然对方对你也是有感情的，但你目前并不是对方认为最适合的人。所以在面对爱情抉择的时候，双方都显得比较犹豫和逃避。而且时间久了对方给你更多的是一种感情上的束缚，让彼此感觉很心累。"},{title: "情感建议",content: "检视自己，学会换位思考，换角度思考，寻找出问题的根源以及解决方法，学会经营感情，改善你们之间的关系，就是你们走向幸福的桥梁。"}])}});
                await questionResult.addCard(card13ss, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐\n正位的死神意味着结束，无法避免的转变。对方对你们之间的感情会逐渐丧失耐心。你们要有结果是非常难的。就算没有更好的人，你在对方身边也是过得不愉快的，也是想离开的。\n死神也意味着某种状态的结束，你们的感情将会发生深刻的变化，很可能你们之间会彻底断绝关系，去过不一样的生活。"},{title: "情感建议",content: "适合你的会留下，不合适的总会离开，不要抗拒结束和改变，要坚信生命拿走你一部分，是为了空出地方给后面的，不要将就。"}])}});
                await questionResult.addCard(card13ss1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐\n死神意味着结束，无法避免的转变。对方对你们之间的感情会逐渐丧失耐心。你们要有结果是非常难的。就算没有更好的人，你在对方身边也是过得不愉快的，也是想离开他的。\n死神也意味着某种状态的结束，你们的感情将会发生深刻的变化，很可能你们之间会彻底断绝关系，去过不一样的生活。"},{title: "情感建议",content: "适合你的会留下，不合适的总会离开，不要抗拒结束和改变，要坚信生命拿走你一部分，是为了空出地方给后面的，不要将就。"}])}});
                await questionResult.addCard(card14jz, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐⭐\n抽到节制这张牌，代表着目前，你们之间的关系发展比较顺畅，彼此维持良好的状态，懂得分寸，不伪装自己，且保持适度的距离感，适度表达对彼此的关心。\n你们的契合度不错，但是在沟通上并不会很深入有效，无法更多地敞开心扉去交谈。如果两人有心的话，还是可以有长期的发展。"},{title: "情感建议",content: "以开明、深度沟通的方式，一起讨论你们之间的情况，并设法找出改善之道，开始实际行动去改变。在你投入一段感情之前，你也要花时间考虑、观察清楚，对方是否真的适合自己。"}])}});
                await questionResult.addCard(card14jz1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐\n你们的关系无法调整，进展不顺，而且彼此不考虑对方心情，将自己的意识强压给对方，无法抑制的情感，极端的考虑问题，采取过激的行为，无节制吵架，都极其任性，难以敞开心扉去交谈，维护良好的状态，无法使关系能够长期稳定的发展。"},{title: "情感建议",content: "以开明、深度沟通的方式，一起讨论你们之间的情况，并设法找出改善之道，开始实际去改变，避免走极端，在你投入一段感情之前，你也要花时间考虑、观察清楚，对方是否真的适合自己。"}])}});
                await questionResult.addCard(card15em, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐\n你们之间的关系，已经变成了一种束缚，你已被欲望或惯性支配。接受一种糟糕的状态而不愿意改变，也对役使你的事物不作抵抗，无法学习，也没有成长和快乐的机会。可能是一段建立在嫉妒和强烈控制欲上的关系，说到爱情，你们的关系更像是各取所需，一旦认真你就输了。"},{title: "情感建议",content: "要走向自由，做出正大光明的选择，在你有能力打破限制之前，应先对问题进行了解，不纵欲，不贪婪，才能单纯享受爱情的美好。"}])}});
                await questionResult.addCard(card15em1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐\n一见钟情的爱情真的能长久吗？仅仅有心动的爱情很难走下去，你单方的付出，你期望你们的爱情可以顺利发展，但是对方迟迟没有回应，所以爱情不是单方面的付出，需要的是双方的互动，对于没有未来的感情，就没有必要一直惦记和付出了，继续往前走，你会遇到那个真正适合你的人。"},{title: "情感建议",content: "你只能活一次，要对自己负责，为自己而活，不要让热情蒙蔽你理智的判断，有时候敢于放弃是对自己而言最好的选择。"}])}});
                await questionResult.addCard(card16gt, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐\n你们的感情发展不会给你太多的安逸，冲突和意见分歧都是司空见惯。\n在这种情况之下，你们要继续走下去是比较勉强的，或许你也会感受到深刻的痛苦和失望，关系之所以发生改变，是为了让你成长，及时止损才是第一要义。"},{title: "情感建议",content: "多一些包容和理解，愿意花心思去给这份爱一次机会，实在无力挽留，也不要过多纠缠，属于你的跑不了，不属于你的留不住。"}])}});
                await questionResult.addCard(card16gt1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐\n你们的感情发展不会给你太多的安逸，冲突和意见分歧都是常有。\n在这种情况之下，你们要继续下去是比较勉强的，或许你也会感受到深刻的痛苦和失望，关系之所以发生改变，是为了让你成长。\n如果你抗拒放开压抑的东西，可能会导致另一个极端事件的发生，其实不论你如何的抗拒，它还是会发生，生命不会让你停留在早就不合适的感情中。"},{title: "情感建议",content: "多一些包容和理解，愿意花心思去给这份爱一次机会。实在无力挽留，也不要过多纠缠，属于你的跑不了，不属于你的留不住。"}])}});
                await questionResult.addCard(card17xx, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐⭐⭐\n正位的星星牌展示出了美好的前景，你对这个关系有信心，相信事物都会是乐观的。\n你有足够的自由和空间，来经营你们的感情。你们处于一种彼此欣赏的关系中，周围的家人朋友都比较支持也会给予帮助，你也可以生活在自己的状态中，做真正的自己，对方会是能给你幸福的那个人。"},{title: "情感建议",content: "要达到美好的彼岸还需要脚踏实地一步步地去规划，你们的缘分挺深，建议你做好沟通，信任对方，减少负能量的传递。"}])}});
                await questionResult.addCard(card17xx1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐\n你很可能正在经历美一段希望渺茫、不现实的爱情。\n你们的感情其实是不适合的，双方的性格本身就存在一定的矛盾点，而另一方面你们在现实中的相处模式也存在一定的阻碍，相处的尴尬，观念的分歧会严重影响感情进展，而星星逆位也显示了你们彼此之间理解程度不足，心与心没有真正的靠近。"},{title: "情感建议",content: "建议你休息一阵子，给自己心灵放个假，脚踏实地一步步地去规划，做好沟通，认清对方的内心，感情的现状，自己真正想要的是什么。"}])}});
                await questionResult.addCard(card18yl, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你们的感情发展乐观指数：⭐⭐\n你们目前与其说是在谈恋爱，倒不如说正处于感情的一个暧昧期，双方都想发展恋情，但是都没有主动的表白，一边维持，时不时的撩拨一下对方，一边又有所顾虑，不愿意表白，双方都在衡量对方对感情的付出，为自己考虑的多，所以瞻前顾后的爱情很难顺利的发展和突破。"},{title: "情感建议",content: "与其被动等待，不如主动出击，暧昧到最后往往不了了之，与此同时，也要考查好对方底细，免得被小三了而不自知。"}])}});
                await questionResult.addCard(card18yl1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐\n暧昧不清的关系，虚伪的恋情、三角恋、遭遇背叛、为流言所困等等很可能就是你所经历的。\n在爱情里，表面可能风平浪静，其实你的内心可能已陷入复杂的三角关系中，由于你对自己的心态都弄不清楚，情感的混乱蒙蔽了理智，内心充满了不安及迷惑，表现在与伴侣的相处上就是虚伪及背叛，即使二人的感情越发亲密，也很难有结果，总有一天谎言会被揭穿。"},{title: "情感建议",content: "在感情中考察清楚对方底细，免得被小三了而不自知，也要严于律己，真诚的对待另一半，不要为了圆上一个谎而陷入一直在编下一个谎的窘境中。"}])}});
                await questionResult.addCard(card19ty,  {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐⭐⭐⭐\n这是一段有创意，又富有趣味的两性关系，在生活中随时可见孩子般的天真和童趣。\n共享着生活中单纯的乐趣，洞悉着在爱的关系中友谊的价值，两个人对彼此都非常上心，付出和回报成正比，无论什么事都非常开心，只要继续这样发展下去，一切都会很顺利，说白了你们的感情进展是一片光明的节奏。"},{title: "情感建议",content: "再美好的感情也会出现唇齿打架的场面，沟通是感情的润滑剂，如果因此而错过那是多么可惜，要信任对方，信任这段感情。"}])}});
                await questionResult.addCard(card19ty1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐⭐\n逆位牌出现说明你们之间的感情生命力正在逐渐的流失，而且以往的热情也在逐渐的冷淡，太阳不再光芒万丈，过去最耀眼的时光已经过去，有下落的趋势。\n这也说明了现在对方对你们的感情看法是比较消极的，新鲜感也在逐渐消失，你对他还是有很大的吸引力，但可能因为相处得太过盲目，还需要进一步的磨合。对于未来的发展也不太有明确的方向感。"},{title: "情感建议",content: "交往前期再美好的感情也会出现唇齿打架的场面，沟通是感情的润滑剂。如果因此而错过那是多么可惜，要信任对方，信任这段感情，保持在恋爱中的新鲜感。"}])}});
                await questionResult.addCard(card20sp, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐⭐\n你们在很多方面都是比较契合的，现实生活难免有磕磕碰碰。对你们来说也是一种成长和考验，互相磨合的过程，坚持下去会有结果的。\n彼此都有着清晰的判断力，知道自己想要的是什么，不用为了以后的恋情而将就自己，你们经历过磨合期一起走向婚姻的可能性很大。"},{title: "情感建议",content: "认识到彼此在过去的相处过程中的问题，做出实际的行动去改正两个人之间的问题，尝试着去调整彼此之间的相处方式，这段感情未来可期。"}])}});
                await questionResult.addCard(card20sp1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐\n审判逆位这张牌在感情上代表着不固定。从这张牌来看，你们之间的缘分并不算非常深厚，你们的感情想要走得长远的话，会经历一些坎坷，现实层面也存在着很多没有跨越的阻碍，这也导致了你们之间的缘分断断续续。\n两个人都忙碌于各自的生活当中，很少有机会去想起对方的生活如何，时间和空间都会冲淡你们对彼此的感觉。"},{title: "情感建议",content: "谈恋爱尽量避免异地，如果总是聚少离多，两人很少见面的话，那你们的感情就岌岌可危了，一旦做选择就勇敢坚持，不要被外界事物所影响。"}])}});
                await questionResult.addCard(card21sj, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐⭐⭐⭐\n你现在在爱情里处于一种相当满意的状态。你把爱情当做你生命中非常重要的部分，几乎是你的世界，爱情也给了你回报，对方为你做的一切，正是你想要拥有的一切。你很幸福，也很享受现在的关系，你们很可能会有更进一步的发展，对于谈了很久的恋人来说，接下来会有很大可能步入婚姻的殿堂。"},{title: "情感建议",content: "不要对你的另一半太苛刻，都是成年人，对方的世界里不可能完完全全装的都是你。要求对方丝毫不能离开你的视线，无时无刻的围着你转，自然会出现矛盾。\n建议你多给对方一些自由空间，既享受在一起，又享受独处的时间。"}])}});
                await questionResult.addCard(card21sj1, {through: {interpretation: JSON.stringify([{title: "感情发展趋势",content: "你的感情发展乐观指数：⭐⭐⭐\n你正处于一段共荣的两性关系中，你和伴侣能够在你们所同意的范围内完全的成长、发展和生活。但两个人始终很难走到结婚那一步，更像是一段短暂的恋情，也或许只是短暂的暧昧关系，跟你所设想和希望的完全不同，最终只能放弃掉的可能性比较大。"},{title: "情感建议",content: "理清你的判断，或许你在追寻比较小的目标，而没有考虑到比较长远的、精神层次的目标，只是寻求短暂回报，而忽略了最终的精神目标。"}])}});

                questionResult = await groupResult.createQuestion({
                    name: "你的前任现在对你是什么感觉？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card13ss, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "前任态度分析",
                                content: "抽到这张牌的朋友，不管你们分手有多久，是一个月还是半年。从这张牌来看，目前，你的前任已经完全将你放下了。在ta心里，你们之间的感情已经画上了一个句号。/n" +
                                "或许ta的记忆里还会时不时的想起你们曾经的点点滴滴，但是，这对于ta来说，只是人生路上的一段回忆了，不再有任何想要复合的念头在里面，有的只是记忆而已。或许是ta遇到了一个新的人，也或许是分手时间足够长，让ta早已经模糊了对你残留的爱。总之，在ta心里，你们之间将不再会有多少交集了。"
                            },
                            {
                                title: "塔罗建议",
                                content: "不管舍不舍得，建议你可以尽快放下。挥别错的，才能相逢对的，告别过去，才能迎接新的开始。一味的沉湎于过去，毫无用处，最终只会自伤自怜！"
                            }])}});
                await questionResult.addCard(card22sb6, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "前任态度分析",
                                content: "抽到这张牌的朋友，很显然，你的前任对你还没有完全放下，你们过去的点点滴滴和美好回忆还时常浮现在ta的脑海里。/n" +
                                "或许你们分手的时候自以为都想的很清楚，再也不会和好、要果断放下。可是，思念是骗不了人的，ta对你的爱还有，目前的ta即使不和你和好，一时半会也不太可能接受其他人。"
                            },
                            {
                                title: "塔罗建议",
                                content: "如果你对ta也未曾放下，如果你对ta也还有爱情留存，那就放下面子，主动去和对方联系，和好的机会很大哦。不要太在乎面子，毕竟，总有一方要主动迈出这一步。"
                            }])}});
                await questionResult.addCard(card23xb2, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "前任态度分析",
                                content: "抽到这张牌，代表你的前任对你并没有完全放下，可能也会有想复合的想法。但是呢，此刻的ta身边有一个新人出现，这个人正在追求ta，或者ta对这个人产生了好感。/n" +
                                "ta现在正处在犹豫和纠结中，不知道该选择和你复合还是选择和那位新人开启一段新的恋情。接下来怎么做，还要取决于你内心真实的想法。"
                            },
                            {
                                title: "塔罗建议",
                                content: "如果你对ta也未曾放下，建议放下面子，主动去和对方联系，和好的机会很大哦。不要太在乎面子，毕竟，总有一方要主动迈出这一步。如果你已经完全放弃ta了，那么就随他吧。"
                            }])}});
                await questionResult.addCard(card24bj101, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "前任态度分析",
                                content: "抽到这张牌的朋友，代表你之前做了一些事儿深深伤害了你的前任，虽然这些不好的情绪和感受还是会触动到ta，但是ta已经开始慢慢从过去的阴影中走了出来，想要重新开始。/n" +
                                "从牌面来看，ta目前的状态应该是心碎之后的觉醒。因为这里是逆位，代表着她不再沉湎于过去恋情的伤害当中不可自拔，而是会逐渐走出来，迎接新的生活。所以ta不希望和你再有任何瓜葛。"
                            },
                            {
                                title: "塔罗建议",
                                content: "破碎的玻璃难以修复，受伤的爱情，始终会有裂痕。既然无法再在一起，那就向前看吧，过去的，就当作回忆和成长吧！"
                            }])}});
                questionResult = await groupResult.createQuestion({
                    name: "你们的异地恋能修成正果吗？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card18yl, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "发展趋势分析",
                                content: "抽到月亮牌，代表着你是一个比较没有安全感的人，在爱情里容易患得患失。/n因为距离的缘故，每天见不到面。你会产生胡思乱想。对方回消息回复慢了，你就会觉得对方不够在乎你；对方要是半天没主动联系你，你就会怀疑ta是不是背着你去和其他人搞暧昧去了；对方要是一天没联系你，你可能就会冲动地提出要和ta分手……/n总之，在异地恋的过程中，你可能会误信他人的谣言，又或是把简单的事情想得太复杂，从而对恋人产生怀疑。你这种疑神疑鬼的状态，会导致你们爱的十分痛苦，最终的结局不容乐观，大概率会以分手告终。"
                            },
                            {
                                title: "塔罗建议",
                                content: "感情当中，最重要的就是信任。尤其是异地恋的情况！/n如果整天神经兮兮地怀疑这，怀疑那，会给爱人造成很大的压力，也会给这份感情带来致命的伤害。建议要么不爱，既然爱了，就要相信对方。"
                            }])}});
                await questionResult.addCard(card25qz6, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "发展趋势分析",
                                content: "抽到这张牌，代表着你和恋人在相处中或许也会有摩擦和争吵，但好在你们彼此相爱，并且认定彼此就是命中注定的那个人，因此就算吵架再激烈，到最后你们也还是会和好。/n" +
                                "可以说，你们都很有勇气，虽然一路有艰辛和不容易，但是两人都对这段感情从不轻言放弃！"
                            },
                            {
                                title: "塔罗建议",
                                content: "在悲观者看来，异地恋很惨，每天见不到自己喜欢的人；其实换个角度想想，人一生很长，一时的分开，并不算什么。再说，爱情也不是生活的全部，没必要每天粘在一起，刚好趁着异地的时候，多提升自己，成为更好的人，等结束异地的时候，给对方见识一个更好的自己！或许，这就是所谓的距离产生美吧！。/n异地恋本身没有好坏之分，是人为给它的定义。异地恋并不苦情，关键在于你怎么看。"
                            }])}});
                await questionResult.addCard(card26sb4, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "发展趋势分析",
                                content: "一段爱情关系维持久了，激情终归于平淡，加上异地恋聚少离多，你和恋人双方或其中一方会感受到情感上的疲惫，态度变得消极冷淡。/n" +
                                "在不好的情况下，你或TA还有可能会为了寻找新鲜刺激而产生出轨的念头。其实有时候未必是你不再喜欢这个恋人，而是你们之间缺乏了情趣而已。/n整体来看，抽到了圣杯四，你们之间的关系，不是很乐观，对方或者你会面临着新的桃花，你们内心其实也在纠结犹豫该怎么选择……"
                            },
                            {
                                title: "塔罗建议",
                                content: "圣杯代表水元素，抽到圣杯四，提醒着我们，彼此之间一定要加强沟通。在对方感到孤独寂寞的时候，给到力所能及的关心和安慰非常必要。不然久了容易把持不住，被第三者给找到机会趁隙而入哦。"
                            }])}});
                await questionResult.addCard(card27sb10, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "发展趋势分析",
                                content: "抽到这张牌，代表着虽然你们现在处于异地恋状态。但是这并没有影响你们之间的感情发展，你和恋人的感情日趋稳定，并且互相爱护尊重，没有谁比谁更强势，而是互相懂得为彼此着想，让这段关系相处起来十分舒服！/n" +
                                "你们虽然是在异地恋，但是对对方的爱丝毫没有因此而减弱，你们愿意乐于分享爱，并愿意为恋人付出关怀，在未来的规划中也有对方的存在。"
                            },
                            {
                                title: "塔罗建议",
                                content: "在悲观者看来，异地恋很惨，每天见不到自己喜欢的人；其实换个角度想想，人一生很长，一时的分开，并不算什么。再说，爱情也不是生活的全部，没必要每天粘在一起，刚好趁着异地的时候，多提升自己，成为更好的人，等结束异地的时候，给对方一个大大的惊喜！或许，这就是所谓的距离产生美吧！/n异地恋本身没有好坏之分，是人为给它的定义。异地恋并不苦情，关键在于你怎么看。"
                            }])}});

                questionResult = await groupResult.createQuestion({
                    name: "ta是不是真的爱你？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card28sb3, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "对方内心分析",
                                content: "圣杯三单单从牌面来看，是一张欢庆的牌，如果出现在事业问题上，或者财运问题上，意思是很好的。代表着成功和欢乐。/n但是，当出现在感情中……则代表着有第三者的出现。感情是两个人的事情，脚踏两只船的行为，换谁都无法接受。/n抽到这张牌的朋友，很不幸的告诉你，ta除了跟你暧昧不清，同时也很可能在跟其他人搞暧昧。对你有好感是真的，跟别人暧昧也是真的，自然谈不上是真的爱你了。对于ta而言，顶多是玩玩而已！"
                            },
                            {
                                title: "塔罗建议",
                                content: "在感情里，我们很容易会丧失自己的理性判断，建议仔细回忆下在一起的细节。擦亮眼睛，看看对方是不是渣男。如果是，就果断分手吧。不要再有过多的羁绊。"
                            }])}});
                await questionResult.addCard(card6lr, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "对方真心分析",
                                content: "恋人是塔罗牌里代表爱情最好的一张牌，代表着感情和谐、幸福快乐。/n" +
                                "抽到这张牌，意味着ta对你的爱妥妥滴是真爱。ta对你是奔着长远发展而去的，ta打心眼里认定你就是ta这辈子最喜欢的人。/n或许你的外在条件不是那么完美，或许你的性格有这样那样的小缺点，但是这些都不重要。ta爱的就是你这个人，是一个完整的存在，是一份真挚的爱。"
                            },
                            {
                                title: "塔罗建议",
                                content: "遇到这样的对象，遇到这样的恋情，就好好珍惜吧。在真爱如此稀缺的当下，很多爱情都掺杂了太多的因素，难得有一个人发自内心的喜欢自己，岂有不珍惜的道理？"
                            }])}});
                await questionResult.addCard(card18yl, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "对方真心分析",
                                content: "月亮是塔罗牌里的18号牌，有不安、惊恐、欺骗、熬夜等象征含义。/n" +
                                "抽到这张牌，对应到你的身上，意味着，在这段关系里，你有着强烈的不安全感。对应到对方的头上，ta很可能是一个比较喜欢熬夜的人，至于熬夜在干什么呢？大概率可能是在与其他人搞暧昧或者聊骚。/n总之，抽到这张牌的朋友，你有必要怀疑下ta对你的态度了。很可能ta瞒了你很多事情，比如有家庭还装单身跟你谈恋爱，明明放不下前任还来你这里找安慰。所以一定要调查清楚再在一起，不然被小三了自己还蒙在鼓里。"
                            },
                            {
                                title: "塔罗建议",
                                content: "月亮牌，有欺骗的含义存在。建议通过对方的言行举止仔细观察下，对方对你是否是真心。不要傻乎乎的被对方的甜言蜜语给欺骗。要知道，爱情关键是看行动！嘴上说的再漂亮，如果没有行动，那就是耍流氓。"
                            }])}});
                await questionResult.addCard(card29sb9, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "对方真心分析",
                                content: "你和对方相处应该是很愉快的。对方的条件还不错，尤其是在事业和物质上。/n" +
                                "圣杯九这张牌代表的意思是美梦成真、非常得意。意味着对方能和你在一起，应该是ta一直以来的梦想，对于ta来说，现在感到非常开心，有种美梦成真的感觉。/nta跟你在一起真的是觉得自己赚到了，开心的像个两百斤的胖子，而且ta本身性格也乐观开朗，没那么多的阴暗的小九九，忠于自己内心，跟你在一起就一定是真的爱你了。 "
                            },
                            {
                                title: "塔罗建议",
                                content: "你们的关系还是比较健康的，建议享受当下就好，不要想东想西怀疑ta的真心了。遇到这样的人，好好互相珍惜吧！"
                            }])}});


                questionResult = await groupResult.createQuestion({
                    name: "该不该放弃这段感情，果断分手？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card0yr, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "该不该分手",
                                content: "愚人牌是塔罗牌里的0号牌，意思是好奇、冒险、自由、新鲜感……/n抽到这张牌的朋友，你们的爱情对你而言本身就是一次冒险，对方或者你是一个随性惯了的人，喜欢随心所欲的做事情，属于那种不太会为未来做机会打算的人。不喜欢被束缚。谈恋爱不会考虑太多的因素，更多的是凭心情和感觉而定。/n如果对方是这样的人，你己经明显感觉到了自己不被重视，没有安全感，就直接放弃吧，长痛不如短痛。如果你是牌面里的愚人，不喜欢对方步步紧逼的束缚感，建议也是好聚好散。不要再做过多的羁绊。"
                            },
                            {
                                title: "塔罗建议",
                                content: "愚人牌代表的含义是崇尚自由自在，性格比较随性，不喜欢被束缚，以及缺乏计划和打算。除非你们都是喜欢自由的人，类似萨特和波伏娃那样的，那没关系，正常谈着。不然的话，就快刀斩乱麻，分手吧。"
                            }])}});
                await questionResult.addCard(card6lr1, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "该不该分手",
                                content: "恋人正位是塔罗牌里描述爱情最好的一张牌，可惜的是，你抽到的刚好是逆味，意思则恰恰相反……/n" +
                                "抽到这张牌的朋友，你们的感情发生了严重的问题。彼此之间沟通不顺畅，经常发生争执。甚至你们之间已经有了第三者的出现。你们之间大概率会因为支撑不了这份没有结果的爱，加上又有了新人，最终导致这段关系走向破裂。"
                            },
                            {
                                title: "塔罗建议",
                                content: "爱情是无私的，但又是有原则的！我们要找的不仅仅是一个身体上陪伴我们的人，更是一个灵魂上的伴侣。需要价值观相吻合，不会欺骗自己的人，既然对方不是那个对的人，就没必要过多的纠缠，纠缠下去，只会徒增烦恼！"
                            }])}});
                await questionResult.addCard(card30xbqs, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "该不该分手",
                                content: "星币骑士，在12星座上对应的是处女座，是妥妥的劳碌命、工作狂……/n" +
                                "抽到这张牌的朋友，对方是典型的先立业后成家的类型。此时ta正在为你们的未来努力工作赚钱，ta不浪漫，也不会说情话。/n如果惹你不开心了，就宽容些原谅ta吧，ta很专一也很实在，ta那么拼，都是为了你们的未来。跟着ta一辈子都是有安全感的，不要轻易放弃哟。"
                            },
                            {
                                title: "塔罗建议",
                                content: "在任何一段关系当中，经济基础都是非常现实、非常重要的。没有面包的爱情，终究无法长久。浪漫和物质兼而得之，是人人都渴望的。但是，却不太现实。爱情总有不完美，多一些包容和体谅吧。只要知道对方是真心爱自己就够了！"
                            }])}});
                await questionResult.addCard(card16gt, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "该不该分手",
                                content: "高塔是塔罗牌里的16号牌，抽到这张牌的朋友，不管你现在内心是怎么想的，你们之间的感情都会大概率走向破裂。/n" +
                                "你们之间的关系，受到了严重的外力影响，或许是对方或自己的父母强烈反对，或许是因为无法克服的异地恋，再或许是赤裸裸的物质条件……/n总之，从牌面来看，分手的可能性非常大。"
                            },
                            {
                                title: "塔罗建议",
                                content: "你们的感情己经破裂，再继续纠缠也只会剩下两败俱伤，别再折磨自己了，曾经爱过，快乐过就好，给彼此留点念想，也给自己留点好的回忆，就放弃吧，好聚好散。"
                            }])}});


                questionResult = await groupResult.createQuestion({
                    name: "你表白的成功率有多高？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card29sb9, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "表白成功几率",
                                content: "圣杯九在塔罗牌里的含义，代表着享受、得意和美梦成真。/n对应到感情里，意味着抽到这张牌的朋友，你想表白的这个人一定也喜欢你没错啦。平时两个人相处就很愉快，你也符合ta心仪对象的标准，说不定ta还在想怎么跟你表白呢。/n总之抽到这张牌，你的表白就己经成功一大半了，只要你勇于表白，美梦即可成真！"
                            },
                            {
                                title: "塔罗建议",
                                content: "不要纠结，不要犹豫！你们就是典型的互相喜欢的类型。主动告白吧，爱情这么美好的东西，需要积极一些。"
                            }])}});
                await questionResult.addCard(card15em, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "表白成功几率",
                                content: "恶魔牌是塔罗里的15号牌，在塔罗牌里，代表的是欲望、性和物质。5+1=6，6号牌是恋人牌（塔罗里形容爱情最好的一张牌）。恶魔牌是恋人牌的变种。在12星座中，代表的是摩羯座。/n" +
                                "抽到这张牌意味着，你和ta的关系，并不是那么纯粹。你需要考虑清楚你对ta是不是真的爱，还是只是一时好感。或者是受到了物质啦、性欲望啦之类的影响。从这张牌来看，你表白成功的几率并不低，关键还是看你自己内心的需要。"
                            },
                            {
                                title: "塔罗建议",
                                content: "抽到这张牌的朋友你首先想清楚自己到底要的是什么了，ta对你很可能并不认真，或许只是想跟你玩玩而已，比如一夜情之类的。如果你也是玩玩而已，那不要确定恋人关系更好。如果你认真了，对方也可能会答应你的表白，但是，后续的发展可能不乐观。"
                            }])}});
                await questionResult.addCard(card31bjqs, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "表白成功几率",
                                content: "宝剑骑士对应的是12星座中的双子座。/n" +
                                "抽到这张牌的朋友，对方是那种感觉来的快去的也快的类型，但是无法长久。从这张牌来看，你表白成功的概率蛮大的。不过，需要考虑清楚后期如何维护这段感情，毕竟过了热恋期、没了新鲜感之后，ta会不会离你而去，也是一个概率极高的问题。"
                            },
                            {
                                title: "塔罗建议",
                                content: "关于要不要表白，其实更多的在于你自己的爱情观了，如果你在意的是过程，那么很简单，遵从自己的内心就行。目前彼此喜欢，相处愉快，那就大胆告白吧。"
                            }])}});
                await questionResult.addCard(card32qz1, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "表白成功几率",
                                content: "权杖首牌，在塔罗牌里代表着一个新的开始、一个新的机会。/n" +
                                "如果你已经喜欢对方很久，迟迟不敢表白。抽到这张牌，意味着，目前是一个实现梦想的好时机哦。要知道有行动，才会有希望，千万不要犹豫纠结错过最佳表白机会。避免出现被ta人捷足先登的遗憾！拿出火一样的热情来吧，你表白成功的几率还是很大的哦。"
                            },
                            {
                                title: "塔罗建议",
                                content: "抽到这张牌的朋友，你应该不是一个主动的人吧。对你而言，感情的世界里需要一些不顾后果的冲动，不试试看怎么知道结果怎样呢，只要你真诚热情，你喜欢的ta也会回馈你真诚热情的，爱就大声说出来吧。"
                            }])}});


                groupInstance = {
                    name: "事业财运",
                    image: "/tarot1/question_group.jpg"
                };
                groupResult = await questionGroup.create(groupInstance);
                questionResult = await groupResult.createQuestion({name: "2019年事业运如何？", tips: "会不会升职加薪？该不该跳槽......", count: 132, priceOld: 9800, priceNew: 990});


                await questionResult.addCard(card0yr, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "抽到愚人正位时，代表着你处于一种充满创造力的工作状态中，你本身是个有很多想法的人，呆板的工作内容和方式都不适合你。\n你的大胆会给你带来一些意想不到的结果。工作方面，喜欢寻求捷径，倾向于自由的工作氛围，适合艺术类工作或从事自由职业。\n愚人这张牌蕴含了很大的两面性。你的潜力还是很大的。\n整体来看，你的事业运指数：⭐⭐⭐"},{title: "发展建议",content: "愚人因为天性使然，很多时候会不太服管，也不太爱管理他人。但是在职场上，管理又是一门每个人都需要学习掌握的技能，建议适当的吸取一下别人的良言对你会有很大帮助哦。"}])}});
                await questionResult.addCard(card0yr1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "抽到愚人逆位时，代表着你现在的事业恐怕是朝着不好的方向发展，其主要原因在于你在决策上过于理想化了，你所做出的选择恐怕并不是那么稳定可靠的，甚至你选择的这条路都不一定是正确的道路，然而你却坚信不疑的走下去了。并且很有可能经常迟到哦~\n整体来看，逆位愚人时，你的事业运指数：⭐"},{title: "发展建议",content: "在关键时候，你需要听从别人给你的建议才好，如果一门心思地坚持自己，恐怕会因为你的错误选择而导致事业上的崩盘，你适合从事团队合作，尤其是朋友能带给你正确的选择，别太一意孤行哦~"}])}});
                await questionResult.addCard(card1mss, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "这张牌的出现代表有能力，能够统合各种事物，并且自己的工作职权范围内无所不知无所不晓。\n在未来的事业发展中学习能力非常强，工作效率也非常高效，头脑灵活，充满创意，处理事务得当，并且非常注重细节，能够充分发挥自己所学，在工作中的创意可能得到旁人认同，适合从事艺术方面的工作。\n整体来看，你的事业运指数：⭐⭐⭐⭐"},{title: "发展建议",content: "可以积极地行动，不要在那里等待，不要犹豫，也不要觉得力量不够。好好把握自己的思想，运用自己的能力技巧，对待各种人和事情要善于应对和改变，不要按死板的规矩来行事才适合你。"}])}});
                await questionResult.addCard(card1mss1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "当抽到魔术师逆位时，意味着未来在事业上很难发挥出自己的优势，对事业的态度有了些许偏差，表现出漫无目标和缺乏自律。\n不肯遵守一些基本准则，甚至会不惜靠控制对方甚至毁灭对手的方式来实现自己的目的。\n整体来看，你的事业运指数：⭐⭐"},{title: "发展建议",content: "此时你已经失去正确的动机、计划、热情或务实的态度，只有调整好正确的态度，才能来完成你内心的愿望。\n需要注意的是，今年切忌漫无目标，缺乏自律。在与同事或者上司沟通的时候，需要三思而后行，哪些话该说，哪些话不该说，以及如何表达自己的诉求，都是有技巧的。沟通好了，对于你事业的发展，带项目也好，拿绩效也罢，以及升职加薪，都会有很大的助力。"}])}});
                await questionResult.addCard(card2njs, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "抽到这张牌，意味着近期事业上可能会取得不错的突破。女祭司正位牌意味着深层次的思考，交流。你对待工作很有责任感，拥有明确的目标，会苦心钻研各种工作技能，能够拥有展现自身潜力的机会，具备评论才能，适合从事与教育相关的职业。\n整体来看，你的事业运指数：⭐⭐⭐"},{title: "发展建议",content: "你需要和周围的同事或者是领导多沟通工作上的事，来让自己对于所处行业有更深的了解。女祭司牌同时也表明与自己内心交流，做好事业上的规划。工作上别太被动，该争取的机会就去争取。"}])}});
                await questionResult.addCard(card2njs1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "当抽到女祭司逆位时，代表着工作上不能集中全力，不喜欢学习新事物，却又自以为是，遇到压力时容易感到焦虑，也容易因为自己的犹豫不定而错过良机。你可能会看不清自己的内在，不知道到底在想什么或者又要做什么。显然当自己处于自我矛盾的时候是应该静心来好好思索了。\n整体来看，你的事业运指数：⭐⭐"},{title: "发展建议",content: "别人或许没有办法真的帮助到你，可能只是一些安慰和鼓励，真正的问题在你自己心中，你需要返回之前的时期好好的想清楚自己的内心世界，然后才能继续发展。"}])}});
                await questionResult.addCard(card3nh, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "当抽到女皇正位，代表着今年你的事业运总体来看非常好。你所从事的工作或者项目非常不错，前景很好，只要你选择了，并且按正常的步骤去做去行动，就能获得丰盛的回报! 并且其风险非常小，并且这份工作与你的能力状况非常吻合，就好像量身为你定做一般，做下去你几乎不需要多费力，就能获得收获。你适合从事人事、行政、教育、艺术等女性含义更强的职位，女皇更擅长运用她以柔克刚的智慧服人，也不想轻易和人发生冲突。\n整体来看，今年不管是你的正职，还是副业。你都会在事业上取得很不错的收获。对应的，你的金钱回报也会很可观。\n你的事业运指数：⭐⭐⭐⭐⭐"},{title: "发展建议",content: "做事需要脚踏实地，不要眼高手低。你所了解的每一个细节，收获的每一个经验，都能够帮你在以后的成功路上走得更顺利。\n忌：缺乏上进心，散漫的生活习惯，沉迷于享乐，与家人发生纠纷，任性，不思进取、虚荣心强、搁置计划，太奢侈，无节制的花钱。"}])}});
                await questionResult.addCard(card3nh1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "当抽到女皇逆位，代表着今年你的事业运总体来看处于中上水平吧，不算特别好，但是肯定不算差。\n工作方面，可能会从事自己不喜欢的工作，或者自己没有明确的工作目标，在工作上缺少成就感，内心会感到迷惑。\n虽然如果你继续选择干下去，未来还算ok，但你需要做好面临一些问题的心理准备。这些问题在未来里如果你不解决，你在这方面工作里将不会有太大的进步和发展。并且人际关系会有些紧张。\n整体来看，你的事业运指数：⭐⭐⭐"},{title: "发展建议",content: "面对“人”的纷争与困扰，建议你用和缓的态度面对，不要参与口舌是非。如果你的上司是水象星座的人（例如巨蟹座、天蝎座、双鱼座），建议你和他保持适当的距离。"}])}});
                await questionResult.addCard(card4hd, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "当抽到皇帝正位的时候，代表着今年整体来看，你的事业运还是很旺的。\n你是一个很有野心，且非常有能力的人，在工作上，你会通过自律和实际的努力而达到事业的成功，进而获得财务上的回报，对于自己做的事情相当有把握，不打无准备的仗，不签不靠谱的合同，不做不赚钱的投资基本上说的就是你了！！\n你务实的态度会让你在更长的时间里处于事业的巅峰。是值得别人信赖的对象。适合顾问或医学工作以及以谈话为主的工作。\n整体来看，你的事业运指数：⭐⭐⭐⭐"},{title: "发展建议",content: "在拥有权力和地位的背后，也反映出自以为是的另一面，有着高处不胜寒的隐喻在内，在工作中可以适当听听他人的建议，不要太锋芒毕露。"}])}});
                await questionResult.addCard(card4hd1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "皇帝正位牌在工作上是一张比较正向的牌，代表着努力、有领导力，能够突破困难取得成功。这张牌的出现代表未来这段时间自己工作中比较顺遂，一切都在自己掌控范围内。\n当其逆位时，含义则刚好相反，皇帝逆位，代表着你缺乏管理能力、不负责任、率性妄为、蛮横霸道。工作方面，无法长时间专注于一项工作，在工作上缺乏干劲儿，也缺乏领导能力，事业会因为固执、武断、过于自信而遭到失败。\n此外，你在工作中是个有些桀骜不驯的人，或许你本人确实有一定的能力，但是你并不是一个安于现状甘于现状的人。而这份工作本身无法立刻给你提供你所想要的程度，继续下去只能让你因为怀才不遇等等心态导致影响到工作。加上你的性格在这份工作里似乎不太被上司领导待见，也会让你在未来的工作里有些举步艰难。\n整体来看，你的事业运指数：⭐⭐"},{title: "发展建议",content: "提升专注力，为人处事要有责任感，多结交权贵，与他人进行商业合作。在工作上，要提高情商，以改善缺失的不良人际关系。偶尔可以听从一下长辈或者上司的建议，避免过分固执武断。"}])}});
                await questionResult.addCard(card5jh, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "当抽到教皇正位时，代表着今年你的事业运还不错。在工作上，你信心十足，能够正确理解事物的本质。虽然，工作上外来的压力过多，别人对你的期望值也很高，使你有被束缚的感觉。\n好在今年，你容易遇到事业上的贵人，会获得贵人的帮助。今年，你需要多多探索新的工作方法，不要墨守成规。虽然不容易，会面对很大的阻力，但以后回过头来看，你会发现一切的付出都是值得的。\n整体来看，你的事业运指数：⭐⭐⭐"},{title: "发展建议",content: "你太过于遵守某一个人，或者是某一个长辈，亦或者是某个管理层的教条，他所说的总是按照循规蹈矩的模式进行，所以想突破也突破不了。大胆的创新吧~"}])}});
                await questionResult.addCard(card5jh1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "这并不是值得你选择的工作，这里的不值得，并不是说你的能力不能胜任这份工作，而是这份工作，从某种角度来讲你选了无论怎么样都做不好，这是命理上相冲的问题。\n即使是里面有能帮助你的贵人，在你继续做下去后也会因为什么事而无法再给你帮助。说白了这份工作就是与你对冲，即使再好的机会到你手里也会变坑。\n整体来看，你的事业运指数：⭐⭐"},{title: "发展建议",content: "工作上，不要刻板遵循旧有的方式，要勇于创新形成自己独特的理念和方法，为自己的真实想法而活、而工作。多跟有能力的人一起做事。别和那些谈不来的人一般见识，走自己的路让别人去说吧。"}])}});
                await questionResult.addCard(card6lr, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "这是一份还算不错的工作，但并不是一份绝对能永远“保值”的工作，对你来讲在这份工作中你需要不断的保持正确的决策和行动，一旦你做出错误的选择，或许就会给你带来较大的负面影响。\n虽然整体来讲未来里发展是顺利的，你和周围人的相处也都比较愉快，但你也不能太掉以轻心，特别是一些看似很不错的诱惑，你得谨慎选择，别去做不该做的，不然等着你的那将是万丈深渊哦。\n整体来看，抽到这张牌，你的事业运指数：⭐⭐⭐"},{title: "发展建议",content: "建议你遇事谨慎处理，做事前做好计划，不要受其他因素的影响。虽然你很优秀，如果你能把人际关系处理好，你的事业会更如鱼得水！"}])}});
                await questionResult.addCard(card6lr1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "对于这份工作，你已经做了一个非常错误的选择，现在你面前的这条路已经开始向着糟糕的方向发展了，如果不能找出正确的方法，或许未来将会变得更糟。\n说实话你在这份工作中总是有点太随意，很多时候都处于想到就做的状态，很少深入思考。而这样错误的举动对你来讲也已经不是第一次了，也不会是最后一次，如果未来不改变它，这会给你的工作带来很糟糕的影响哦。\n整体来看，抽到这张牌，你的事业运指数：⭐"},{title: "发展建议",content: "做抉择的时候，一定要慎重。通过全面的分析，理性的判断，分析好每个选项的利弊之后，再做决定，切勿冲动做选择。此外，建议多听听身边好朋友的建议和帮助，对你比较好。"}])}});
                await questionResult.addCard(card7zc, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "当抽到战车正位时，代表着今年你的事业运会非常不错，能够取得很大成功。\n战车是强者的象征，它代表着因为坚持和努力取得的成功。\n抽到这张牌，意味着你能高效率地把握先机、以积极的心态面对事物、获得胜利。不论会遇到什么困难，你都会继续走下去。\n同时，这张牌还暗示你在掌控着自己和周遭的事物。事业方面，有才能，办事卓有成效，工作上能够独当一面，自信心很强，能迅速调整情绪以提高效率。具有坚强的意志力，坚定不移的信心和决心，控制整个局势。\n整体来看，你的事业运指数：⭐⭐⭐⭐\n "},{title: "发展建议",content: "你是工作中的勇敢者，在工作事业上，你总是会有一些很大胆的想法和计划，并且能够将之付诸行动。这也是过去里你成功的一大秘诀，但他并不是一个非常好的行为。\"不要放弃\"是这张牌的关键主题。你必须控制住生命中互相对抗的力量。"}])}});
                await questionResult.addCard(card7zc1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "逆位战车所体现的是一种思维极度混乱的状态，巨大的压力已经把英雄压垮了，情绪代替了判断，冲动代替了控制，战车上的英雄已经心有余而力不足，只能由着两匹战马使性狂奔。\n“情绪肆虐”是此时最好的形容词，而一把情绪的火能把一切精心建立的基业都烧毁。工作方面，对无兴趣之事缺乏责任感，项目进展遇困，工作效率低下，野心过渡膨胀， 太过卤莽而导致冲突与阻碍。\n整体来看，你的事业运指数：⭐⭐"},{title: "发展建议",content: "需要脚踏实地的付出努力去赚取钱财，工作上尤其要注意协调好人际关系，包括与上司或者下属，以及同事之间的关系。协调好了能够成为你事业上取得成功的助力，协调不好，则会成为你成功的阻碍。需要学会控制好自己的情绪，拾起对事业本身的热爱才会有好的转变哦。"}])}});
                await questionResult.addCard(card8ll, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "当抽到力量牌时，代表着今年事业运不错。整体事业处于上升状态。\n力量正位表示当事人能量旺盛，有逢凶化吉、遇难呈祥的潜质。但谋事在人，成事在天，力量所体现的仅仅是“人”这个部分。\n工作方面，你擅长突破难关，喜欢代人办事，在事业上不断突破自我，倾全力发挥自己的潜能，上司和客户都对你有充分的信心，成就接踵而来，还可获得领导职位。\n整体来看，这是一个非常适合你的工作，你的能力与这份工作有着高度的契合，并且无论你遇到什么问题，都能很顺利的解决它。对你来讲选择这份工作走下去，你未来的路可谓是一帆风顺的节奏了。只要你想，这里就不会遇到任何能够难倒你的问题。加上你本人在工作中是个比较干练强悍的，没有任何事会让你觉得困扰。\n你的事业运指数：⭐⭐⭐⭐"},{title: "发展建议",content: "工作上，需要像牌面一样，具备勇气、信心和耐心。对于新的挑战或者新的岗位，需要具备自己必定能够胜任的信心以及勇气。当然，一切的成功，都不是一蹴而就的，有时候，成功会来的稍微慢一点，这个时候，需要有足够的耐心。"}])}});
                await questionResult.addCard(card8ll1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "当抽到力量逆位时，代表着你在工作上精力不足、急躁不安、缺乏信心、忍耐力不足、自私自大。你可能会犯好高骛远，学艺不精，做事不能持之以恒，欲速而不达的错误。\n整体来看，你在工作中稍微有些虚伪，很多时候喜欢逞强。明明你的能力并不是很好，却为了在人前展现你牛逼的一面，总喜欢将什么都包揽过来。这份工作其实并不是你能够胜任的，里面会有很多事让你觉得很辛苦和吃力，加上你不愿寻求他人帮助的性格，让你在这份工作中做的很累很辛苦。也使得这份工作前景有些渺茫。今年你的事业运运指数：⭐⭐"},{title: "发展建议",content: "工作上不要打肿脸充胖子，能力不够的时候需要做的是努力提升自己，而不是去逞强。职场上不懂的地方，多向同事或者领导请教，这样成长速度才会快。千万不要死要面子活受罪。"}])}});
                await questionResult.addCard(card9ys, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "抽到隐士牌，代表着孤独、内省、谨慎。\n从这张牌上看，今年你在事业上是很没有魄力的，太过于谨慎导致你对于一些事情不敢轻易下决定犹豫不决，会影响到你的事业发展。虽然表面上来看，你现在从事的是一份很普通的工作，它似乎并没有什么特殊的地方，并且在工作中一切都那么简单正常，就像普通工作一般，稳定，慢慢的等待升迁又或者离职。\n但其实在你的这份工作中如果你仔细观察，期间是会有很多不错的机会的，而你只要能把握住这些机会，是有很大的概率一夜飙升的哦!其实你本人也是属于喜欢默默付出行动的人，其实偶尔的别那么隐秘也会让你更快获得领导赏识。\n整体来看，你的事业运指数：⭐⭐⭐"},{title: "发展建议",content: "隐士对应的星座是处女座，在职场上处女座做事都是比较拼，比较靠谱的。需要注意的是，有时候默默地做了很多事情，但是却没有展现出来，不被领导或者上司所察觉。你需要的是将自己的付出和取得的成绩展现出来。"}])}});
                await questionResult.addCard(card9ys1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "抽到隐士牌逆位，代表着这并不是一份简单的工作，整体来讲它也并不是你能够很好的胜任和处理的。\n在工作中你得注意把握好度，该出风头的时候你不能缩起来，该低调的时候必须低调好。并且这份工作对你来讲要做好并不那么容易，有很多隐性的问题是需要你去处理和解决的，一旦没处理好甚至有可能导致你在这里干不下去。\n整体来看，你的事业运指数：⭐⭐"},{title: "发展建议",content: "隐士对应的星座是处女座，在职场上处女座做事都是比较拼，比较靠谱的。需要注意的是，有时候默默地做了很多事情，但是却没有展现出来，不被领导或者上司所察觉。你需要的是将自己的付出和取得的成绩展现出来。"}])}});
                await questionResult.addCard(card10myzl, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "命运之轮是一张中性的牌，它是塔罗牌中的10号牌，意味着改变、变化。但是，是向着好的方向或坏的方向发展，并不那么明朗。整张牌预测着命运的不可预测，且其象征的命运不是人力可以控制的。它告诫我们得意时不要忘记失意时候的苦楚，失意时也别一蹶不振。相对来说，当命运之轮是正位的时候，这个转变是一种好的转变。\n抽到命运之轮，代表着今年你的事业运会迎来转机。总体来看还是挺好的。未来的事业运会渐渐好转，幸运的机会点即将要降临在你的身上了。只要努力工作，升职加薪的概率会很不错。 你的事业运指数：⭐⭐⭐"},{title: "发展建议",content: "平时脚踏实地好好工作，合理整合利用好身边的资源，努力为公司创造业绩。当机会来临时，好好把握，升职加薪不在话下。"}])}});
                await questionResult.addCard(card10myzl1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "当命运之轮逆位时，代表着今年你的事业运不太理想。\n你在工作上发生的改变可能是比较困难的。它暗示要努力对抗这些事件，而且通常都是徒劳无功的。在工作上，你竭尽全力却无功而返、效率低下、被同事或领导误解、希望落空、成绩低落。你遇到了很大的挫折，你的计划因为碰到大环境或人事上的阻碍而无法执行，必须重新开始。\n此外，抽到命运之轮逆位，还意味着今年你在事业上可能会遇到很不错的机会，但是你却没有能够很好地把握住这个机会。整体来看，你的事业运指数：⭐⭐"},{title: "发展建议",content: "平时脚踏实地好好工作，合理整合利用好身边的资源，努力为公司创造业绩。当机会来临时，好好把握，升职加薪不在话下。相信命运的捉弄总会过去的，在此之间，除了重新检视自己的状况，探讨面对当前环境的态度之外，也要发挥自己的创造力，创造新的命运走向，以脱离命运的老路子。"}])}});
                await questionResult.addCard(card11zy, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "正义对应的是天秤座。\n抽到正义牌，代表着今年你的事业运相对比较稳定。没有较大的起伏，一切都在按照计划认真地执行。也可能暗示着，你目前对工作和生活的协调还不错。能够很好的安排好彼此的边界。\n整体来看，今年你的事业运指数：⭐⭐⭐"},{title: "发展建议",content: "一般出现这张牌，通常与某个决定有关。此刻的你正在以心中的天秤来衡量各种因素，以做出最好的决定。在做决定的时候，你需要用理性的思考方式，仔细分析利弊。不论是职业选择，还是投资理财，都要慎重考虑。\n此外，正义正位代表平衡，稳步发展。你的事业发展不会有太多干扰，但是这也意味着，你要实现你的某些理想目标，需要做好很大的心理准备，跳脱出这个舒适圈。"}])}});
                await questionResult.addCard(card11zy1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "抽到塔罗牌正义逆位，证明你目前在事业上处于一种失衡的状态，或者得到了不公平的对待，可能是付出和回报不对等，也可能是没有调和好生活和工作的关系。还有一种含义是，在工作上你可能做了一些投机取巧的事，虽然有些时候无伤大雅，但这类问题其实大家一直都是知道的，而如果你不注意改掉这个小毛病，它是有可能影响到你未来的仕途的哦。\n整体来看，今年的事业运指数：⭐⭐"},{title: "发展建议",content: "你需要仔细衡量当前面临的各种因素，以做出最好的和判断和决定。在做决定的时候，需要用理性的思考方式，仔细分析利弊。不论是职业选择，该不该换工作，还是生活和工作的平衡取舍，都需要认真考虑。 "}])}});
                await questionResult.addCard(card12ddr, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "抽到倒吊人，代表着今年你总体来看事业运不是很理想。\n当牌面正立时，暗示着你的事业会有短暂的停顿，在工作上，你遇到了难以突破的瓶颈；你所期望的加薪、晋升，都没有如愿。\n不过不必担心，你很清楚问题所在，你目前处于再次确认自己的目标，为下次出发做准备的状态。正在进行自我的反思和对过往的复盘。\n你的事业运指数：⭐⭐"},{title: "发展建议",content: "这张牌告诉我们，再糟糕的境遇也不过是对我们的一种磨练，厄运总会过去。正如传说中的凤凰涅磐，又如北欧神话中的奥丁献身于绞架才学会魔法、文字、咒语以及诗歌。忍耐眼前的厄运，接受命运的安排，好好反省过去的得失，为将来的再度崛起储备力量，才是最重要的。"}])}});
                await questionResult.addCard(card12ddr1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "抽到倒吊人，代表着今年你总体来看事业运不是很理想。\n当牌面正立时，暗示着你的事业会有短暂的停顿，在工作上，你遇到了难以突破的瓶颈；你所期望的加薪、晋升，都没有如愿。不过不必担心，你很清楚问题所在，你目前处于再次确认自己的目标，为下次出发做准备的状态。正在进行自我的反思和对过往的复盘。\n当牌逆位的时候，代表着你会听从别人对你的期望，而非顺从你内在的声音。或许你一生都在利用角色模式引导你，而非直接去体验生活。\n整体来看，你的事业运指数：⭐⭐"},{title: "发展建议",content: "这张牌告诉我们，再糟糕的境遇也不过是对我们的一种磨练，厄运总会过去。正如传说中的凤凰涅磐，又如北欧神话中的奥丁献身于绞架才学会魔法、文字、咒语以及诗歌。忍耐眼前的厄运，接受命运的安排，好好反省过去的得失，为将来的再度崛起储备力量，才是最重要的。"}])}});
                await questionResult.addCard(card13ss, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "抽到死神牌，基本可以断定今年你的事业运不太理想。死神有很多象征含义，转变、新生等等，但是最主要的含义是结束、悲催。\n整体来看，你今年工作业绩会出现下滑的可能，如果有带项目，也可能会面临毫无进展的状态。更严重的会出现被辞退等。\n你的事业运指数：⭐"},{title: "发展建议",content: "工作上需要未雨绸缪，提前做好准备和打算。在社交上需要多结交朋友，这样当自己需要帮助，或者想换新工作的时候，或许朋友可以帮忙推荐。此外就是金钱上要注意节约一些，保证自己有相对充裕的钱来面对困境（比如被辞退，两三个月才找到工作等）。"}])}});
                await questionResult.addCard(card13ss1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "抽到死神牌，基本可以断定今年你的事业运不太理想。死神有很多象征含义，转变、新生等等，但是最主要的含义是结束、悲催。\n当死神逆位时候，代表着你现在可能正处于事业的瓶颈期，你必须要做出选择，只有迈出这一步，你才会看到崭新的自己。事业才能迎来新的发展。\n整体来看，这份工作现阶段情况很是不理想，你需要开始做另一手打算了，做好跳槽或者失败的心理准备。同时这件事其实还没到山穷水尽的程度，如果你在未来全心全意的努力去挽回挽救，不计较得失，还是有可能改变不利的情况的。但你要注意的是，其实这份工作除非你能够突破现状，不然前景已经是非常渺茫了，没太多继续下去的必要。\n你的事业运指数：⭐"},{title: "发展建议",content: "工作上需要未雨绸缪，提前做好准备和打算。在社交上需要多结交朋友，这样当自己需要帮助，或者想换新工作的时候，或许朋友可以帮忙推荐。此外就是金钱上要注意节约一些，保证自己有相对充裕的钱来面对困境（比如被辞退，两三个月才找到工作等）。"}])}});
                await questionResult.addCard(card14jz, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "节制这张牌，顾名思义，其意思是有所节制。对于大多数人而言，这意味着自我控制。对应到事业运上，代表着你对工作业务的掌控还是蛮好的。\n整体来看，这是一份需要你随时调整状态，多沟通的项目，如果你只是顺其自然发展可能并不能满足其要求。这份工作可能会让你面临很多心理情绪上的问题，这些都是需要你及时调节和整合的。并且与合作人或者领导的沟通也是期间的一个重点，别总是自己做，有想法和点子多和他人沟通磨合会比较好。整体来讲这份工作前景还是很不错滴，继续加油哦。\n你的事业运指数：⭐⭐⭐⭐"},{title: "发展建议",content: "此外，节制还代表着调和、平衡。工作上难以避免会涉及各式各样的合作，不管是与同事之间的合作还是对外的合作，需要调和好彼此的诉求，才能收获互利共赢的结果。"}])}});
                await questionResult.addCard(card14jz1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "节制逆位，代表着消耗、下降、走极端、疲劳、损失等。逆位的时候，事业运上没有节制正位时候好。整体来看，今年事业运一般般。你的事业运指数：⭐⭐\n抽到这张牌，代表着你在工作上缺乏调节能力。在面对繁琐的工作时，可能会因为没调节好而导致过于情绪化。工作上会面临项目进展不顺利、业绩下滑，事业可能会步入低谷的困境。"},{title: "发展建议",content: "对你来讲带着压抑的情绪工作，你已经没有太多精力去管太多事。你需要做好自身的调节工作，只有时刻保持一个良好的状态，积极的状态，工作才会顺风顺水。如果实在改变不了换一个工作也是不错的选择哦。"}])}});
                await questionResult.addCard(card15em, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "恶魔是一张代表物质的牌，在现今社会社会对物质的追求是再正常不过的事情。当看事业或者财运的时候，出现恶魔牌是一个好的征兆。这表示当事人真的很渴望、很认真努力地想要求取金钱，物质上的成功。\n整体来看，因为你对金钱有着超乎常人的渴望，对应到行动上，你今年的事业运会很不错。你的事业运指数：⭐⭐⭐⭐"},{title: "发展建议",content: "对金钱的渴望很正常，渴望升职加薪也是人之常情。但是需要通过正常的路径来实现，切勿通过溜须拍马、贿赂上司等手段获取成功。这样就误入歧途了。还是要靠自己踏踏实实的努力来争取，会更心安理得。"}])}});
                await questionResult.addCard(card15em1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "恶魔是一张代表物质的牌，在现今社会社会对物质的追求是再正常不过的事情。当看事业或者财运的时候，出现恶魔牌是一个好的征兆。这表示当事人真的很渴望、很认真努力地想要求取金钱，物质上的成功。\n整体来看，因为你对金钱有着超乎常人的渴望，对应到行动上，你今年的事业运会很不错。你的事业运指数：⭐⭐⭐⭐"},{title: "发展建议",content: "对金钱的渴望很正常，渴望升职加薪也是人之常情。但是需要通过正常的路径来实现，切勿通过溜须拍马、贿赂上司等手段获取成功。这样就误入歧途了。还是要靠自己踏踏实实的努力来争取，会更心安理得。"}])}});
                await questionResult.addCard(card16gt, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "高塔是塔罗牌当中的16号牌，代表着突如其来的改变、无法挽回的崩塌。是一种剧变和灾难。对应到你的事业运上，意味着你今年会有丢工作的风险。\n今年的你，事业运很不好。容易大起大落，可能会有一些计划赶不上变化的意外事情发生。这些意外是无法控制的、是突如其来的。例如: 项目黄了，公司突然裁员等等。整体来看，你的事业运指数：⭐"},{title: "发展建议",content: "高塔牌一出，通常也是给你一个警醒作用。提示你不要待在舒适圈里面。你的事业上是充满挑战的，或许眼前你也察觉到了。所以请行动起来，不要畏惧风险，更不要嫌麻烦。早做准备，未雨绸缪，总没坏处。"}])}});
                await questionResult.addCard(card16gt1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "高塔是塔罗牌当中的16号牌，代表着突如其来的改变、无法挽回的崩塌。是一种剧变和灾难。对应到你的事业运上，意味着你今年会有丢工作的风险。\n今年的你，事业运很不好。容易大起大落，可能会有一些计划赶不上变化的意外事情发生。这些意外是无法控制的、是突如其来的。例如: 项目黄了，公司突然裁员等等。整体来看，你的事业运指数：⭐"},{title: "发展建议",content: "高塔牌一出，通常是给你一个警醒作用。提示你不要待在舒适圈里面。你的事业上是充满挑战的，或许眼前你也察觉到了。所以请行动起来，不要畏惧风险，更不要嫌麻烦。早做准备，未雨绸缪，总没坏处。"}])}});
                await questionResult.addCard(card17xx, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "星星牌是塔罗牌里的17号牌。代表着希望、愿望满足，抽到这张牌，意味着你大概率能心想事成。对应到事业运上，代表着今年你的事业运非常好。可谓是顺风顺水，升职加薪大有希望，你的事业运指数：⭐⭐⭐⭐⭐\n今年，你可能会遇到好的工作机会，或者贵人提携。只要你努力抓住机会，会取得不小的成功，对应的物质回报也会很丰厚。"},{title: "发展建议",content: "这是一份充满希望的工作或者项目，但如果你自己不注意把握，也是有可能搞砸的哦。所以这个时候最重要的是做好事业规划，自己处于什么目标中的什么位置，都要思考清楚。"}])}});
                await questionResult.addCard(card17xx1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "星星牌是塔罗牌里的17号牌。\n抽到正位时，代表着希望、愿望满足，抽到这张牌，意味着你大概率能心想事成。抽到逆位时，代表着这是一份没啥希望和前景的工作，即使表面上看似乎不错。好像能获得不少回报，但实际上对你来讲它并不能给你带来多少希望，反而会让你陷入无尽的幻想和不现实中。它的前景并不是很好，继续做下去也不会有太大发展，甚至会是走下坡路的阶段。整体来看，你的事业运指数：⭐⭐"},{title: "发展建议",content: "你应该放松心情，不要去奢求太多的东西，不要产生太大的欲望，你要让自己的心慢慢沉淀下来。这个时候最重要的是做好事业规划，自己处于什么目标中的什么位置，都要思考清楚。"}])}});
                await questionResult.addCard(card18yl, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "月亮牌是塔罗牌里的18号牌，代表着不安、怀疑、恐惧。\n月亮通常是指某种具艺术性或创造性的事业，或夜晚工作比白天还多的情形。抽到月亮牌，代表着你目前在工作上有些迷茫和困惑，甚至有一种恐惧和深沉的焦虑。你不知道接下来的发展如何，有时候工作的压力会压得你一度想要放弃，但是又不知道放弃之后该做什么。月亮牌还代表着你非常相信自己的直觉，所以常会对事物有过于主观的见解，以致在工作上会做出错误的选择，这也是你工作停滞不前的一个主要原因。\n整体来说，今年你的事业运不是很理想，事业运指数：⭐⭐"},{title: "发展建议",content: "月亮牌暗示你需要调整自己的工作思路，多听听别人的意见，放低一些对自己的要求，可能更容易使工作向前推动。凭着坚韧的毅力，迎难而上，自然能冲破重重阻碍，拨云见日。如果一个人缺乏毅力，凡事知难而退，半途而废，那么，所谓的事业对他来说，就只能是望洋兴叹了。"}])}});
                await questionResult.addCard(card18yl1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "月亮牌是塔罗牌里的18号牌，代表着不安、怀疑、恐惧。\n月亮通常是指某种具艺术性或创造性的事业，或夜晚工作比白天还多的情形。抽到月亮牌逆位，代表着现在的你在面对问题时，已经能破除迷惘了，不再深陷迷茫困惑当中。至于先前工作上错误的判断和选择，随着时间的推移，会逐渐得到解决的。整体来说，今年你的事业运指数：⭐⭐"},{title: "发展建议",content: "这是一个看似不错实际却很坑爹的工作。其实你一直在寄希望未来能好，并且等待它稳定下来的那一天。但实际上这份工作本身并不是那种有不错前景的工作，即使你再怎么努力都很难达到那样的程度，所以如果可以还是尽早放弃比较好。"}])}});
                await questionResult.addCard(card19ty, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "太阳是塔罗牌当中的19号牌，代表着阳光、快乐、正大光明等。这是一张光明面最好的牌，对应到事业运上，抽到这张牌，证明结果会很不错。整体来看，今年你的事业运比较不错，事业运指数：⭐⭐⭐⭐\n今年，你大概率会得到升职加薪的机会，极有可能遇到贵人相助，领导提携。只要踏实勤奋，遇到机会牢牢抓住，今年一定是一个收获不菲的年份。"},{title: "发展建议",content: "职场上要多交朋友，维护好人脉关系。工作谨慎小心，不因粗心大意而犯错，对工作做好提前规划，尤其是做新项目的时候，一定要充分调研再启动。工作上切勿抱怨，做事保持专注。"}])}});
                await questionResult.addCard(card19ty1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "太阳是塔罗牌当中的19号牌，代表着阳光、快乐、正大光明等。这是一张光明面最好的牌，虽然此处是逆位，代表着这份工作上还是会有一些不安定的因素在里面，但是整体还是很不错的。今年，你大概率会得到升职加薪的机会，极有可能遇到贵人相助，领导提携。只要踏实勤奋，遇到机会牢牢抓住，今年一定是一个收获不菲的年份。\n整体来看，今年你的事业运比较不错，事业运指数：⭐⭐⭐"},{title: "发展建议",content: "职场上要懂得多交朋友，维护好人脉关系。工作谨慎小心，不因粗心大意而犯错，对工作做好提前规划，尤其是做新项目的时候，一定要充分调研再启动。工作上切勿抱怨，做事保持专注。"}])}});
                await questionResult.addCard(card20sp, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "审判是塔罗牌里的20号牌，它的前一张是太阳牌，后一张是世界牌，都是很不错的牌。审判处在中间位置，代表着觉醒、复活、新的开始。\n对应到事业运上，代表着今年你的事业运会有新的开始，在经过一段时间的改善后，你将会完成自己的目标。而此时，也是转变思路，更换职业的好时机。只要踏实勤奋，大有可能会升职加薪哦。\n整体来看，你的事业运指数：⭐⭐⭐"},{title: "发展建议",content: "坚持就是胜利，只要勤奋踏实地坚持下去，总会看见属于你的收获的。工作上切勿抱怨，做事保持专注。此外，遇到好的机会，不要错过，要勇于抓住！"}])}});
                await questionResult.addCard(card20sp1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "审判是塔罗牌里的20号牌，它的前一张是太阳牌，后一张是世界牌，都是很不错的牌。审判处在中间位置，代表着觉醒、复活、新的开始。\n抽到审判逆位，代表着事业方面，你会因为缺乏必要的决断力而害怕改变，从而导致很难进入下一步发展。\n今年事业上会受挫、面对困难容易一蹶不振、颇感心有余而力不足、业绩低迷。或许因为现实生活的需要，你不愿放弃现有的工作，但显然地这份工作并不适合你；你对工作没有热忱，时常有倦怠感。\n整体来看，你的事业运指数：⭐"},{title: "发展建议",content: "坚持就是胜利，只要勤奋踏实地坚持下去，总会看见属于你的收获的。工作上切勿抱怨，做事保持专注。此外，遇到好的机会，不要错过，要勇于抓住！"}])}});
                await questionResult.addCard(card21sj, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "抽到世界牌，代表着圆满、尽善尽美之意。对应到事业运上，意味着今年你的事业运非常不错，事业运指数：⭐⭐⭐⭐\n今年你的工作业绩不错，提成、分红都会很好。虽然你不会突然赚大钱，但是只要有付出，都能得到相对的报酬收入，坚持可以取得成功，也能够轻松掌控着自己和周遭的事物。"},{title: "发展建议",content: "职场上需要一步一个脚印，要记住“人生的路，每一步都算数”，你必须打好基础，对业务做到非常熟悉了解才行。这样等升职之后，才不至于脱离业务，失去掌控。此外，要处理和协调好和公司同事、下属、领导的关系，不管是横向管理还是纵向管理都要处理到位。此外，如果有适合的出差出国机会也不妨试一试哦~你的海外事业运说不定很旺哦~"}])}});
                await questionResult.addCard(card21sj1, {through: {interpretation: JSON.stringify([{title: "整体事业运",content: "世界牌是塔罗牌里的21号牌，抽到世界牌正位，代表着圆满、尽善尽美之意。对应到事业运上，意味着今年你的事业运非常不错，\n当抽到逆位时，则事业运上和正位时相比会稍微差一些，事业运指数：⭐⭐⭐\n虽然这份工作中有一些不足不太好的地方，要么工资不是很满意，要么是工作内容让你觉得无聊，但是不可否认它是一个值得你继续选择的工作。虽然里面的一些问题并不是说解决就能解决的，但这份工作的前景还是蛮不错的，只要你坚持做，即使不能完全达到你心目中的要求至少也算是能让你满意了。"},{title: "发展建议",content: "职场上需要一步一个脚印，要记住“人生的路，每一步都算数”，你必须打好基础，对业务做到非常熟悉了解才行。这样等升职之后，才不至于脱离业务，失去掌控。此外，要处理和协调好和公司同事、下属、领导的关系，不管是横向管理还是纵向管理都要处理到位。"}])}});

                questionResult = await groupResult.createQuestion({name: "2019年财运如何？", tips: "能不能一夜暴富......", count: 132, priceOld: 9800, priceNew: 990});
                await questionResult.addCard(card0yr, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "抽到愚人正位时，象征着你的正财运一般，但可能有点偏财运，总体并不算乐观。\n当你周遭的人都对某事提防戒慎，你却打算去冒这个险时，愚人牌可能就会出现。例如，“噢，我认为现在是换工作的好时机”，但现实是外面到处都是失业的人，你并不在乎处境，不论如何都要做做看。而长期的计划却被你当做将来的事，因此没有人脉资源空有一腔热血的你失败机率较高，容易造成破财。\n整体来看，你的财运指数：⭐⭐"},{title: "注意事项",content: "宜:脚踏实地的做好手头上的事，增长自身的知识储备，对未来的发展做长远的规划，扩展人脉资源，充满热情和行动力。\n忌:大额投资，跟朋友合伙做生意，没找好下家就辞职，盲目乐观，太过于依赖他人的建议，不重视自己的判断，逃避责任。"}])}});
                await questionResult.addCard(card0yr1,{through: {interpretation: JSON.stringify([{title: "整体财运",content: "抽到愚人时，象征着你的正财运一般，但可能有点偏财运，总体并不算乐观。\n当你周遭的人都对某事提防戒慎，你却打算去冒这个险时，愚人牌可能就会出现。例如，“噢，我认为现在是换工作的好时机”，但现实是外面到处都是失业的人，你并不在乎处境，这种情况，愚人逆位的时候，会比正位的时候更为严重。不论如何都要做做看。而长期的计划却被你当做将来的事，因此没有人脉资源空有一腔热血的你失败机率较高，容易造成破财。\n如果说正位时候，你的财运指数还能有2颗星的话，当愚人逆位时，则变得更低了。整体来看，逆位愚人时，你的财运指数：⭐"},{title: "注意事项",content: "宜:脚踏实地的做好手头上的事，增长自身的知识储备，对未来的发展做长远的规划，扩展人脉资源，充满热情和行动力。\n忌:大额投资，跟朋友合伙做生意，没找好下家就辞职，盲目乐观，太过于依赖他人的建议，不重视自己的判断，逃避责任。"}])}});
                await questionResult.addCard(card1mss, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到魔术师正位时，代表着正财运比较不错，偏财运一般，整体上财运不错。\n对的时间、对的机会、对的动机，会使你的努力值回票价。对于展开行动、实现计划而言，也正是一个良好时机。由于你已为实现计划打下良好基础，所以新的冒险很可能会实现。清楚的方向感和意志力的贯彻，大大的提升了成功的可能性。\n整体来看，你的财运指数：⭐⭐⭐⭐\n "},{title: "注意事项",content: "宜:投资理财，跳槽，创业，帮别人牵线搭桥，合理利用自己的人脉资源，发挥想象力，遵循自己的想法，做出具体成果。\n忌:人云亦云，被生活的潮流推着走，漫无目标，缺乏自律，不切实际的胡思乱想，欺骗别人，日常工作或做生意时投机，买彩票，赌博。"}])}});
                await questionResult.addCard(card1mss1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到魔术师正位时，意味着正财运比较不错，偏财运一般，整体上财运不错，财运指数为四颗星。对的时间、对的机会、对的动机，会使你的努力值回票价。对于展开行动、实现计划而言，也正是一个良好时机。由于你已为实现计划打下良好基础，所以新的冒险很可能会实现，清楚的方向感和意志力的贯彻，大大的提升了成功的可能性。\n当魔术师逆位时，情况不太乐观，沟通上会存在一些失衡的情况，导致人际相处，比如与同事或者上司或者合作伙伴等的相处上会有一些小阻碍。\n整体来看，你的财运指数：⭐⭐\n "},{title: "注意事项",content: "宜:投资理财，跳槽，创业，帮别人牵线搭桥，合理利用自己的人脉资源，发挥想象力，遵循自己的想法，做出具体成果。\n忌:人云亦云，被生活的潮流推着走，漫无目标，缺乏自律，不切实际的胡思乱想，欺骗别人，日常工作或做生意时投机，买彩票，赌博。"}])}});
                await questionResult.addCard(card2njs, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到女祭司正位时，代表着正财运一般，偏财运不佳，整体来看财运指数较低。\n抽到这张牌，你一般会吃知识这碗饭，很容易得到上司的赏识，委以重任，升职加薪的机会较大。但目前正处于上升期，钱财获得基本上都是劳动所得的正财，你本身并没有太多富有创造力的想法，喜欢按规矩做事，也因为这样的性格特点，并没有什么偏财运。\n整体来看，你的财运指数：⭐⭐"},{title: "注意事项",content: "宜:努力工作，提升自我的职业技能，一步一个脚印，相信自己的直觉，出去走走，认识新朋友，刚认识的人可以帮你介绍新的可能以及机会，积极找他人合作，取长补短，花花钱，散散财。\n忌:没有事实根据想当然的解决问题，跳槽，创业，做风险投资，沉静在自己的世界里，死读书，读死书，一门心思攒钱。"}])}});
                await questionResult.addCard(card2njs1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到女祭司时，代表着你的正财运一般，偏财运不佳，整体来看财运指数较低。\n抽到这张牌，你一般会吃知识这碗饭，很容易得到上司的赏识，委以重任，升职加薪的机会较大，但目前正处于上升期，钱财获得基本上都是劳动所得的正财，你本身并没有太多富有创造力的想法，喜欢按规矩做事，也因为这样的性格特点，并没有什么偏财运。\n整体来看，你的财运指数：⭐⭐"},{title: "注意事项",content: "宜:努力工作，提升自我的职业技能，一步一个脚印，相信自己的直觉，出去走走，认识新朋友，刚认识的人可以帮你介绍新的可能以及机会，积极找他人合作，取长补短，花花钱，散散财。\n忌:没有事实根据想当然的解决问题，跳槽，创业，做风险投资，沉静在自己的世界里，死读书，读死书，一门心思攒钱。"}])}});
                await questionResult.addCard(card3nh, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到女皇正位，代表着正财运一般，偏财运非常不错，总体来看你的财运非常好，属于典型的有钱人，不会手头紧的。\n你的钱财来源方向大概有，殷实的家境，爱你且支持你的另一半，之前做投资所获得的报酬，几乎是不付出多少努力就能够名利双收，享受生活。\n整体来看，你的财运指数：⭐⭐⭐⭐⭐"},{title: "注意事项",content: "宜:做生意，投资理财，冷静思考选择，理性做分析判断，坚定信仰，与大自然接触，旅行。\n忌:缺乏上进心，散漫的生活习惯，沉迷于享乐，与家人发生纠纷，任性，不思进取、虚荣心强、搁置计划，太奢侈，无节制的花钱。"}])}});
                await questionResult.addCard(card3nh1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到女皇正位时，代表着正财运一般，偏财运非常不错，总体来看你的财运非常好，属于典型的有钱人，不会手头紧的。\n你的钱财来源方向大概有，殷实的家境，爱你且支持你的另一半，之前做投资所获得的报酬，几乎是不付出多少努力就能够名利双收，享受生活。\n当女皇逆位时，财运比起正位时会有所减弱，整体来看，你的财运指数：⭐⭐⭐⭐"},{title: "注意事项",content: "宜:做生意，投资理财，冷静思考选择，理性做分析判断，坚定信仰，与大自然接触，旅行。\n忌:缺乏上进心，散漫的生活习惯，沉迷于享乐，与家人发生纠纷，任性，不思进取、虚荣心强、搁置计划，太奢侈，无节制的花钱。"}])}});
                await questionResult.addCard(card4hd, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到皇帝正位的时候，代表着正财运不错，偏财运也不错，整体来看财运还是比较旺的。\n你是一个很有野心，且非常有能力的人，通过自律和实际的努力而达到成功，获得财务上的回报，对于自己做的事情相当有把握，不打无准备的仗，不签不靠谱的合同，不做不赚钱的投资说的就是你了！！\n整体来看，你的财运指数：⭐⭐⭐⭐⭐"},{title: "注意事项",content: "宜:投资理财，签合同，做生意，扩展业务范围，为人处事有责任感，结交权贵，与他人进行商业合作。\n忌:贪图小利，意志力薄弱，犹豫不决，控制欲过盛，缺乏理财头脑，消费无节制，过分固执武断。"}])}});
                await questionResult.addCard(card4hd1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到皇帝正位的时候，代表着正财运不错，偏财运也不错，整体来看财运还是比较旺的。财运指数五颗星。\n你是一个很有野心，且非常有能力的人，通过自律和实际的努力而达到成功，获得财务上的回报，对于自己做的事情相当有把握，不打无准备的仗，不签不靠谱的合同，不做不赚钱的投资说的就是你了！！\n当皇帝逆位时，则不太乐观，野心和自律性相对正位时候有些缺乏。\n整体来看，你的财运指数：⭐⭐⭐"},{title: "注意事项",content: "宜:投资理财，签合同，做生意，扩展业务范围，为人处事有责任感，结交权贵，与他人进行商业合作。\n忌:贪图小利，意志力薄弱，犹豫不决，控制欲过盛，缺乏理财头脑，消费无节制，过分固执武断。"}])}});
                await questionResult.addCard(card5jh, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到教皇正位时，代表着正财运不错，偏财运一般，整体来看财运还可以。\n教皇牌代表着，今年你的基本钱财获得来源是自身努力工作所得，工作上容易遇到贵人，可能会获得贵人的帮助，或给你提供一些新的机会。\n但贵人不会直接给你钱，还需要自己探索新的工作方法，虽然不容易，会面对很大的阻力，但以后回过头来看，你会发现一切的付出都是值得的。\n整体来看，你的财运指数：⭐⭐⭐"},{title: "注意事项",content: "宜:努力工作，转换新思路，把握新的工作机会，跳槽，跟有能力的人一起做事，计划消费，攒钱。\n忌:拍马屁，消极怠工，异想天开，急于求成，风险投资，做生意，跟朋友合伙开店。"}])}});
                await questionResult.addCard(card5jh1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到教皇正位时，代表着正财运不错，偏财运一般，整体来看财运还可以。\n教皇牌代表着，今年你的基本钱财获得来源是自身努力工作所得，工作上容易遇到贵人，可能会获得贵人的帮助，或给你提供一些新的机会。\n但贵人不会直接给你钱，还需要自己探索新的工作方法，虽然不容易，会面对很大的阻力，但以后回过头来看，你会发现一切的付出都是值得的。\n整体来看，你的财运指数：⭐⭐⭐"},{title: "注意事项",content: "宜:努力工作，转换新思路，把握新的工作机会，跳槽，跟有能力的人一起做事，计划消费，攒钱。\n忌:拍马屁，消极怠工，异想天开，急于求成，风险投资，做生意，跟朋友合伙开店。"}])}});
                await questionResult.addCard(card6lr, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到恋人牌时，代表着正财运一般，偏财运也一般，整体来看财运上并不乐观。\n你的钱财获得主要还是靠勤奋工作所得，没有买彩票会中大奖的运势。\n实际上你自身的能力并不弱，可以匹配环境更好、收入更好的工作机会，你已经由过去经验而得到成长了，可以安全的迈向一个新的阶段，未来财运会有好转的趋势。\n整体来看，你的财运指数：⭐⭐⭐"},{title: "注意事项",content: "宜:寻找新的工作机会或合作机会，跳槽，合伙创业，拒绝诱惑，追求上进，为自己的人生负起责任，攒钱。\n忌:逃避责任，安于现状一成不变，盲目信任别人，太奢侈，毫无节制的买买买，做事情优柔寡断。"}])}});
                await questionResult.addCard(card6lr1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到恋人牌时，代表着正财运一般，偏财运也一般，整体来看财运上并不乐观。\n你的钱财获得主要还是靠勤奋工作所得，没有买彩票会中大奖的运势，你自身的能力很强，可以匹配环境更好、收入更好的工作机会，你已经由过去经验而得到成长了，可以安全的迈向一个新的阶段，未来财运会有好转的趋势。\n整体来看，你的财运指数：⭐⭐"},{title: "注意事项",content: "宜:寻找新的工作机会或合作机会，跳槽，合伙创业，拒绝诱惑，追求上进，为自己的人生负起责任，攒钱。\n忌:逃避责任，安于现状一成不变，盲目信任别人，太奢侈，毫无节制的买买买，做事情优柔寡断。"}])}});
                await questionResult.addCard(card7zc, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到战车正位时，代表着正财运不错，偏财运也不错，整体来看财运运势还算比较乐观。\n你的业务能力很强，坚持可以取得成功，也能够轻松掌控着自己和周遭的事物。钱财获得，一方面来自于劳动所得，另一方面也来源于投资回报，但也有可能因太过自信，想着投机取巧，导致判断失误而造成重大钱财损失。\n整体来看，你的财运指数：⭐⭐⭐⭐\n "},{title: "注意事项",content: "宜:克制自己的消费欲望，脚踏实地的付出努力去赚取钱财，协调好人际关系，谨慎处理钱财方面的问题。\n忌:投机取巧，幻想赚快钱，赌场碰碰运气，对问题视而不见，多愁善感情绪化，毫无节制的消费。"}])}});
                await questionResult.addCard(card7zc1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到战车正位时，代表着正财运不错，偏财运也不错，整体来看财运运势还算比较乐观。财运指数四颗星。\n你的业务能力很强，坚持可以取得成功，也能够轻松掌控着自己和周遭的事物，钱财获得，一方面来自于劳动所得，另一方面也来源于投资回报，但也有可能因太过自信，想着投机取巧，导致判断失误而造成重大钱财损失。\n当抽到战车逆位时，情况不太理想，战车正位代表着胜利，逆位则有挫折、失控的含义。\n整体来看，逆位时你的财运指数：⭐⭐\n "},{title: "注意事项",content: "宜:克制自己的消费欲望，脚踏实地的付出努力去赚取钱财，协调好人际关系，谨慎处理钱财方面的问题。\n忌:投机取巧，幻想赚快钱，赌场碰碰运气，对问题视而不见，多愁善感情绪化，毫无节制的消费。"}])}});
                await questionResult.addCard(card8ll, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到力量牌时，代表着今年正财运不错，偏财运一般，整体来看财运还是挺好的。处于急速上升状态，正财收入逐渐增长，偏财方面也可能有值得期待的好消息降临。\n你要做的就是，积极接受挑战，全力以赴为赚钱而奋斗，抓住机遇，便能在财富方面取得鱼跃龙门的成就。\n整体来看，你的财运指数：⭐⭐⭐⭐"},{title: "注意事项",content: "宜:投资理财，努力工作，在事业中获得加薪的机会，合理利用自己的人脉资源，发挥想象力，遵循自己的想法，做出具体成果。\n忌:大笔开销，过于贪心，自负自大，赌博，透支信用卡，网络借贷，想着投机取巧，导致判断失误而造成大量钱财损失。"}])}});
                await questionResult.addCard(card8ll1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "当抽到力量正位时，代表着今年你正财运不错，偏财运一般。整体来看财运还是挺好的，处于急速上升状态，正财收入逐渐增长，偏财方面也可能有值得期待的好消息降临。\n你要做的就是，积极接受挑战，全力以赴为赚钱而奋斗，抓住机遇，便能在财富方面取得鱼跃龙门的成就。\n当力量逆位时，代表着你在有些事情上会缺乏信心和勇气。整体来看，财运没有正位时候好（正位力量牌财运指数四颗星），财运指数：⭐⭐"},{title: "注意事项",content: "宜:投资理财，努力工作在事业中获得加薪的机会，合理利用自己的人脉资源，发挥想象力，遵循自己的想法，做出具体成果。\n忌:大笔开销，过于贪心，自负自大，赌博，透支信用卡，网络借贷，想着投机取巧，导致判断失误而造成大量钱财损失。"}])}});
                await questionResult.addCard(card9ys, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "抽到隐士牌，代表着孤独、内省、谨慎。\n对应到财运上，代表着今年正财运一般，偏财运也不是很好，整体来看，财运不佳。\n未来财运没有什么明显提升，和目前的财运基本上是没有多少变化的，比较平稳的状态。\n从这张牌上看你这个人在事业上是很没有魄力的，太过于谨慎导致你对于一些事情不敢轻易下决定犹豫不决，会影响到你的财运，会错过赚钱的好机会。此外，在工作上，还代表着你不太会团队作战，喜欢一个人战斗。\n整体来看，你的财运指数：⭐⭐"},{title: "注意事项",content: "宜:自省，停下脚步正视你现在所忙碌的是不是适合你的，有没有错过最适合自己的，投资时多倾听自己的心声、梦想，或倾听朋友的话来面对。\n忌:盲目跟风，没有计划的投资，像长不大的小孩，做事情的任性态度，急躁不负责任，逃避承诺。"}])}});
                await questionResult.addCard(card9ys1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "抽到隐士牌，正位时代表着孤独、内省、谨慎。逆位时则代表粗心大意，失去了正位时候的谨慎。\n抽到隐士牌，整体来看，你今年财运一般，不管是正财还是偏财都不理想。\n在工作上，你可能会因为粗心大意犯错，导致给公司造成财务损失，最终影响自己的业绩或升迁机会。此外，隐士的孤独含义，还暗示着你在工作上喜欢一个人战斗，而不是团队协作。这些都会影响你事业上的发展，进而影响财运。\n整体来看，你的财运指数：⭐⭐"},{title: "注意事项",content: "宜:自省，停下脚步正视你现在所忙碌的是不是适合你的，有没有错过最适合自己的，投资时多倾听自己的心声、梦想，或倾听朋友的话来面对。\n忌:盲目跟风，没有计划的投资，像长不大的小孩，做事情的任性态度，急躁不负责任，逃避承诺。"}])}});
                await questionResult.addCard(card10myzl, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "命运之轮是一张中性的牌，它是塔罗牌中的10号牌，意味着改变、变化。但是，是向着好的方向或坏的方向发展，并不那么明朗。整张牌预测着命运的不可预测，且其象征的命运不是人力可以控制的。它告诫我们得意时不要忘记失意时候的苦楚，失意时也别一蹶不振。相对来说，当命运之轮是正位的时候，这个转变是一种好的转变。\n抽到命运之轮，代表着你正财运一般，偏财运却很不错。总体来看财运还是挺好的。未来的运气会渐渐好转，风水轮流转，幸运的机会点即将要降临在你的身上了，虽然你不会突然赚大钱，但是只要有付出，都能得到相对的报酬收入。\n幸运从天而降，财神爷会赐你钱财的机会，可能会有意外之财出现，不妨去买张彩票试试手气。你的财运指数：⭐⭐⭐"},{title: "注意事项",content: "宜:买彩票，出门旅游，做短期投资理财，当走在路上时，多低头看看，或许会有意外的收获。\n忌:盲目跟风，做事情的任性态度，急躁不负责任，逃避承诺，大额开销，无节制买买买。"}])}});
                await questionResult.addCard(card10myzl1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "命运之轮是一张中性的牌，它是塔罗牌中的10号牌，意味着改变、变化。但是，是向着好的方向或坏的方向发展，并不那么明朗。整张牌预测着命运的不可预测，且其象征的命运不是人力可以控制的。它告诫我们得意时不要忘记失意时候的苦楚，失意时也别一蹶不振。相对来说，当命运之轮是正位的时候，这个转变是一种好的转变。而当命运之轮是逆位的时候，则意味着是一种不好的转变。\n逆位的命运之轮，代表着今年正财运一般，偏财运还行。风水轮流转，前提是你需要能够抓住机会。遇到机会的时候，千万不要犹豫不决。 \n整体来看，你的财运指数：⭐⭐"},{title: "注意事项",content: "宜:买彩票，出门旅游，做短期投资理财，当走在路上时，多低头看看，或许会有意外的收获。\n忌:盲目跟风，做事情的任性态度，急躁不负责任，逃避承诺，大额开销，无节制买买买。不要做投机之事，比如赌博等等，不然财产损失巨大。"}])}});
                await questionResult.addCard(card11zy, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "正义对应的是天秤座。一般出现这张牌，通常与某个决定有关。此刻的你正在以心中的天秤来衡量各种因素，以做出最好的决定。在做决定的时候，你会用理性的思考方式，仔细分析利弊。不论是职业选择，还是投资理财，都会考虑的比较慎重。\n抽到正义牌，代表着正财运很不错，偏财运相对差一些。不过，总体财运还是挺不错的。\n你的财运会保持稳定状态，你可以按照目前的理财计划安排开支，只要认真理财，开源节流，你的财富状况就会进入良性循环。\n需要提醒你的是，别为不值得花钱的事情浪费钱财，克制物欲也是保障收支平衡的一种手段。你的财运指数：⭐⭐⭐"},{title: "注意事项",content: "宜:克制物欲，节省开销，攒钱，努力工作在事业中获得加薪的机会，合理利用自己的人脉资源，发挥想象力，遵循自己的想法，做出具体成果。\n忌:奢侈浪费，大额投资理财，过于贪心，自负自大，赌博，透支信用卡，网络借贷，想着投机取巧，导致判断失误而造成大量钱财损失。"}])}});
                await questionResult.addCard(card11zy1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "抽到塔罗牌正义逆位，证明你目前的财务处于一种失衡的状态，可能是付出和回报不对等，也可能是入不敷出。整体来看，今年的财运指数：⭐⭐\n今年你需要认真理财，开源节流，别为不值得花钱的事情浪费钱财，以及克制物欲保障收支平衡，以确保你的财富状况进入良性循环。"},{title: "注意事项",content: "宜:克制物欲，节省开销，攒钱，努力工作在事业中获得加薪的机会，合理利用自己的人脉资源，发挥想象力，遵循自己的想法，做出具体成果。\n忌:奢侈浪费，大额投资理财，过于贪心，自负自大，赌博，透支信用卡，网络借贷，想着投机取巧，导致判断失误而造成大量钱财损失。"}])}});
                await questionResult.addCard(card12ddr, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "抽到倒吊人，代表着今年你总体来看财运并不是很好，正财运一般，偏财运也很一般。处于急转直下的状况中。要是再找不到开源的方法，恐怕你很快就得吃土了。\n正财会受到意外事件的影响，收入无法满足你的期待。不要指望偏财能给你带来帮助，近期，你必须避免参加任何性质的投资，否则会亏到怀疑人生。你的财运指数：⭐"},{title: "注意事项",content: "宜:克制物欲，节省开销，攒钱，努力工作在事业中获得加薪的机会，合理利用自己的人脉资源，发挥想象力，遵循自己的想法，做出具体成果。\n忌:奢侈浪费，大额投资理财，过于贪心，自负自大，赌博，透支信用卡，网络借贷，想着投机取巧，导致判断失误而造成大量钱财损失。"}])}});
                await questionResult.addCard(card12ddr1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "抽到倒吊人，代表着今年你总体来看财运并不是很好，正财运一般，偏财运也很一般。处于急转直下的状况中。要是再找不到开源的方法，恐怕你很快就得吃土了。\n正财会受到意外事件的影响，收入无法满足你的期待。不要指望偏财能给你带来帮助，近期，你必须避免参加任何性质的投资，否则会亏到怀疑人生。你的财运指数：⭐"},{title: "注意事项",content: "宜:克制物欲，节省开销，攒钱，努力工作在事业中获得加薪的机会，合理利用自己的人脉资源，发挥想象力，遵循自己的想法，做出具体成果。\n忌:奢侈浪费，大额投资理财，过于贪心，自负自大，赌博，透支信用卡，网络借贷，想着投机取巧，导致判断失误而造成大量钱财损失。"}])}});
                await questionResult.addCard(card13ss, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "抽到死神牌，基本可以断定今年你的财运不太理想。死神有很多象征含义，转变、新生等等，但是最主要的含义是结束、悲催。\n今年，你正财运一般，偏财运更一般，整体来看财运并不算好。想要完全结束现在这个阶段有一点困难，现阶段的拮据生活还是会延长一些时间，需要你合理清点一下以前自己的资金本钱，好好梳理手头上的资源，然后沉淀去充电一段时间关于金钱财运工作的相关知识，需要自己对自己狠心一点。你的财运指数：⭐"},{title: "注意事项",content: "宜:平时少一点吃吃喝喝的花销，对自己的金钱进行合理分配，可以分为生活必须的开支，定期储蓄及应急资金等。\n忌:贪图小便宜，欠外债，赌博，透支信用卡，网络借贷，想着投机取巧，导致判断失误而造成大量钱财损失。"}])}});
                await questionResult.addCard(card13ss1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "抽到死神牌，基本可以断定今年你的财运不太理想。死神有很多象征含义，转变、新生等等，但是最主要的含义是结束、悲催。\n今年，你正财运一般，偏财运更一般，整体来看财运并不算好，想要完全结束现在这个阶段有一点困难，现阶段的拮据生活还是会延长一些时间，需要你合理清点一下以前自己的资金本钱，好好梳理手头上的资源，然后沉淀去充电一段时间关于金钱财运工作的相关知识，需要自己对自己狠心一点。你的财运指数：⭐"},{title: "注意事项",content: "宜:平时少一点吃吃喝喝的花销，对自己的金钱进行合理分配，可以分为生活必须的开支，定期储蓄及应急资金等。\n忌:贪图小便宜，欠外债，赌博，透支信用卡，网络借贷，想着投机取巧，导致判断失误而造成大量钱财损失。"}])}});
                await questionResult.addCard(card14jz, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "节制这张牌，顾名思义，其意思是有所节制。对于大多数人而言，这意味着自我控制。对应到财运上，代表着你对金钱的掌控节制还是做的蛮好的。整体来看，今年财运不错，正财、偏财都很稳定。\n在别人看来你的收入或许并不是很高，但你却懂得知足常乐。你已经习惯了拥有这部分收入，对你而言，如果赚再多的钱，让你觉得很疲惫和劳累，那还不如乖乖地适应简单的生活。\n这张牌同时也说出了你在生活当中对金钱的看法，那就是随遇而安。不一定拥有很多财富就是幸福的，平平淡淡的生活，只要知足也够了。\n你的财运指数：⭐⭐⭐"},{title: "注意事项",content: "宜:计划经济，对自己的金钱进行合理分配，可以分为生活必须的开支，定期储蓄及应急资金等。\n忌:无节制买买买，大额消费，做投资理财，贪图小利，买彩票，做事情的任性态度，急躁不负责任，逃避承诺。"}])}});
                await questionResult.addCard(card14jz1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "节制逆位，代表着消耗、下降、走极端、疲劳、损失等。逆位的时候，财运上没有正位时候好。整体来看，今年财运无论是正财还是偏财，都一般般。你的财运指数：⭐⭐\n在别人看来你的收入或许并不是很高，但你却懂得知足常乐。你已经习惯了拥有这部分收入，对你而言，如果赚再多的钱，让你觉得很疲惫和劳累，那还不如乖乖地适应简单的生活。\n这张牌同时也说出了你在生活当中对金钱的看法，那就是随遇而安。不一定拥有很多财富就是幸福的，平平淡淡的生活，只要知足也够了。"},{title: "注意事项",content: "宜:计划经济，对自己的金钱进行合理分配，可以分为生活必须的开支，定期储蓄及应急资金等。\n忌:无节制买买买，大额消费，做投资理财，贪图小利，买彩票，做事情的任性态度，急躁不负责任，逃避承诺。"}])}});
                await questionResult.addCard(card15em, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "恶魔是一张代表物质的牌，在现今社会对物质的追求是再正常不过的事情。当看事业或者财运的时候，出现恶魔牌是一个好的征兆。这表示当事人真的很渴望、很认真努力地想要求取金钱、物质上的成功。整体来看，因为你对金钱有着超乎常人的渴望，对应到行动上，你今年的财运无论是正财还是偏财，都会不错。\n你的财运指数：⭐⭐⭐⭐\n需要注意的是，追求财富的时候要避免走火入魔，比如参与非法或不道德收入、受到不良的诱惑、结交狐朋狗友等等。"},{title: "注意事项",content: "宜:脱离财务限制、扭亏为盈、投资转型期，断绝不良关系、放弃私欲、恢复理智、人际关系有所改善。收敛自己浪费奢侈的消费习惯，正确的心态看待自己的钱财，放弃不良嗜好。\n忌:大笔开销，过于贪心，自负自大，赌博，透支信用卡，网络借贷，想着投机取巧，导致判断失误而造成大量钱财损失。"}])}});
                await questionResult.addCard(card15em1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "恶魔是一张代表物质的牌，在现今社会对物质的追求是再正常不过的事情。当看事业或者财运的时候，出现恶魔牌是一个好的征兆。这表示当事人真的很渴望、很认真努力地想要求取金钱、物质上的成功。整体来看，因为你对金钱有着超乎常人的渴望，对应到行动上，你今年的财运无论是正财还是偏财，都会不错。\n你的财运指数：⭐⭐⭐⭐\n需要注意的是，要避免用不正当的方式获取金钱，比如参与非法或不道德收入、受到不良的诱惑、结交狐朋狗友等等。"},{title: "注意事项",content: "宜:脱离财务限制、扭亏为盈、投资转型期，断绝不良关系、放弃私欲、恢复理智、人际关系有所改善。收敛自己浪费奢侈的消费习惯，正确的心态看待自己的钱财，放弃不良嗜好。\n忌:大笔开销，过于贪心，自负自大，赌博，透支信用卡，网络借贷，想着投机取巧，导致判断失误而造成大量钱财损失。"}])}});
                await questionResult.addCard(card16gt, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "高塔是塔罗牌当中的16号牌，代表着突如其来的改变、无法挽回的崩塌。是一种剧变和灾难。对应到财运上，意味着你今年会有破财的风险。\n今年的你，正财运一般，偏财运也一般，总体来说财运并不算好，容易大起大落，可能会有一些计划赶不上变化的意外钱财损失。\n这些意外是无法控制的、是突如其来的。例如: 意外收到交通违规罚单、电脑、手机或其他用品故障维修费用，亲友们或自己的意外伤害的医疗支出等等。这些额外的开销，会让你感觉到钱不够用的问题。整体来看，你的财运指数：⭐"},{title: "注意事项",content: "宜:谨慎小心，不因粗心大意而失财。最好对自己的金钱进行合理分配，可以分为生活必须的开支，定期储蓄，及应急资金等。\n忌:做投资理财，贪图小利，买彩票，做事情的任性态度，急躁不负责任，逃避承诺，大额开销，无节制买买买。"}])}});
                await questionResult.addCard(card16gt1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "高塔是塔罗牌当中的16号牌，代表着突如其来的改变、无法挽回的崩塌。是一种剧变和灾难。对应到财运上，意味着你今年会有破财的风险。\n今年的你，正财运一般，偏财运也一般，总体来说财运并不算好，容易大起大落，可能会有一些计划赶不上变化的意外钱财损失。\n这些意外是无法控制的、是突如其来的。例如: 意外收到交通违规罚单、电脑、手机或其他用品故障维修费用，亲友们或自己的意外伤害的医疗支出等等。这些额外的开销，会让你感觉到钱不够用的问题。整体来看，你的财运指数：⭐"},{title: "注意事项",content: "宜:谨慎小心，不因粗心大意而失财。最好对自己的金钱进行合理分配，可以分为生活必须的开支，定期储蓄，及应急资金等。\n忌:做投资理财，贪图小利，买彩票，做事情的任性态度，急躁不负责任，逃避承诺，大额开销，无节制买买买。"}])}});
                await questionResult.addCard(card17xx, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "星星牌是塔罗牌里的17号牌。代表着希望、愿望满足，抽到这张牌，意味着你大概率能心想事成。对应到财运上，代表着今年你财运非常旺。正财运很好，偏财运也很好，你的财运指数：⭐⭐⭐⭐⭐\n今年，你会有新的财源，凭直觉可获得意外的收入，财务上可能会有极大的转变，还会碰到理想的朋友，相辅相成的情谊也会使你获得更多的赚钱机会。你也将会有超出预期的收入，会有多余的金钱做投资理财，并从中获利。"},{title: "注意事项",content: "宜:投资理财，努力工作在事业中获得加薪的机会，合理利用自己的人脉资源，发挥想象力，遵循自己的想法，做出具体成果。\n忌:缺乏上进心，散漫的生活习惯，沉迷于享乐，与家人发生纠纷，任性，不思进取、虚荣心强、搁置计划，太奢侈，无节制的花钱。"}])}});
                await questionResult.addCard(card17xx1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "星星牌是塔罗牌里的17号牌。代表着希望、愿望满足。\n抽到正位时，意味着你大概率能心想事成。对应到财运上，代表着今年你财运非常旺。正财运很好，偏财运也很好，你的财运指数：⭐⭐⭐⭐⭐\n抽到逆位时，相对来说，会比正位时差，财运指数：⭐⭐⭐\n今年，你会有新的财源，凭直觉可获得意外的收入，财务上可能会有极大的转变，还会碰到理想的朋友，相辅相成的情谊也会使你获得更多的赚钱机会。你也将会有超出预期的收入，会有多余的金钱做投资理财，并从中获利。"},{title: "注意事项",content: "宜:投资理财，努力工作在事业中获得加薪的机会，合理利用自己的人脉资源，发挥想象力，遵循自己的想法，做出具体成果。\n忌:缺乏上进心，散漫的生活习惯，沉迷于享乐，与家人发生纠纷，任性，不思进取、虚荣心强、搁置计划，太奢侈，无节制的花钱。"}])}});
                await questionResult.addCard(card18yl, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "月亮牌代表着不安、怀疑、恐惧。抽到这张牌，意味着你很敏感、对事情保持着高度警觉和戒心，做事会犹豫不决，甚至有着想要逃避的想法。整体来说，今年你的财运不是很理想，正财运一般，偏财运也一般。你的财运指数：⭐⭐\n你是一个对金钱很没有规划的人。与此同时，你可能会经常被人欺骗，你的朋友当中有不少对你负债累累的，而他们似乎没有要还钱的意思。所以你的财运被身边的这些朋友给拖累了。\n再加上你在生活当中是一个消费意识很强的人，你喜欢的东西就恨不得第一时间买下来，这也导致你想存钱真的很难。"},{title: "注意事项",content: "宜:控制一下购买欲望，借给朋友的钱也需要在适当的时间提醒一下还钱，脚踏实地的做好手头上的事，增长自身的知识储备，对未来的发展做长远的规划，扩展优质的人脉资源。\n忌:大额投资，跟朋友合伙做生意，欺骗别人，没找好下家就辞职，盲目乐观，太过于依赖自己的直觉，不重视客观的判断，逃避责任。"}])}});
                await questionResult.addCard(card18yl1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "月亮牌代表着不安、怀疑、恐惧。抽到这张牌，意味着你很敏感、对事情保持着高度警觉和戒心，做事会犹豫不决，甚至有着想要逃避的想法。整体来说，今年你的财运不是很理想，正财运一般，偏财运也一般。你的财运指数：⭐⭐\n你是一个对金钱很没有规划的人。与此同时，你可能会经常被人欺骗，你的朋友当中有不少对你负债累累的，而他们似乎没有要还钱的意思。所以你的财运被身边的这些朋友给拖累了。\n再加上你在生活当中是一个消费意识很强的人，你喜欢的东西就恨不得第一时间买下来，这也导致你想存钱真的很难。"},{title: "注意事项",content: "宜:控制一下购买欲望，借给朋友的钱也需要在适当的时间提醒一下还钱，脚踏实地的做好手头上的事，增长自身的知识储备，对未来的发展做长远的规划，扩展优质的人脉资源。\n忌:大额投资，跟朋友合伙做生意，欺骗别人，没找好下家就辞职，盲目乐观，太过于依赖自己的直觉，不重视客观的判断，逃避责任。"}])}});
                await questionResult.addCard(card19ty, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "太阳是塔罗牌当中的19号牌，代表着阳光、快乐、正大光明等。这是一张光明面最好的牌，对应到财运上，抽到这张牌，证明结果会很不错。整体来看，今年你的财运比较不错，正财运、偏财运都很好。你的财运指数：⭐⭐⭐⭐\n今年，你大概率会储蓄增加、有意外之财，情谊地久天长，与朋友关系日渐亲密，好友增加，积极的交往能够给你带来好的运气和新的赚钱机会，幸运的标签贴在你的头顶上，你的收入大大增加。但同时你花钱的地方比较多，特别是在人际关系方面，你的花销非常大。"},{title: "注意事项",content: "宜:交朋友，维护人脉关系，谨慎小心，不因粗心大意而失财，计划经济，对自己的金钱进行合理分配，可以分为生活必须的开支，定期储蓄，及应急资金等。\n忌:奢侈浪费、因爱慕虚荣而增加开支，排挤同伴，与旧友绝交、给人消极之感、让人没有办法亲近。"}])}});
                await questionResult.addCard(card19ty1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "太阳是塔罗牌当中的19号牌，代表着阳光、快乐、正大光明等。这是一张光明面最好的牌，对应到财运上，抽到这张牌，证明结果会很不错。整体来看，今年你的财运比较不错，正财运、偏财运都很好。你的财运指数：⭐⭐⭐\n今年，你大概率会储蓄增加、有意外之财，情谊地久天长，与朋友关系日渐亲密，好友增加，积极的交往能够给你带来好的运气和新的赚钱机会，幸运的标签贴在你的头顶上，你的收入大大增加。但同时你花钱的地方比较多，特别是在人际关系方面，你的花销非常大。"},{title: "注意事项",content: "宜:交朋友，维护人脉关系，谨慎小心，不因粗心大意而失财，计划经济，对自己的金钱进行合理分配，可以分为生活必须的开支，定期储蓄，及应急资金等。\n忌:奢侈浪费、因爱慕虚荣而增加开支，排挤同伴，与旧友绝交、给人消极之感、让人没有办法亲近。"}])}});
                await questionResult.addCard(card20sp, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "审判是塔罗牌里的20号牌，它的前一张是太阳牌，后一张是世界牌，都是很不错的牌。审判处在中间位置，代表着觉醒、复活、新的开始。对应到财运上，代表着今年你的财运不算好，也不算差。你的财运指数：⭐⭐⭐\n今年，你正财运不错，偏财运一般，没有太多的收益，也没有什么太大的损失，平平淡淡。\n你个性保守，不敢冒险，所以一直守着工资，因此经济也不宽裕，好在你的生活也比较节俭，不会大手大脚，你的生活一直是收支平衡，对于你来说，最好还是想些增收的法子，不然日子有点紧巴巴。"},{title: "注意事项",content: "宜:脚踏实地的做好手头上的事，增长自身的知识储备，对未来的发展做长远的规划，扩展人脉资源，充满热情和行动力。\n忌:人云亦云，被生活的潮流推着走，漫无目标，缺乏自律，不切实际的胡思乱想，欺骗别人，日常工作或做生意时投机，买彩票，赌博。"}])}});
                await questionResult.addCard(card20sp1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "审判是塔罗牌里的20号牌，它的前一张是太阳牌，后一张是世界牌，都是很不错的牌。审判处在中间位置，代表着觉醒、复活、新的开始。对应到财运上，代表着今年你的财运不算好，也不算差。你的财运指数：⭐⭐⭐\n今年，你正财运不错，偏财运一般，没有太多的收益，也没有什么太大的损失，平平淡淡。\n你个性保守，不敢冒险，所以一直守着工资，因此经济也不宽裕，好在你的生活也比较节俭，不会大手大脚，你的生活一直是收支平衡，对于你来说，最好还是想些增收的法子，不然日子有点紧巴巴。"},{title: "注意事项",content: "宜:脚踏实地的做好手头上的事，增长自身的知识储备，对未来的发展做长远的规划，扩展人脉资源，充满热情和行动力。\n忌:人云亦云，被生活的潮流推着走，漫无目标，缺乏自律，不切实际的胡思乱想，欺骗别人，日常工作或做生意时投机，买彩票，赌博。"}])}});
                await questionResult.addCard(card21sj,  {through: {interpretation: JSON.stringify([{title: "整体财运",content: "抽到世界牌，代表着圆满、尽善尽美之意。对应到财运上，意味着今年你的财运非常不错。正财、偏财都很好。你的财运指数：⭐⭐⭐⭐\n今年你的工作业绩不错，提成、分红都会很好，也不需要偏财来支撑自己的财务了。虽然你不会突然赚大钱，但是只要有付出，都能得到相对的报酬收入，坚持可以取得成功，也能够轻松掌控着自己和周遭的事物。"},{title: "注意事项",content: "宜:克制自己的消费欲望，脚踏实地的付出努力去赚取钱财，协调好人际关系，谨慎处理钱财方面的问题。\n忌:投机取巧，贪慕虚荣，幻想赚快钱，赌场碰碰运气，对问题视而不见，多愁善感情绪化，毫无节制的消费。"}])}});
                await questionResult.addCard(card21sj1, {through: {interpretation: JSON.stringify([{title: "整体财运",content: "世界牌是塔罗牌里的21号牌，当抽到正位时，代表着圆满、尽善尽美之意。对应到财运上，意味着今年你的财运非常不错。正财、偏财都很好。你的财运指数：⭐⭐⭐⭐\n当抽到逆位时，则财运上没有正位时候好，财运指数：⭐⭐⭐\n今年你的工作业绩不错，提成、分红都还不错，也不需要偏财来支撑自己的财务了。虽然你不会突然赚大钱，但是只要有付出，都能得到相对的报酬收入，坚持可以取得成功，也能够轻松掌控着自己和周遭的事物。"},{title: "注意事项",content: "宜:克制自己的消费欲望，脚踏实地的付出努力去赚取钱财，协调好人际关系，谨慎处理钱财方面的问题。\n忌:投机取巧，贪慕虚荣，幻想赚快钱，赌场碰碰运气，对问题视而不见，多愁善感情绪化，毫无节制的消费。"}])}});


                questionResult = await groupResult.createQuestion({
                    name: "你现在的工作还值不值得坚持？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card7zc, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "该不该辞职",
                                content: "战车是塔罗牌里的7号牌，对应12星座里的巨蟹座，象征含义有挑战、旅游、胜利。/n抽到这张牌的朋友，是巨蟹座的概率还是蛮大的（注意，不是所有抽到这张牌的人都是巨蟹座）。从战车的旅游这个象征含义来看，你的工作可能会需要经常出差，跟各种人协调关系，让你感觉比较辛苦。/n你所从事的工作并不轻松，对你来说，还是有很大挑战的。与此同时，这份工作也很能锻炼你的能力，而且在优秀的团队里，发展前景也非常不错，还是值得你坚持下去的。"
                            },
                            {
                                title: "塔罗建议",
                                content: "战车在塔罗牌里除了旅游等，还代表着胜利、挑战。过程当中可能会遇到很多阻碍很困难，但是你都是具备能力去战胜困难的。建议遇到困难的时候，不要轻言放弃。你会取得很大突破和收获的！"
                            }])}});
                await questionResult.addCard(card33xb5, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "该不该辞职",
                                content: "抽到这张牌的朋友，我建议你换工作。/n" +
                                "大多数人辛苦工作无非就是为了赚钱，继续做下去。但是从这张牌来看，你大概率不仅没办法升职加薪，甚至老板正常发工资都非常困难了，公司资金严重不足，入不敷出，很难运营下去，既然赚不到钱，还是另谋出路吧。/n整体来看，目前你的财务情况很不好，而且这种情况已经有一段时间了，是时候鼓起勇气做出改变了！"
                            },
                            {
                                title: "塔罗建议",
                                content: "很多时候，选择大于努力。建议在有机会、有选择的时候，果断一些，勇敢一些，不然机会流失之后，会追悔莫及。"
                            }])}});
                await questionResult.addCard(card34xb4, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "该不该辞职",
                                content: "抽到这张牌的朋友，你的工作其实还算稳定，收入也很稳定。或许你时不时地因为一些工作上的不愉快萌生过换工作的想法，但是那大多数都是想想而已，你的性格其实满保守的。你是比较偏向于追求稳定，确定感的一类人。说简单一些，因为这种性格，在冒险的时候，你会比较缺少魄力，整体来看，很难会跳出舒适区。/n如果你并不是一个野心勃勃，不安于现状的人，那就坚持做下去吧，稳中求发展也是很不错滴！"
                            },
                            {
                                title: "塔罗建议",
                                content: "每个人工作上都会遇到不开心的事情，这个是很正常的情况，不要动不动就想着换工作，要知道生活在别处。没事多读读钱钟书的《围城》吧，或许，还有很多人羡慕你的工作呢！"
                            }])}});
                await questionResult.addCard(card35xb6, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "该不该辞职",
                                content: "抽到这张牌的朋友，你的上司应该蛮赏识你的，也有意提拔你。在你的职业生涯中能给你很多帮助和建设性意见，长远来看，你的付出和收获是成正比的。如果因为一时的不开心萌生了换工作的想法，建议克服下吧，继续在这份工作中坚持下去你能攒不少钱呢。整体来看，还是值得坚持的。"
                            },
                            {
                                title: "塔罗建议",
                                content: "每个人工作上都会遇到不开心的事情，这是很正常的情况，不要动不动就想着换工作。要知道生活在别处，没事多读读钱钟书的《围城》吧，或许，还有很多人羡慕你的工作呢！"
                            }])}});


                questionResult = await groupResult.createQuestion({
                    name: "你适合上班、创业、还是自由职业？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card15em, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "事业身份分析",
                                content: "恶魔牌是塔罗牌里的15号牌，象征含义有物质、欲望、性等。在12星座里代表着摩羯座……/n抽到这张牌，意味着你是那种天生就不甘于平凡的人。你渴望有着丰富多彩的经历，朝九晚五的生活不是你所向往的。/n你对金钱有着超乎常人的渴望，这会让你产生非常强烈的动机，努力去赚更多的钱。因此，创业做一家公司或者做生意，是非常适合你的个性的。"

                            },
                            {
                                title: "塔罗建议",
                                content: "对钱的渴望固然没错，我们都希望能成为人上人。在现在这个社会，有钱就是成功的象征之一。但是需要注意，不能跑偏，走上歪门邪道。需谨记君子爱财，取之有道。一定要规规矩矩赚干净的钱哦～"
                            }])}});
                await questionResult.addCard(card0yr, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "事业身份分析",
                                content: "愚人是塔罗牌里的0号牌，第一张牌。抽到愚人牌，代表着自由、无拘无束。/n" +
                                "你崇尚自由的性格，不希望被人束缚和限制的个性，决定了你无法过那种朝九晚六的生活，你渴望生活多姿多彩，自由随性。这也意味着，你去创业的话，成功的可能性也会很低。/n整体来看，你最适合的就是当自由之职业者。和创业或者做生意相比，赚的钱可能并不多，但是和工作相比，却自由自在多了。"
                            },
                            {
                                title: "塔罗建议",
                                content: "理想很丰满，现实很骨干。我们都渴望诗与远方，都渴望自由自在。但是又不得不考虑生存问题，建议在条件成熟之前，别冲动辞职。先做好充分准备，储备了足够的金钱或者掌握了不上班也能过的体面的赚钱技能和渠道之后，再考虑辞职做自由职业比较稳妥。"
                            }])}});
                await questionResult.addCard(card8ll, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "事业身份分析",
                                content: "力量牌是塔罗牌里的8号牌，在12星座上对应着狮子座。象征着自信、勇敢、耐心。/n抽到这张牌，意味着你的个性比较适合创业。你是一个非常自信的人，不管做什么事情，你都不会畏惧、退缩。总能信心十足的迎难而上，这是创业能够成功与否非常关键的因素之一。/n此外，你还有着非比寻常的耐心，一旦选择了创业，你就已经做好了十足的把握，不会因为一时的业务发展缓慢而气急败坏。而坚持正是创业者难能可贵的品质之一！"
                            },
                            {
                                title: "塔罗建议",
                                content: "创业除了耐心、信心之外，还有很多因素，比如行业趋势、选择的赛道等等。建议对于当下流行的东西多一些敏感。事业上要懂得变通，时时去修正自己的计划，这样通往成功的道路才会更加顺畅！此外，比较偏向于发号施令，有时候会有些固执，可以适当多听听同事或者朋友的建议。"
                            }])}});
                await questionResult.addCard(card14jz, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "事业身份分析",
                                content: "节制是塔罗牌里的14号牌，对应着12星座里的射手座……象征含义有平衡、协调等。/n抽到这张牌，意味着你并不是那么适合创业的人，虽然有时候在工作中遇到困难感到压力时，你也会萌生创业当老板的冲动，但是这些也就是想想而已，并不会真的去实行。/n创业大多数情况下是一种极端的行为，你几乎需要完全的投入进去，这就会导致生活和工作的边界被模糊化。你无法兼顾它的平衡，必然会因为工作而牺牲生活，比如没有时间陪伴家人、爱人等等，但是你的性格是想要实现各种事物的平衡状态，这和你的性格违背。因此，你并不适合创业。"
                            },
                            {
                                title: "塔罗建议",
                                content: "跟随自己的性格去做吧，人生苦短，最重要的是自己开心，不要强迫自己做自己不喜欢的事情，关键是自己不喜欢、不擅长的事情，去做了，十之八九也难以成功。安安稳稳地过好自己的小日子，也不失为一种美好。"
                            }])}});


                questionResult = await groupResult.createQuestion({
                    name: "是否能够顺利找到工作，入职新公司？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card7zc, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "工作运势分析",
                                content: "战车是塔罗里的7号牌，意味着自律、掌控和胜利。对应着12星座里的巨蟹座……/n抽到这张牌的朋友，你应该是一个对任何事情都很有掌控和把握的人。在感情中，你属于那种没有十足把握不会轻易开口的人，你的不服输，或者天生就要成为胜利者的个性驱使着你不能失败。/n在事业上，抽到这张牌，代表着你在求职换工作的过程中，并不是一帆风顺，会遇到这样那样的阻碍和坎坷，比如说领导死活不放，比如说hr因为失误把简历漏了等等状况。但是你一旦选定了方向，做了决定，就是那种不达目的不罢休的类型。你这种勇往直前的个性决定了即使会遇到阻碍和苦难，最终你都会战胜它们，取得胜利！"

                            },
                            {
                                title: "塔罗建议",
                                content: "从这牌来看，虽然过程有些不顺利，但是你找到心仪工作，成功入职的概率很大。你的能力很强，但是在处事上有时候不太圆滑，过于耿直，刚强。建议可以学着适当圆滑一些，可能对达成目标更有帮助哦～"
                            }])}});
                await questionResult.addCard(card36bj3, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "工作运势分析",
                                content: "宝剑三给人的感觉很触目惊心。三把宝剑直插到心里。意思很明显，代表着伤心、心碎、悲伤、失落等。/n" +
                                "抽到这张牌，意味着你可能找了很久的工作，但是基于这样那样的原因，始终没有确定下来。心仪的公司看不上自己，被录取的公司又不是自己喜欢的，或者说是薪水很低很低的公司，再或者是距离非常远。/n整体来看，你近期找到理想工作的概率偏低。"
                            },
                            {
                                title: "塔罗建议",
                                content: "天无绝人之路，建议仔细问问自己，最想要的是什么？自己的优势是什么？即使心急，也不要盲目投递简历，在面试前可以仔细了解下自己所投递的岗位和自己是否匹配。这样才能增加被录取的概率。不然即使暂时找到了一份工作，不喜欢、不合适的话，也呆不长，对自己和公司都是一种耽误和浪费。"
                            }])}});
                await questionResult.addCard(card37qz7, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "工作运势分析",
                                content: "抽到这张牌，意味着你在求职的过程中遇到了不少的竞争者。目前可能正处在面试官让你回家等回复的状态，你心里很忐忑，不知道会不会被录取。甚至想过要放弃，再去投递新的公司。/n其实，事情没有你想的那么糟糕，你只是太心急了。整体来看，你目前在众多应聘者当中还是很有优势的，你被录取的可能性很高！"
                            },
                            {
                                title: "塔罗建议",
                                content: "从牌面来看，你虽然遇到了不少的挑战，但是呢，你是处于一个有利的位置，也就是说，目前并没有出现比你更合适的人选。坚持下去，对自己有信心一些，相信要不了多久，你很可能就会收到正式的offer。"
                            }])}});
                await questionResult.addCard(card5jh, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "工作运势分析",
                                content: "教皇是塔罗牌里的5号牌，代表着贵人、教导的意思。对应着12星座里的金牛座……/n抽到这张牌，意味着你会遇到贵人帮助，可能是你曾经的某位领导，或者朋友刚好认识你现在面试的公司的管理者。给你做了背书和介绍。/n整体来看，你找到工作、成功入职的机会还是很大的。这主要得力于你一直以来的好人缘！"
                            },
                            {
                                title: "塔罗建议",
                                content: "抽到这张牌，提醒着我们，遇到问题的时候，要善于寻求朋友们的帮助，有可能你朋友圈里就躺着某位贵人，而你却不知道找他帮助。岂不是很可惜。快快把自己的人脉资源利用起来吧～"
                            }])}});



                questionResult = await groupResult.createQuestion({
                    name: "该继续留在大城市还是回家乡发展？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card7zc, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "大城市还是小城市",
                                content: "战车是塔罗里的7号牌，意味着自律、掌控和胜利。对应着12星座里的巨蟹座……/n或许你已经在大城市闯荡有一些时间了，也或许你是刚来大城市不久，不管是哪种情况，目前的你对自己的状态并不是太满意。可能是事业上，还没有取得足够的成就，也可能是感情上，一直孤单一人。/n可能在生病或者某些特殊的时刻，你曾动摇过要不要回家乡发展的念头，但是，过不了多久你又会信心满满，对未来充满斗志和憧憬。/n整体来看，你其实更偏向于继续留在大城市闯荡。"

                            },
                            {
                                title: "塔罗建议",
                                content: "你是一个不甘于平庸的人，也是不能接受自己不闯出名堂灰溜溜回家发展的人。你渴望功成名就，给了自己很大的压力。建议不要太着急，只要坚持下去，终会成功的！"
                            }])}});
                await questionResult.addCard(card38bj6, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "大城市还是小城市",
                                content: "宝剑六这张牌，整体上透露着淡淡的忧伤。/n" +
                                "抽到这张牌，如果你已经结婚生子了，代表着你可能拖家带口的在北京等大城市发展，囿于很多的现实条件，比如小孩的上学问题、大城市户口问题、高额的房租问题，等等。最终你还是决定回家乡发展，整个的状态是一种不甘但是又无可奈何的情况。/n如果你是单身，或者有伴侣的状态，抽到这张牌也代表着你回家乡发展的可能性很大。而其中的原因，多少是有些不甘的。"
                            },
                            {
                                title: "塔罗建议",
                                content: "其实不必悲观，就像好的学校也有差的专业，差的学校也有好的专业一样。大城市小城市并不重要，重要的是自己在做什么，最实际的还是要看自己是否能找到自己喜欢的，更擅长的事情。从这张牌来看，回到家乡之后，你的发展会逐渐变好呢。"
                            }])}});
                await questionResult.addCard(card39qz10, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "大城市还是小城市",
                                content: "权杖十是一张寓意比较明显的牌，最明显的含义就是累、鸭梨山大、苦苦坚持。/n抽到这张牌，代表着你目前在大城市过的很艰辛，工作累成狗，起早贪黑，已经快要hold不住的状态了。/n从这张牌来看，目前的你还在苦苦坚持，但是到底能坚持多久，还是个未知数。因此，你到底是坚持留在大城市，还是小城市还得取决于你后续的发展来定。"
                            },
                            {
                                title: "塔罗建议",
                                content: "身体是革命的本钱，建议还是要多多注意身体健康。年轻的时候是应该拼搏，但是毕竟人不是机器，无法每天24小时不停的运转。适当的休息是为了更好的工作！不要再给自己那么大的压力啦！"
                            }])}});
                await questionResult.addCard(card0yr, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "大城市还是小城市",
                                content: "愚人是塔罗牌里的0号牌，意思是冒险、自由、天真。/n抽到这张牌，代表着不管是大城市还是小城市，对于你而言并没有本质的区别。你更在意的是自己的心情，更在意的是自己从事的是什么工作，或者自己与谁在一起。整体来看，这个问题对你来说，完全不算个问题。"
                            },
                            {
                                title: "塔罗建议",
                                content: "大城市有大城市的好，小城市也有城市的味道。建议选择的时候，多纳入一些现实的元素进来，多多考量。不要太过随性哦。"
                            }])}});


                questionResult = await groupResult.createQuestion({
                    name: "近期生意怎么样，能赚到更多钱吗？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card40sb2, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "生意发展趋势",
                                content: "圣杯二在事业和财运上是一张非常不错的牌。从面上可以看到，两个人正在举杯相庆。/n抽到这张牌，代表着你的生意会因为一些合作关系带来更多的客源和买家，也可能是你刚和别人签订了一份大单。或者你突然之间获得了一个很好的渠道，带来了很多的流量，还有可能是你通过他人掌握了一个新的方法……/n总之，因为合作等关系的影响，你接下来一段时间的业务发展会很不错。"

                            },
                            {
                                title: "塔罗建议",
                                content: "你需要努力建立更多的合作关系，每一个合作伙伴都有可能是你生意或者事业上的贵人，能给你的业务带来很大的影响和帮助。"
                            }])}});
                await questionResult.addCard(card25qz6, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "生意发展趋势",
                                content: "权杖六在塔罗牌里代表的意思是胜利、好消息、事情取得突破性进展。/n" +
                                "抽到这张牌的朋友，恭喜你，你接下来的业务将会发展得很顺利，有可能会签下很多单子，也有可能遇到贵人，给到你帮助。赚钱的能力和速度都会越来越强！"
                            },
                            {
                                title: "塔罗建议",
                                content: "虽然生意会越来越火爆，迎来新的突破。但是切记不能松懈哦。尤其要做好长期规划，一时的赚钱还不够，一定要找的或者寻求到能长期赚钱的模式。形成正向增长才好！"
                            }])}});
                await questionResult.addCard(card16gt, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "生意发展趋势",
                                content: "高塔是塔罗里的16号牌，意思是不好的变化、破坏、灾难。/n抽到这张牌，很遗憾的告诉你，你近期的生意可能会遭遇到一些突如其来、不好的变化。会因为一些外部条件等因素的影响，反而不如从前。而且一般来说，这种变化不是你所能左右的。来的比较突然，也比较不受控制。"
                            },
                            {
                                title: "塔罗建议",
                                content: "做生意也好，创业也罢，总是会遇到各种糟心的事情，这是大多数人都会遇到的情况。建议不要气馁，别太伤心，郁闷。唯一能做的，就是积极想办法去应对，要知道，杀不死我们的，终将使我们变得更强大！"
            }])}});
                await questionResult.addCard(card41xb8, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "生意发展趋势",
                                content: "星币八是土元素，和金钱物质有关。抽到这张牌，意味着你接下来的生意发展还不错，不管你是做微商也好，还是自己开店也罢，你接下来应该能赚到不少的钱。但是呢，这些钱赚的并不容易，都是你起早贪黑，拼命工作赚来的！/n"
                            },
                            {
                                title: "塔罗建议",
                                content: "赚钱固然重要，但是也要适当的给自己放一下假，毕竟钱是赚不完的。偶尔还是要兼顾下自己的生活和身体的。赚钱的意义不正是为了更好的生活吗？千万不要忙着赚钱而忘记了目的……"
                            }])}});


                questionResult = await groupResult.createQuestion({
                    name: "你今年的贵人运怎么样？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card42qzwh, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "贵人运分析",
                                content: "抽到这张牌，意味着你的贵人大概率是一名女性。/n权杖王后对应的星座是白羊座，你可以多多留意身边白羊座的朋友，很有可能就是你的贵人哦。/n因为权杖王后在四元素中代表火元素，意味着你的贵人应该是一名性格开朗，待人慷慨亲切的女性。如果你是一名职场新人的话，她很有可能是你的上司，她精明强干，不仅能够给你指引方向，还会手把手带你实践，跟着她你能增长不少见识和本事！"

                            },
                            {
                                title: "塔罗建议",
                                content: "不是谁都愿意帮助的，扶不起的阿斗没人愿意提携。建议要加强自身的能力，勤奋踏实，并懂得感恩。当领导或者同事看到你身上的闪光点或者潜力股时，你的贵人运也就来了。"
                            }])}});
                await questionResult.addCard(card5jh, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "贵人运分析",
                                content: "教皇是塔罗牌里的5号牌，本身就有贵人的含义在里面。抽到这张牌，代表着你今年的贵人运会非常不错。/n" +
                                "从这张牌来看，你的贵人应该是家里的长辈或者职场上的领导，甚至可能不止一位，不管是给你介绍合适的相亲对象的叔叔阿姨也好，还是在职场上给到你提携的领导也好，都有可能是你的贵人哦。/n此外，教皇代表的星座是金牛座，你要多留意自己身边金牛座的朋友，ta极有可能就是你的贵人哦。"
                            },
                            {
                                title: "塔罗建议",
                                content: "贵人不是谁都愿意帮助的，扶不起的阿斗没人愿意提携。建议要加强自身的能力，勤奋踏实，并懂得感恩。当领导或者同事看到你身上的闪光点或者潜力股时，你的贵人运也就来了。"
                            }])}});
                await questionResult.addCard(card9ys, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "贵人运分析",
                                content: "隐士是塔罗牌里的9号牌，对应的星座是处女座。你可以关注下身边有没有处女座的朋友，ta很有可能就是你的贵人哦。而且大概率是一名男性。/n这位贵人并不是财富上能给你提供赚钱机会，或者事业上能给你提供升迁途径的人，ta对你的帮助更多的是在内在的成长和指导上，就像牌面的老人一样，他手里的灯，会指引你获得心灵上的成长。"
                            },
                            {
                                title: "塔罗建议",
                                content: "成功分为世俗的成功和非世俗的成功，一定要注意区分和辨别。很多人对我们来说是真正的贵人，然而我们却没有足够的重视和感谢。出现这张牌，提醒着你，要多多关注自己内心的成长！"
                            }])}});
                await questionResult.addCard(card43bjgw, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "贵人运分析",
                                content: "抽到宝剑国王，代表着你今年贵人运还不错，你很有可能会遇到一位比自己年长的人。/n他很有可能是你职场上的领导。你可以从他身上学到很多专业的知识，你的能力将会在他的帮助提携下取得快速的提升，如果刚好有一个好的项目之类的，你极有可能会从中脱颖而出，做出很大的成绩，最终取得职场上的跃迁和个人成长上的飞速发展。"
                            },
                            {
                                title: "塔罗建议",
                                content: "贵人不是谁都愿意帮助的，扶不起的阿斗没人愿意提携。建议要加强自身的能力，勤奋踏实，并懂得感恩。当领导或者同事看到你身上的闪光点或者潜力股时，你的贵人运也就来了。"
                            }])}});




                groupInstance = {
                    name: "自我探索",
                    image: "/tarot1/question_group.jpg"
                };
                groupResult = await questionGroup.create(groupInstance);

                questionResult = await groupResult.createQuestion({
                    name: "你在哪方面的天赋最高？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card44bjsc, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "天赋分析",
                                content: "抽到这张牌的朋友，打探能力是你最厉害的天赋。你很聪明，也很会分析事态，生活中决定走的每一步都会事先经过打探，虽然有时候会显得机关算尽，但不可否认你的打探能力确实十分出众。"
                            },
                            {
                                title: "塔罗建议",
                                content: "整体来看，你拥有追根究底的精神，如果把这样的精力放在研究上，你将获得不错的成就。如果用在刺探八卦娱乐上，则显得很是可惜……"
                            }])}});
                await questionResult.addCard(card45sbqs, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "天赋分析",
                                content: "抽到这张牌的朋友，艺术头脑是你最厉害的天赋。你是一个魅力十足的梦想家，有着丰富的想象力，创意满满。你的多才多艺也成为了自身的闪光点，陌生异性在初次见你时很容易会被你吸引。你就是传说中最浪漫的情人，魅力十足。"
                            },
                            {
                                title: "塔罗建议",
                                content: "需要注意的是，你的行动力可能不太充足。如何脚踏实地，努力把理想变成现实是于你而言最大的挑战！"
                            }])}});
                await questionResult.addCard(card46xbwh, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "天赋分析",
                                content: "抽到这张牌的朋友，经商头脑是你最厉害的天赋。你对金钱的敏感度很高，但你并非那种光想得到却又不付出努力的人，你踏实勤奋，能够运用生意头脑给自己带来庞大的财富。"
                            },
                            {
                                title: "塔罗建议",
                                content: "作为一个勤奋踏实的女性，你在工作上比较拼，建议多多注意身体。毕竟身体是革命的本钱，良好的经商头脑＋健康的身体才是王道！"
                            }])}});
                await questionResult.addCard(card11zy, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "天赋分析",
                                content: "正义是塔罗牌里的11号牌，在12星座里代表着天秤座。/n抽到这张牌的朋友，判断力是你最厉害的天赋。你是一个善于用理性逻辑思考问题的人，你追求公平与正义，在与人讨论同一件事情时，即便所有说法都一边倒，但你也不会受他人影响而心存偏见。"
                            },
                            {
                                title: "塔罗建议",
                                content: "你公正而厚道，富有责任心，判断力奇准。建议从事法务类的职业，是一位能为他人伸张正义的使者。"
                            }])}});


                questionResult = await groupResult.createQuestion({
                    name: "你性格中最大的缺点是什么？ ",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card31bjqs, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "性格缺点分析",
                                content: "宝剑骑士正位，在塔罗牌里代表着强势、狂放、急躁及言行不一的含义。/n选到这张牌的朋友，可谓是妥妥的急性子一个。做事情不太会三思而后行，容易走极端，经常会莽撞行事，毫不考虑后果，因为脾气不是很好，比较容易和他人产生冲突，导致人缘并不是很好。其实，你的心地很单纯、善良，但是总因为急性子而吃亏。/n此外，宝剑骑士虽然爆发力很强，但是缺少了持久力和忍耐力，很多事情到最后便不了了之了。"

                            },
                            {
                                title: "塔罗建议",
                                content: "建议在为人处世当中，适当收敛自己的脾气，遇到事情的时候，先深呼吸，冷静下来，仔细思考下如何处理才是最聪明的做法。要知道急躁是解决不了问题的，一时的冲动非但对事情没有帮助，反而还会败坏人缘，最终吃了性格的亏。"
                            }])}});
                await questionResult.addCard(card47sb7, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "性格缺点分析",
                                content: "圣杯七正位，在塔罗牌里代表着想象、梦境、选择以及幻想。/n" +
                                "抽到这张牌的朋友，你最大的性格缺点是不切实际、幻想过多。比如在做一件事或一项工作之前，你总是对其抱有无限憧憬，认为前景大好，却不会多作分析调研，但凭感觉做事，到最后得到的结果往往不如人意。/n此外，出现这张牌，还代表着你是一个没太有主见的人，遇到选择的时候，非常纠结犹豫，不知道该如何选择。"
                            },
                            {
                                title: "塔罗建议",
                                content: "出现这张牌，提醒着我们，眼前的一切可能只是自己虚拟的想象而已。要能够擦亮眼睛，分得清事实的真相。尤其是在爱情中，出现这张牌，代表着这只不过是一厢情愿的白日梦而已。需要能够及时警醒，抽身出来。"
                            }])}});
                await questionResult.addCard(card48bj2, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "性格缺点分析",
                                content: "宝剑二正位，在塔罗牌里代表的意思是逃避、抗拒、对立、僵局、紧张。/n抽到这张牌的朋友，你最大的性格缺点是容易逃避。当遇上棘手的难题时，有时候并非你自身能力不足以解决，而是你害怕面对问题，宁愿采取逃避的方式，也不愿意直面问题。/n你就像一个鸵鸟一样，把自己埋在沙子里，试图装作视而不见，就像牌面的女子一样，以为矇上双眼，好像困难就不存在一样。"
                            },
                            {
                                title: "塔罗建议",
                                content: "遇到问题的时候，你只是下意识的觉得自己不足以胜任和解决。实际上，你完全具备解决问题的能力。建议每次遇到难题时，多给自己打打气，勇敢地去面对，久而久之，逃避的习惯就会得以改善。"
                            }])}});
                await questionResult.addCard(card8ll1, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "性格缺点分析",
                                content: "抽到这张牌的朋友，你最大的性格缺点就是不够自信，你是那种容易妄自菲薄的人，明明自己完全OK，朋友们也觉得你很合适的事情，你自己却始终觉得不行。这会导致，你经常错失一些本该属于自己的东西。/n在爱情上，你时常会觉得自己配不上对方，会为自己的一点点小瑕疵就感到自卑；在工作上，你经常会觉得自己无法胜任某一项事情……/n此外，除了不够自信之外。你做事情还经常会感到莫名其妙的恐惧，以及很多时候会缺乏耐心。"
                            },
                            {
                                title: "塔罗建议",
                                content: "我们都会对很多事情产生恐惧，很多时候，还没去做，就担心这担心那。实际上，这完全是庸人自扰。/n你需要做的就是重塑自己的信心，建议可以准备一本本子，每次成功完成一件事情，就记录下来，可以先从简单的事情开始记录起来。遇到新的难题的时候，就翻翻自己的日记，告诉自己，“你看，我已经解决了这么多难题，这次也一定可以的！”"

            }])}});



                questionResult = await groupResult.createQuestion({
                    name: "你最让男性着迷的特质是什么？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card19ty, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "性格特质分析",
                                content: "太阳是塔罗牌里的19号牌，抽到这张牌的朋友，代表你给对方最大的感觉就是你是一个非常单纯、天真的人，就像牌面上的小孩一样，给人无邪的感觉。你的这种不掺杂任何杂质的性格是你最让异性着迷的特质。/n或许是你天生就长了一张像孩子般可爱的脸，或许是你灿烂的笑容，也可能是你在生活中的言谈举止，都让对方感受到你自然而然的纯真。所以尽情的去展现你的纯真就能够吸引到对方。"
                            },
                            {
                                title: "塔罗建议",
                                content: "单纯不是幼稚，不是傻白甜，不是对什么都不太懂，单纯是一种与生俱来的性格。和年龄没有关系，单纯的人做事情也可以很干练专业。生活中一定要记得区分哦。"
                            }])}});
                await questionResult.addCard(card3nh, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "性格特质分析",
                                content: "女皇是塔罗牌里的4号牌，抽到这张牌的朋友，你是一个非常爱美的人，在生活中应该很喜欢打扮自己。你性格活泼开朗，对生活充满热情。对身边的人，家人啦、朋友啦，总是不吝啬付出爱和关怀。/n" +
                                "在异性眼里，你最大的特质就是你的美貌和气质。就像牌面上的皇后，高高在上女王一样的外表下，还拥有一种热情，这种女性特有的魅力让你非常吸引对方。"
                            },
                            {
                                title: "塔罗建议",
                                content: "和女祭司在塔罗牌里代表理性不一样，女皇代表着感性。建议面对感情问题的时候，可以适当加入一些理性层面的考量，而不是一味地用自己的感性去做选择和判断。"
                            }])}});
                await questionResult.addCard(card49bjwh, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "性格特质分析",
                                content: "抽到这张牌的朋友，代表你是一个独立、睿智、成熟的女人，你对所有事情都有非常清晰的规划，时刻保持内心的坚定，而不是像个小女孩一样需要别人照顾。所以你的这种性格是吸引对方的一个非常大的特质。"
                            },
                            {
                                title: "塔罗建议",
                                content: "宝剑王后是四位王后（圣杯王后、权杖王后、星币王后）当中最理智冷静的一位，在感情中不轻易流露感情，时常会给人冷若冰霜，不好接近的感觉。建议可以适当的对人表示一些热情，学着亲和一些。对于自己的异性缘会有很大帮助哦。"
                            }])}});
                await questionResult.addCard(card8ll, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "性格特质分析",
                                content: "力量是塔罗牌里的8号牌，在12星座上代表着狮子座。/n抽到这张牌的朋友，代表你最吸引对方的特质就是你的内心有一股很强大的力量，这种力量是女性特有的温柔，你用这个力量去包容他，化解对方的不良情绪，包括愤怒、悲伤，时刻让对方感受到强烈的温暖，这是你最让对方着迷的地方。"
                            },
                            {
                                title: "塔罗建议",
                                content: "在一段关系当中，如果抽到力量牌，图中的狮子就代表着男性。从牌上来看，女子处于主导地位。狮子（男子）处于被驯服的状态，当然这并不是通过武力达成，看得出来男方也比较心甘情愿。建议女方要掌握好度，可以适当强势一些，但不能太过哦。"

                            }])}});


                questionResult = await groupResult.createQuestion({
                    name: "你在爱情中最容易犯哪些错误？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card44bjsc, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "最容易犯的错",
                                content: "抽到这张牌的朋友，你在爱情中最容易犯的错误就是想太多，时常陷入到自己的臆想中，包含对对方的一些怀疑、猜测和不信任，而且自我的防备心很强，你就像一个侦探一样不断的去探求，以来寻找一些线索。所以呢，很容易给对方带来压力，并且让ta对你的行为产生反感。/n"
                            },
                            {
                                title: "塔罗建议",
                                content: "如果爱情缺少了信任，就像缺少了地基的房屋一样，坍塌是必然的结局。很多美好的爱情都是毁于胡思幻想，建议多把精力放在一些更有意义的事情上，不忙的时候，不要总是在爱情上胡思乱想。既然在一起，就要相信对方！"
                            }])}});
                await questionResult.addCard(card11zy, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "最容易犯的错",
                                content: "正义是塔罗牌里的11号牌，在12星座当中代表着天秤座。/n" +
                                "抽到这张牌的朋友，你在爱情中最容易犯的错误就是太计较，就像拿着一个天平不停的测量，在这段感情中你们各自付出了多少，收获了多少，天平一旦有些倾斜，你就会想要让对方加码以来保持这个天平的平衡。这些行为会让你们的感情变得像一场交易，缺少了爱情的纯粹。"
                            },
                            {
                                title: "塔罗建议",
                                content: "爱情注定是无法公平的，因为这不是做买卖。如果过于渴求凡事都得平等，那你们的关系早晚要完蛋。爱情不是一味的付出，也不是一味的计较。建议仔细学习下如何掌握其中的度。不要走极端哦！"
                            }])}});
                await questionResult.addCard(card2njs, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "最容易犯的错",
                                content: "女祭司是塔罗牌里的3号牌，抽到这张牌的朋友，你在爱情中最容易犯的错误就是不爱表达，很多话，很多事情总喜欢憋在心里不说，总希望对方能够揣测你的想法，而自己则一直处于观察者的姿态。这会让对方感觉你是一个很冷漠很难相处的人。"
                            },
                            {
                                title: "塔罗建议",
                                content: "建议要适当敞开心扉，多和对方表达、沟通。爱情毕竟是感情的东西，如果太过于理性，会给人距离感，觉得不好亲近哦。"
                            }])}});
                await questionResult.addCard(card31bjqs, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "最容易犯的错",
                                content: "宝剑骑士正位，代表的含义是急性子，脾气容易暴躁、走极端。做事情没有耐心。/n抽到这张牌的朋友，意味着你在爱情中经常处于一个强势的姿态，性格过于急躁，经常因为一时冲动就用过激的言语去攻击对方。"
                            },
                            {
                                title: "塔罗建议",
                                content: "建议在遇到事情的时候，不要第一时间就把不冷静的想法和过激的语言表达出来，先让自己沉下心，冷静后再和对方好好沟通。"

                            }])}});


                questionResult = await groupResult.createQuestion({
                    name: "你在爱情中的出轨指数是多少？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card11zy, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "出轨指数分析",
                                content: "正义是塔罗牌里的11号牌，对应着12星座中的天秤座。/n抽到这张牌，意味着你是一个非常讲原则的人，内心有着自己的道德标准。/n出轨在你看来是非常违背伦理道德的事情，你的理性和道德决定了即使你面对着一些诱惑，你也能像柳下惠一样，在关键时刻把持住。并不是说你完全不爱美色或者小鲜肉，而是你心里有一个道德准绳，始终无法跨过和逾越。/n对于你来说，你在你和一方确定了关系的时候，你几乎就不会再和第三者产生暧昧不清的关系。你的出轨指数少之又少！"
                            },
                            {
                                title: "塔罗建议",
                                content: "正因为有着过高的道德要求，绝对不会允许自己出轨。但凡看到身边的人，或者微博热搜又爆出某某公众人物出轨的时候，你常常会按耐不住想要去狠狠批判斥责一翻，甚至因此被气得影响整个人的心情。建议换个角度看看，自己犯不上为这些事情操心生气，做好自己就行，其它人的事，就随他们吧。"
                            }])}});
                await questionResult.addCard(card6lr, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "出轨指数分析",
                                content: "恋人是塔罗牌里的6号牌，对应着12星座中的双子座。/n" +
                                "抽到这张牌的朋友，你的出轨指数非常低。恋人这张牌是塔罗牌里代表爱情最好的一张牌，代表着感情和谐、美满，是世人所羡慕的情侣和爱情。/n你之所以不会出轨，并不是因为外面没有诱惑，也不是因为你不为美色所动。而是因为你对现在的另一半爱的足够深沉，你们是有着长远规划，甚至是要考虑结婚的人，怎么可能会做出对不起另外一半的事情呢？"
                            },
                            {
                                title: "塔罗建议",
                                content: "虽然爱的很深，出轨的代价很大，从各个角度来说出轨的可能性都很低。但是还是要注意杜绝诱惑，努力将这种可能性降到最低比较好！"
                            }])}});
                await questionResult.addCard(card28sb3, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "出轨指数分析",
                                content: "圣杯三单单从牌面来看，是一张欢庆的牌，如果出现在事业问题上，或者财运问题上，意思是很好的。代表着成功和欢乐。但是，当出现在感情中……则代表着有第三者的出现。感情是两个人的事情，出现第三者，不必说，你将会脚踏两只船，出轨概率非常之高！"
                            },
                            {
                                title: "塔罗建议",
                                content: "建议面对诱惑的时候，还是多考虑考虑下代价，就像每次购物的时候，要考虑下还信用卡时的痛苦，千万不要抱着侥幸的心理。要知道，纸是包不住火的。你出轨了，被发现的可能性会超乎你的想象！"
                            }])}});
                await questionResult.addCard(card15em, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "出轨指数分析",
                                content: "恶魔是塔罗牌里的15号牌，是恋人牌的变形（1+5=6，6号牌刚好是恋人牌）。/n抽到这张牌，代表着你的出轨指数是百分之70以上。恶魔是一张代表着欲望、感官享乐的牌。或许你一直有着“人生苦短、及时行乐”的价值观吧。正如奥斯卡王尔德的名言所说，“除了诱惑，我什么都能抵抗”，在诱惑面前，你毫无抵抗力。因此，出轨指数相当高！"
            },
                {
                    title: "塔罗建议",
                        content: "针对你这种对诱惑毫无免疫力的人来说，要避免出轨，最好的办法就是彻底杜绝诱惑源。把精力多花在赚钱工作上，别每天饱暖思淫欲！"
                }])}});



                questionResult = await groupResult.createQuestion({
                    name: "你的人物属性是什么？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card0yr, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "人物属性分析",
                                content: "愚人是塔罗牌里的0号牌，抽到这张牌的朋友，你的人物属性是“随性人”。你向来是一个自由惯的人，比较喜欢自由自在、随心所欲的生活，不喜欢被束缚。/n在你看来，过日子，开心是一天，不开心也是一天。因此，虽然你这辈子功成名就的可能性不大，但却过得比谁都开心。"
                            },
                            {
                                title: "塔罗建议",
                                content: "法国作家卢梭有句名言，“我们生来自由，却无往不在枷锁当中”。其实，绝对的自由是不存在的，追求随性自由无可厚非，但是切勿把自由想的太理想化。有条件的自由，或许才是幸福的真谛！"
            }])}});
                await questionResult.addCard(card2njs, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "人物属性分析",
                                content: "女祭司是塔罗牌里的2号牌，抽到这张牌的朋友，你的人物属性是「理性人」。/n" +
                                "你是一个很有规划的人，从不允许自己的人生出现太大的意外。无论做什么事情，总要先评估一番。在谈恋爱时也是如此，分析利弊，解决根本问题，加强沟通，不会让情绪牵着自己走。因此，和你不熟悉的人经常会觉得你高冷，甚至有些不近人情。"
                            },
                            {
                                title: "塔罗建议",
                                content: "理性是一种难得的品质，但是需要看场合，在人际交往尤其是两性关系当中，建议适当卸下高冷的状态，不然会给人拒人于千里之外的感觉，会导致人缘上受到影响。"
                            }])}});
                await questionResult.addCard(card3nh, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "人物属性分析",
                                content: "皇后是塔罗牌里的3号牌，抽到这张牌的朋友，你的人物属性是「感性人」。/n你是一个热情主动的人，喜欢美好的事物，对长得不好看的人或物向来没有太大的印象。你容易受人影响，做事情时注意力经常很难集中。/n你敏感多情，极容易坠入爱河。为人处事比较情绪化，总爱跟着自己当下的感觉走，不懂得或不愿意花时间去规划自己的人生。因此，你的爱情之路注定比较坎坷。"
                            },
                            {
                                title: "塔罗建议",
                                content: "外貌主义、情绪化……感性是把双刃剑，需要使用得当才会为我们所用。建议在凡事凭感觉而定的行为模式下，适当加入理性的思考，会对自己更有助益哦。"
                            }])}});
                await questionResult.addCard(card14jz, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "人物属性分析",
                                content: "节制是塔罗牌里的14号牌，在12星座中代表着射手座。/n抽到这张牌的朋友，你的人物属性是「中性人」。/n你向来明白枪打出头鸟的道理。所以为人处事从不展现自己的锋芒，即使能力不错，也不会主动揽下事情。不求有功，但求无过是你的人生哲学。"
                            },
                            {
                                title: "塔罗建议",
                                content: "过于中庸的行事作风，注定自己难以出人头地。很多时候，该展示自己的时候，就需要勇敢地站出来。就像谈恋爱一样，大多数爱情都是以分手告终，但是如果再次选择的话，相信很多人还是会选择在一起。毕竟，过程也很美丽。一味的担心这担心那，没有行动，一切都是枉然。"
                            }])}});



                questionResult = await groupResult.createQuestion({
                    name: "你最适合和哪些星座谈恋爱？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card6lr, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "适合的星座",
                                content: "恋人是塔罗牌里的6号牌，对应到12星座中的双子座。/n恋人正位时候的含义是快乐、和谐、合作以及吸引力。抽到这张牌的朋友，你容易和双子座、天秤座、水瓶座谈恋爱。/n你是一个注重精神恋爱多于肉体恋爱的人，你希望自己的伴侣能与你思想契合、三观一致，希望你们是因为爱情而走到一起的。/n你讨厌刚愎自用的偏执性格，也讨厌不讲道理的吵闹。因此，追求和谐自由且性格明朗的风象星座最能够吸引你。/n双子、天秤和水瓶都有着风象飘忽不定的特性，他们的共通点是人缘好，富有幽默感，跟风象在一起你永远不必担心生活太无聊。"
                            },
                            {
                                title: "塔罗建议",
                                content: "在爱情中风象星座看重灵性的结合，性子也真的像风一样，不会束缚你，愿意给你私人空间。这些特性都是你喜欢的，所以你和风象星座比较容易恋爱。谈恋爱之前，记得先了解下对方的星座哦～"
                            }])}});
                await questionResult.addCard(card18yl, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "适合的星座",
                                content: "月亮是塔罗牌里的18号牌，对应着12星座中的双鱼座。月亮正位的含义是敏感、不安以及白日梦。/n" +
                                "抽到这张牌的朋友，你容易和双鱼座、天蝎座、巨蟹座谈恋爱。/n在爱情里你的性格比较敏感，容易患得患失，你需要伴侣给你百分百的安全感，时刻让你感觉被爱包围，你才能抚平内心的不安。/n双鱼、天蝎和巨蟹同属水象星座，水象星座的共通点是爱情至上，他们非常深情，为了伴侣可以牺牲所有，事无巨细都能让伴侣感觉到自己倍受重视。"
                            },
                            {
                                title: "塔罗建议",
                                content: "水象星座魅力十足，也是浪漫的代表，调情很有一套，在语言行为上都很懂得撩人。这些星座对你有很大的吸引力，要是和他们恋爱，你的日子也会过得甜蜜不已。"
                            }])}});
                await questionResult.addCard(card21sj, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "适合的星座",
                                content: "世界是塔罗牌里的21号牌，正位时候的含义是完整、稳固、美好的结局。/n抽到这张牌的朋友，你容易和金牛座、处女座、摩羯座谈恋爱。/n你的性格算是比较佛系，对人对事都不喜欢强求，也没有过高的梦想追求，你不会让自己活得太忙碌，安逸舒适地过活才是你的理想状态。/n可另一方面，你又是一个特别有韧劲的人，一旦有了自己的目标，哪怕撞得头破血流你也会用尽全力去将其实现。/n正是因为你身上有这些特点，所以你也会比较欣赏这类性格的人。但若要得到你的青睐，对方还必须比你成熟稳重，才能在生活中与你足够配合。"
                            },
                            {
                                title: "塔罗建议",
                                content: "金牛、处女、摩羯这三个土象星座都比较沉稳内敛，思维缜密，做事总能考虑周全，对于爱情向往细水长流而拒绝轰轰烈烈，是最容易和你擦出爱情火花的星座。"
                            }])}});
                await questionResult.addCard(card19ty, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "适合的星座",
                                content: "太阳是塔罗牌里19号牌，太阳正位时候的含义是光明、成功以及充满力量。/n抽到这张牌的朋友，你容易和狮子座、白羊座、射手座谈恋爱。/n你欣赏积极向上、身上充满正能量的人，不喜欢悲观主义者。阳光乐观的性格最能够感染到你，让你感受到朝气蓬勃的生命力。/n你相信爱情，对生活和未来都充满憧憬，哪怕现实打击再多，你也始终相信凭自己的能力可以越过难关，光明就在眼前。/n这样打不死的精神是你身上一个耀眼的闪光点，让人忍不住想要接近你，因此你的人缘比较不错。而能够得到你喜欢的人，必定也有着乐观开朗的性格。"
                            },
                            {
                                title: "塔罗建议",
                                content: "狮子、白羊和射手座都是火象星座，天生热情奔放、待人真诚，对自己的人生目标很明晰，并且行动力强，有领导风范，和你会一拍即合。"
                            }])}});


                questionResult = await groupResult.createQuestion({
                    name: "你最有可能通过什么渠道脱单？",
                    count: 132,
                    priceOld: 9800,
                    priceNew: 990
                });
                await questionResult.addCard(card50xb10, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "脱单渠道分析",
                                content: "星币十正位的含义是富裕、事业、成功及团体物质。抽到这张牌的朋友，你通过相亲的方式比较容易脱单。/n你未来的恋人很大机率是通过相亲认识的，而且这个人还很可能是你的结婚对象。你们的结合并不用担忧经济问题，因为你们双方或其中一方有着财务稳固的家庭。/n你和TA还可能是事业上十分契合的伙伴，如果选择共同创业，那么成功的机率也很大，能够过上富足无忧的生活。"
                            },
                            {
                                title: "塔罗建议",
                                content: "需要注意的是，你们虽然经济富裕，但是夫妻间的情感沟通比较不足，又或许说情感交流并不是你们最重视的，物质与金钱才是你们共同追逐的目标。/n当出现这种情况的时候，建议你要静下心来审视自己是否过于注重金钱生活，以致于让自己沦为拜金主义者了。"
                            }])}});
                await questionResult.addCard(card0yr, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "脱单渠道分析",
                                content: "愚人正位的含义是天真、勇敢、旅程以及自由奔放。抽到这张牌的朋友，你通过旅行的方式比较容易脱单。/n" +
                                "你不是一个会受传统思想束缚的人，你敢于挑战，喜欢探索新奇的人事物，脑子里充斥着令他人感到惊诧的想法，有着向往自由的灵魂。/n也正因为你敢于向传统挑战，所以你从不认为到了适婚年龄就要按部就班地结婚、生子，庸碌地终此一生。你渴望爱情，但从不将就。/n热爱自由的你也喜欢到处旅行，去见识更多的风景，开拓自己的眼界，因此你未来的恋人很可能是在旅行时认识的。"
                            },
                            {
                                title: "塔罗建议",
                                content: "这段旅途中发展的恋情未必能够长久，你们会因为冲动而陷入热恋之中，却未必会考虑彼此的未来，属于“今朝有酒今朝醉”式的恋爱。自己要有心理准备哦。"
                            }])}});
                await questionResult.addCard(card28sb3, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "脱单渠道分析",
                                content: "圣杯三正位的含义是欢乐、团体以及欢庆的场合。抽到这张牌的朋友，你通过聚会的方式比较容易脱单。/n这张牌通常代表着一个以情感作为联系的团体，也代表着一些欢庆的活动或场合，诸如宴会、婚礼、饭局等等，而你与未来的恋人很可能会在聚会中相识。/nTA有可能是你从前就认识的朋友，也可能是某位朋友的亲戚、又或是在聚会中新认识的友人，但在你们交往时要小心或会有第三者的出现。"
                            },
                            {
                                title: "塔罗建议",
                                content: "你和这位恋人在一起能够得到朋友们的祝福，拥有足够的情感支持。因此，建议想脱单的你积极参加各类聚会，把握机会抓住自己的缘分。"
                            }])}});
                await questionResult.addCard(card51xb3, {
                    through: {
                        interpretation: JSON.stringify([
                            {
                                title: "脱单渠道分析",
                                content: "星币三正位的含义是合作、协调、以及团队工作。选到这张牌的朋友，你通过工作的方式比较容易脱单。/n依照牌意来看，你未来的对象很可能出现在工作团体中，TA有可能会是你的同事、合作对象或创业伙伴等等。/n你和TA的性格未必相同，但好在大方向比较一致，因此日常相处会比较和谐。你们都不是玩弄感情的花心萝卜，一旦确定恋爱关系，双方便会为未来作打算。"
                            },
                            {
                                title: "塔罗建议",
                                content: "你们不喜欢突如其来的变故，因而每走一步都会做好规划，以求稳为主。但要注意的是，往后你们的重心或会放在金钱、物质或地位上，导致情感交流不足。建议你对爱人要多加关怀与倾听，以免感情产生间隙。"
                            }])}});



                console.log("tarot2 插入数据成功：question");
            }

            await sequelize.close();
            console.log("tarot2 关闭数据库连接成功");
            console.log("tarot2 bye!");
        } catch (err) {
            console.log("tarot2 出错了：", err);
        }
    })();
