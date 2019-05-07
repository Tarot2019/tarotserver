let {defineModel} = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('interpretations', {
    title: {
        type: Sequelize.DataTypes.STRING
    },
    content: {
        type: Sequelize.DataTypes.STRING
    }
});