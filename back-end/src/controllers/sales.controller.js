const { SalesService } = require('../services/sales.service');

class SalesController {
    constructor(salesService = new SalesService()) {
        this.salesService = salesService;
    }

    async getSales(req, res) {
        const { id, role } = req.user;
        const result = await this.salesService.getSales(id, role);
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

    async updateStatus(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        const result = await this.salesService.updateStatus(id, status);
        return res.status(200).json(result);
    }
}

module.exports = {
    SalesController,
};