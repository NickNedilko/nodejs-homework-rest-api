const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const ctrl = require('../../controllers/auth')

const {schemas} = require("../../models/user");

const router = express.Router();


// Sign up

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.current);

router.post('./logout',  authenticate, ctrl.logout)


module.exports = router;


