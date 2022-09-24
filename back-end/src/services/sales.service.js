const { sale } = require('../database/models');
const { saleProduct } = require('../database/models');

class SalesService {
    constructor(salesModel = sale, saleProductModel = saleProduct) {
        this.salesModel = salesModel;
        this.saleProductModel = saleProductModel;
    }

    async addSale(newSale) {
        const { products } = newSale;
        const saleObj = newSale;
        delete saleObj.products;
        const date = Date.now();
        await this.salesModel.create({ ...saleObj, saleDate: date });
        const { id } = await this.salesModel.findOne({ where: { ...saleObj, saleDate: date } });
        products.forEach(async (product) => {
            await this.saleProductModel
            .create({ saleId: id, productId: product.id, quantity: product.quantity });
        });
        return { id };
    }
}

module.exports = {
    SalesService,
};