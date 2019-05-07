//create all tables
const Models = require('./models.js');
const { sequelize } = require('./db');
const insertDebugData = true;

const interpretation = Models.interpretation;
const card = Models.card;
const question = Models.question;
const questionGroup = Models.questionGroup;
(async () => {
        try {
            if(insertDebugData) {
                await interpretation.drop();
                await card.drop();
                await question.drop();
                await questionGroup.drop();
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
                let cardInstance = {
                    name: "恋人",
                    element: "风",
                    tag: "爱情、信任、乐观",
                    img: "/tarot1/card/6恋人.jpg",
                    orientation: "positive",
                    description: "在阳光普照的伊甸园里面，裸体的亚当和夏娃分别站在两边。" + +
                    "夏娃背后有一棵生长了苹果的知识之树，亚当背后是生命之树，有12团火焰，也是欲望之火。" +
                    "两个人背后是有着紫色翅膀的风之天使拉斐尔，穿着象征忠贞的紫色袍子。亚当望着夏娃，夏娃看着天使，象征着人类的意识——潜意识——超意识。"
                };
                await card.create(cardInstance);
                cardInstance = {
                    name: "愚人",
                    element: "风",
                    tag: "天真、好奇、新鲜感",
                    img: "/tarot1/card/0愚人.jpg",
                    orientation: "positive",
                    description: "一个穿着夸张可笑衣服的人，很快乐的走近了悬崖边，他的表情似乎不知道自己已经在危险边缘了。也许他会继续往前进，而掉入了悬崖，也许他会回头走，选择别条道路，一切都是未知的。" +
                    "但无论如何，此时此刻的他是十分自得其乐的，内心觉得非常愉悦的，有点盲目乐观、有点不畏艰难，这就是他的性格。" +
                    "旁边有一只狗跟着他，似乎是在提醒着他，危险就在眼前，似乎想唤回他，面对现实的世界，但“愚者”此时此刻的心，已经被快乐愉悦所笼罩了，他当下只想随心所欲，下一步怎么走，都还是未知数呢!"
                };
                await card.create(cardInstance);
                console.log("tarot2 插入数据成功：card");


                let groupInstance = {
                    name: "感情",
                    img: "/tarot1/question_group.jpg"
                };
                let groupResult = await questionGroup.create(groupInstance);
                await groupResult.createQuestion({name: "2019年桃花运如何？"});
                await groupResult.createQuestion({name: "你们之间会不会复合？"});
                await groupResult.createQuestion({name: "两人未来发展趋势？"});

                groupInstance = {
                    name: "事业",
                    img: "/tarot1/question_group.jpg"
                };
                groupResult = await questionGroup.create(groupInstance);
                await groupResult.createQuestion({name: "2019年事业运如何？"});


                groupInstance = {
                    name: "财运",
                    img: "/tarot1/question_group.jpg"
                };
                groupResult = await questionGroup.create(groupInstance);
                await groupResult.createQuestion({name: "2019年财运如何？"});
                // userData.openid = "2";
                // userData.unionid = "unionid2";
                // userData.wechatName = "name2";
                // userData.avatar = "avatar2";
                // await  Models.user.create(userData);
                console.log("tarot2 插入数据成功：question");
            }

            await sequelize.close();
            console.log("tarot2 关闭数据库连接成功");
            console.log("tarot2 bye!");
        } catch (err) {
            console.log("tarot2 出错了：", err);
        }
    })();