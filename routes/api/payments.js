var express = require('express');
var { json } = require('body-parser');
var WebSocket = require('ws');
var createError = require('http-errors');
var wss = require('../../model/ws');
var router = express.Router();

const payTypeArray = ['credit', 'ecard', 'mobilePay']

router.post('/', json() ,(req, res) => {
    const { payType } = req?.body || {};
    if (!payTypeArray.includes(payType)) {
        return createError(400, 'data is not legal')
    }
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(PayMockMessage(payType));
        }
    });
    if (payType === 'credit') {
        return res.status(200).send()
    }
    if (payType === 'ecard') {
        return res.status(200).send()
    }
    if (payType === 'mobilePay') {
        return res.status(200).send()
    }
})
function PayMockMessage(data) {
    return JSON.stringify({
    type: 'pay-mock',
    data,
    })
}
router.delete('/', (req, res) => {
    return res.status(204).send()
})
module.exports = router;
