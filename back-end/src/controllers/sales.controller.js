const { SalesService } = require('../services/sales.service');

class SalesController {
    constructor(salesService = new SalesService()) {
        this.salesService = salesService;
    }

    async createSale(req, res) {
        const result = await this.salesService.addSale(req.body);
        return res.status(201).json(result);
    }
}

module.exports = {
    SalesController,
};