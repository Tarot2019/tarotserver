let {defineModel} = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('questions', {
    name: {
        type: Sequelize.DataTypes.STRING
    },
    tips: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    }
});