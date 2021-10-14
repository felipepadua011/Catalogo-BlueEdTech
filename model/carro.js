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
    velocidade:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tipo:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    motor:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    valor:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    fabricadoem:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    fabricadono:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cambio:{
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