let {defineModel} = require('../db');
const Sequelize = require('sequelize');
module.exports = defineModel('interpretations', {
    interpretation: {
        type: Sequelize.DataTypes.STRING(3000)
    }
});