var express = require('express');
var { json } = require('body-parser');
var WebSocket = require('ws');
var wss = require('../../model/ws');
var router = express.Router();

router.post('/pay', json(), (req, res) => {
    console.log('pay')
    const { type, code } = req.body;
    if (type === 'success') {
        console.log('send pay success')
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
            console.log('send pay success2')
            console.log(PaySuccessMessage())
            client.send(PaySuccessMessage());
        }
    });
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
            type: 'cooking-pending',
        }));
        }
    });
    return res.status(200).send()
    }
    if (type === 'fail') {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
        client.send(PayFailMessage(code));
        }
    });
    return res.status(200).send()
    }
    return res.status(400).send(`type:${type}  is not legal`)
})
function PaySuccessMessage() {
    return JSON.stringify({
        type: 'pay-success',
    })
}
function PayFailMessage(data) {
    return JSON.stringify({
        type: 'pay-fail',
        data,
    })
}
function CookingSuccessMessage() {
    return JSON.stringify({
    type: 'cooking-success',
    })
}
function CookingFailMessage(data) {
    return JSON.stringify({
    type: 'cooking-fail',
    data,
    })
}
router.post('/cooking', json(), (req, res) => {
    const { type, code } = req.body;
    if (type === 'success') {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
        client.send(CookingSuccessMessage());
        }
    });
    return res.status(200).send()
    }
    if (type === 'fail') {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
        client.send(CookingFailMessage(code));
        }
    });
    return res.status(200).send()
    }
    return res.status(400).send(`type:${type}  is not legal`)
})

module.exports = router;
