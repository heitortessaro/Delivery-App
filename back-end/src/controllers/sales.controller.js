const { SalesService } = require('../services/sales.service');

class SalesController {
    constructor(salesService = new SalesService()) {
        this.salesService = salesService;
    }

    async getSales(_req, res) {
        const result = await this.salesService.getSales();
        return res.status(200).json(result);
    }

    async getSaleById(req, res) {
        const result = await this.salesService.getSaleById(req.params.id);
        return res.status(200).json(result);
    }

    async createSale(req, res) {
        const result = await this.salesService.addSale(req.body);
        return res.status(201).json(result);
    }
}

module.exports = {
    SalesController,
};