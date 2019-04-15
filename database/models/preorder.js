let {defineModel, ID_NAME} = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('preorders', {
    openid: {
        type: Sequelize.DataTypes.STRING,
        references: {
            model: 'users',
            key: 'openid'
        }
    },
    divinationId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
            model: 'divinations',
            key: ID_NAME
        }
    }
});