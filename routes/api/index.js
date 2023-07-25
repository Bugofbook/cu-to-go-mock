var express = require('express');
var router = express.Router();
const productsApi = require('./products');
const aislesApi = require('./aisles');
const billsApi = require('./bills');
const paymentsApi = require('./payments');
const invoicesApi = require('./invoices');
const usersApi = require('./users');
const mockApi = require('./mock');
// use api
router.use('/products', productsApi);
router.use('/aisles', aislesApi);
router.use('/bills', billsApi);
router.use('/payments', paymentsApi);
router.use('/invoices', invoicesApi);
router.use('/mock', mockApi);
// use log
router.use('/users', usersApi);

module.exports = router;
