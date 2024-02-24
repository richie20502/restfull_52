const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelizeConfig');

const Products = sequelize.define("Product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = Products;
