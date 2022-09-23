const { ProductsService } = require('../services/products.service');

class ProductsController {
    constructor(productsService = new ProductsService()) {
        this.productsService = productsService;
    }

    async getProducts(_req, res) {
        const products = await this.productsService.getProducts();
        return res.status(200).json(products);
    }
}

module.exports = {
    ProductsController,
};