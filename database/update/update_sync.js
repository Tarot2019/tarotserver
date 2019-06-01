const { sequelize } = require('../db');
const Models = require('../models.js');
const interpretation = Models.interpretation;
const card = Models.card;
const question = Models.question;
const questionGroup = Models.questionGroup;
const tarot2record = Models.tarot2record;
(async () => {
        try {
            Models.user.belongsToMany(Models.divination, {as: "Preorders", through: "userPreorder"});
            Models.divination.belongsToMany(Models.user, {as: "Collectors", through: "userPreorder"});

            Models.user.belongsToMany(Models.divination, {as: "Orders", through: Models.order});
            Models.divination.belongsToMany(Models.user, {as: "Consumers", through: Models.order});

            Models.channel.hasMany(Models.user);
            Models.channel.hasMany(Models.order);
            Models.channel.hasMany(Models.tarot2record);


            question.belongsTo(questionGroup);
            questionGroup.hasMany(question);
            question.belongsToMany(card, {through: interpretation});
            card.belongsToMany(question, {through: interpretation});
            await sequelize.sync();
            console.log("++++++++ 创建表完成 ++++++++");

            await sequelize.close();


            console.log("关闭数据库连接成功");
            console.log("bye!");
        } catch (err) {
            console.log("出错了：", err);
        }
    })();