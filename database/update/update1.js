//增加渠道数据
const Models = require('../models.js');
const { sequelize } = require('../db');
const insertDebugData = true;
const channel = Models.channel;
(async () => {
        try {

            console.log("-------- begin 创建关联 --------");
            channel.hasMany(Models.user);
            channel.hasMany(Models.order);
            console.log("-------- end 创建关联 --------");


            await sequelize.sync();
            console.log("++++++++ 创建表完成 ++++++++");

            //插入测试数据
            if (insertDebugData) {
                //1
                await channel.create({
                    id: "official",
                    name: "自营渠道",
                    description: "自营渠道"
                });
                console.log("插入数据成功：channel");
            }

            await sequelize.close();


            // ALTER TABLE `tarotTest`.`orders`
            // ADD COLUMN `channelId` varchar(8) NOT NULL default 'official',
            //     ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`channelId`) REFERENCES `tarotTest`.`channels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
            //
            // ALTER TABLE `tarotTest`.`users`
            // ADD COLUMN `channelId` varchar(8) NOT NULL default 'official',
            //     ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`channelId`) REFERENCES `tarotTest`.`channels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
            //
            // ALTER TABLE `tarotTest`.`tarot2record`
            // ADD COLUMN `channelId` varchar(8) NOT NULL default 'official',
            //     ADD CONSTRAINT `tarot2record_ibfk_1` FOREIGN KEY (`channelId`) REFERENCES `tarotTest`.`channels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
            console.log("关闭数据库连接成功");
            console.log("bye!");
        } catch (err) {
            console.log("出错了：", err);
        }
    })();