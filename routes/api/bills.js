var express = require('express');
var { json } = require('body-parser');
var createError = require('http-errors');
var router = express.Router();

let fakeBill = null;

router.post('/', json(), (req, res) => {
    const { productID, hasHeating, hasTool } = req?.body || {};
    if (productID === undefined || hasHeating === undefined || hasTool === undefined) {
        return createError(400, 'data is not legal')
    }
    fakeBill = req.body;
    return res.status(204).send()
})
router.delete('/', (req, res) => {
    fakeBill = null;
    return res.status(204).send()
})
module.exports = router;
