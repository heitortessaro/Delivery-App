const express = require('express');
const { UserController } = require('../controllers/user.controller');
const { loginValidation } = require('../middleware/loginValidation');

const router = express.Router();

const userController = new UserController();

router.post(
  '/login',
  (req, res, next) => loginValidation.validate(req, res, next),
  (req, res) => userController.login(req, res),
);

module.exports = router;
