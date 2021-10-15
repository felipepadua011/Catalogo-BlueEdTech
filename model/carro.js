const { Sequelize, DataTypes } = require('sequelize');
const database = require('./database');

const carro = database.sequelize.define("carro", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    modelo:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    marca:{
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