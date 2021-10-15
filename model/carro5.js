const { Sequelize, DataTypes } = require('sequelize');
const database = require('./database');

const carro = database.sequelize.define("motor", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    velocidade:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    motor:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cambio:{
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