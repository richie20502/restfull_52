const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidoPaterno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidoMaterno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
