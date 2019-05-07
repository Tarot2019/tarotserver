const Sequelize = require('sequelize');

let sequelize = new Sequelize('tarotTest', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        //支持emoji
        charset: 'utf8mb4',
        collate: "utf8mb4_unicode_ci"
    },
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
// var sequelize = new Sequelize('zhishang', 'root', '123', {
//     host: '47.94.252.111',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 30000
//     }
// });

const ID_NAME = 'id';
const ID_TYPE = Sequelize.DataTypes.BIGINT;

var defineModel = function(name, attributes, options) {
    var attrs = {};
    if(options && options.addId) {
        attrs[ID_NAME] = {
            type: ID_TYPE,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        };
    }
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    if(options && options.addVersion) {
        attrs.createdAt = {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false
        };
        attrs.updatedAt = {
            type: Sequelize.BIGINT,
            allowNull: false
        };
        attrs.version = {
            type: Sequelize.BIGINT,
            allowNull: false
        };
    }
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: (obj) => {
                console.log("beforeValidate: " + JSON.stringify(obj));
                let now = Date.now();
                if (obj.isNewRecord) {
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    });
}

module.exports.defineModel = defineModel;
module.exports.ID_NAME = ID_NAME;
module.exports.ID_TYPE = ID_TYPE;
module.exports.sequelize = sequelize;