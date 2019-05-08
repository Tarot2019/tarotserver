let {defineModel} = require('../db');
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
module.exports = defineModel('cards', {
    name: {
        type: DataTypes.STRING(50),
        unique: true
    },
    element: {
        type: DataTypes.STRING
    },
    tag: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING
    },
    orientation: {
        type: Sequelize.DataTypes.ENUM,
        values: ['positive', 'negative']
    }
});