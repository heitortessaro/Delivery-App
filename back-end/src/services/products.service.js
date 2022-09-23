const { product } = require('../database/models');

class ProductsService {
    constructor(productsModel = product) {
        this.productsModel = productsModel;
    }

    async getProducts() {
        const products = await this.productsModel.findAll();
        return products;
    }
}

module.exports = {
    ProductsService,
};