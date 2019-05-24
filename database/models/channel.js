let {defineModel} = require('../db');
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
module.exports = defineModel('channels', {
    id: {
        type: DataTypes.STRING(8),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        unique: true
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
});