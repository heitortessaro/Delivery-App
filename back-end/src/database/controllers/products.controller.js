const ProductsService = require('../services/products.service');

const getProducts = async (_req, res) => {
    const {code, message, products} = await ProductsService.getProducts();
    if(message) return res.status(code).json({message});
    return res.status(code).json(products);
}

module.exports = {
    getProducts
}