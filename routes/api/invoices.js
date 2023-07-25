var express = require('express');
var { json } = require('body-parser');
var createError = require('http-errors');
var router = express.Router();

const invoiceTypeArray = ['scan', 'input']
router.post('/', json() ,(req, res) => {
    const { type, code } = req.body;
    if (!invoiceTypeArray.includes(type)) {
        return createError(400, `data is not legal`)
    }
    if (type === 'scan') {
        return res.status(204).send()
    }
    if (typeof code !== 'string') {
        return res.status(400).send('data is not legal')
    }
    if (!code.startsWith('/')) {
        return res.status(400).send('data is not legal')
    }
    return res.status(204).send()
})
router.delete('/', (req, res) => {
    return res.status(204).send()
})
module.exports = router;