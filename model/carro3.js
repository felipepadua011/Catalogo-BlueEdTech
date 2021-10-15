const { Sequelize, DataTypes } = require('sequelize');
const database = require('./database');

const carro = database.sequelize.define("valor", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    valor:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

},{
    freezeTableName: true,
    timestamps: false, 
    createdAt: false,
    updatedAt: false,
})
module.exports = carro;