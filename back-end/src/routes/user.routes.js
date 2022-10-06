const express = require('express');
const { UserController } = require('../controllers/user.controller');
const { loginValidation } = require('../middleware/loginValidation');
const { userRegisterValidation } = require('../middleware/userRegisterValidation');

const router = express.Router();

const userController = new UserController();

const validateUser = (req, res, next) => userRegisterValidation.validate(req, res, next);

router.post(
  '/login',
  (req, res, next) => loginValidation.validate(req, res, next),
  (req, res) => userController.login(req, res),
);

router.post('/user', validateUser, (req, res) => userController.addUser(req, res));
router.get('/user', (req, res) => userController.getUsers(req, res));

module.exports = router;
