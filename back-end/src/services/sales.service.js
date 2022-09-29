const { sale, product, sales_products } = require('../database/models');
const { CustomError } = require('../helpers/customError');

class SalesService {
    constructor(salesModel = sale, saleProductModel = sales_products) {
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
        await this.salesModel.create({ ...saleObj, saleDate: date, status: 'Pendente' });
        const { id } = await this.salesModel.findOne({ where: { ...saleObj, saleDate: date } });
        products.forEach(async (p) => {
            await this.saleProductModel
            .create({ saleId: id, productId: p.id, quantity: p.quantity });
        });
        return { id };
    }

    async updateStatus(id, status) {
        const findSale = await this.salesModel.findByPk(id);
        if (!findSale) throw new CustomError(404, 'Sale not found');
        await this.salesModel.update({ status }, { where: { id } });
        return { message: 'Updated' };
    }
}

module.exports = {
    SalesService,
};