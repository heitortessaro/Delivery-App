const { Router } = require('express');
const { SalesController } = require('../controllers/sales.controller');
const { TokenValidation } = require('../middleware/tokenValidation');

const salesRouter = Router();

const salesController = new SalesController();
const tokenValidation = new TokenValidation();

const validateToken = (req, res, next) => tokenValidation.validate(req, res, next);

salesRouter.post('/sales', (req, res) => salesController.createSale(req, res));
salesRouter.get('/sales/:id', (req, res) => salesController.getSaleById(req, res));
salesRouter.get('/sales', validateToken, (req, res) => salesController.getSales(req, res));
salesRouter.put('/sales/:id', (req, res) => salesController.updateStatus(req, res));

module.exports = salesRouter;