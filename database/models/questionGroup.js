let {defineModel} = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('question_groups', {
    name: {
        type: Sequelize.DataTypes.STRING(10),
        unique: true
    },
    image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    }
});