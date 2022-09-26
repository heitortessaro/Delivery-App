const { sale, product, saleProduct } = require('../database/models');

class SalesService {
    constructor(salesModel = sale, saleProductModel = saleProduct) {
        this.salesModel = salesModel;
        this.saleProductModel = saleProductModel;
    }

    async getSales(id, role) {
        let sales = {};
        switch (role) {
            case 'administrator':
                sales = await this.salesModel.findAll();
                break;
            case 'customer':
                sales = await this.salesModel.findAll({ where: { userId: id } });
                break;
            case 'seller':
                sales = await this.salesModel.findAll({ where: { sellerId: id } });
                break;
            default: break;
        }
        return sales;
    }

    async getSaleById(id) {
        const userSale = await this.salesModel.findByPk(id, { include: 
            { model: product, as: 'products', through: { attributes: ['quantity'] } } });
        return userSale;
    }

    async addSale(newSale) {
        const { products } = newSale;
        const saleObj = newSale;
        delete saleObj.products;
        const date = Date.now();
        await this.salesModel.create({ ...saleObj, saleDate: date });
        const { id } = await this.salesModel.findOne({ where: { ...saleObj, saleDate: date } });
        products.forEach(async (p) => {
            await this.saleProductModel
            .create({ saleId: id, productId: p.id, quantity: p.quantity });
        });
        return { id };
    }
}

module.exports = {
    SalesService,
};