const { Router } = require('express');
const { SalesController } = require('../controllers/sales.controller');
const { TokenValidation } = require('../middleware/tokenValidation');
const { saleValidation } = require('../middleware/newSalesValidation');
const { updateSaleValidation } = require('../middleware/updateSaleValidation');

const salesRouter = Router();

const salesController = new SalesController();
const tokenValidation = new TokenValidation();

const validateToken = (req, res, next) => tokenValidation.validate(req, res, next);
const validateSale = (req, res, next) => saleValidation.validate(req, res, next);
const validateStatus = (req, res, next) => updateSaleValidation.validate(req, res, next);

salesRouter.post('/sales', validateSale, (req, res) => salesController.createSale(req, res));
salesRouter.get('/sales/:id', (req, res) => salesController.getSaleById(req, res));
salesRouter.get('/sales', validateToken, (req, res) => salesController.getSales(req, res));
salesRouter.put('/sales/:id', validateStatus, (req, res) => salesController.updateStatus(req, res));

module.exports = salesRouter;