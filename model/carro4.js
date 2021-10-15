const { Sequelize, DataTypes } = require('sequelize');
const database = require('./database');

const carro = database.sequelize.define("descricao", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    tipo:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    informacoes:{
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