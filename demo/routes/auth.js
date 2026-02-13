const express = require('express');
const router = express.Router();
const authController = require('../src/controllers/authcontroller');

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/register', authController.showRegister);
router.post('/register', authController.register);

router.get('/login', authController.showLogin);
router.post('/login', authController.login);

router.get('/welcome', authController.welcome);
router.get('/logout', authController.logout);

module.exports = router;
