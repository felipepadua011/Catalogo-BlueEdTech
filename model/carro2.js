const { Sequelize, DataTypes } = require('sequelize');
const database = require('./database');

const carro = database.define("fabricacao", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    fabricadoem:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    fabricadono:{
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






    
    
    
