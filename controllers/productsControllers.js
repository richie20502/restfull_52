const Products = require("../models/Products");

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const createProduct = async (req, res) => {
    console.log(req.body);
    try {
        const { name, price } = req.body;
        const newProduct = await Products.create({ name, price });
        res.status(201).json(newProduct); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
};
