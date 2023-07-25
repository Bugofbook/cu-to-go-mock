var express = require('express');
var { json } = require('body-parser');
var wss = require('../../model/ws');
var createError = require('http-errors');
var router = express.Router();
let fakeProductList = [
    {
        id: '1',
        name: '燒肉粽',
        description: '燒肉粽',
        canSelect: true,
        discount: 1,
        price: 100,
        noHeatingOption: true,
        hasCutleryOption: false,
        tags: '',
        cookingTime: 30,
        toolPrice: 10,
        image: 'fake1.png',
    },
    {
        id: '2',
        name: '韓式泡菜炒飯',
        description: '韓式泡菜炒飯',
        canSelect: true,
        discount: 0.8,
        price: 100,
        noHeatingOption: false,
        hasCutleryOption: false,
        tags: '',
        cookingTime: 30,
        toolPrice: 10,
        image: 'fake2.png',
    },
    {
        id: '3',
        name: '廣東撈麵',
        description: '廣東撈麵',
        canSelect: true,
        discount: 0.8,
        price: 100,
        noHeatingOption: false,
        hasCutleryOption: false,
        tags: '',
        cookingTime: 30,
        toolPrice: 10,
        image: 'fake3.png',
    },
    {
        id: '4',
        name: '新加坡叻沙',
        description: '新加坡叻沙',
        canSelect: true,
        discount: 1,
        price: 95,
        noHeatingOption: false,
        hasCutleryOption: true,
        tags: '',
        cookingTime: 30,
        toolPrice: 10,
        image: 'fake4.png',
    },
    {
        id: '5',
        name: '薑黃烤雞飯',
        description: '薑黃烤雞飯',
        canSelect: false,
        discount: 1,
        price: 80,
        noHeatingOption: false,
        hasCutleryOption: false,
        tags: '',
        cookingTime: 30,
        toolPrice: 10,
        image: 'fake5.png',
    },
    {
        id: '6',
        name: '義大利香料豬肉海鮮麵義大利',
        description: '義大利香料豬肉海鮮麵義大利香料豬肉海鮮',
        canSelect: true,
        price: 60,
        hasCutleryOption: false,
        noHeatingOption: false,
        discount: 1,
        tags: 'isNew,isBrand',
        cookingTime: 30,
        toolPrice: 10,
        image: 'fake6.png',
    },
    {
        id: '7',
        name: '義大利香料牛肉海鮮麵',
        description: '義大利香料牛肉海鮮麵',
        canSelect: true,
        price: 95,
        hasCutleryOption: true,
        noHeatingOption: false,
        discount: 1,
        tags: 'isNew,isBrand',
        cookingTime: 30,
        toolPrice: 10,
        image: 'fake1.png',
    },
]
const productKeys = ['id', 'name', 'description', 'canSelect' ,'price', 'discount', 'tags', 'cookingTime', 'toolPrice', 'image', 'hasCutleryOption', 'noHeatingOption']
// product
router.get('/', (req, res) => {
    return res.status(200).send(JSON.stringify(fakeProductList))
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const product = fakeProductList.find((p) => p.id === id);
    if (product) {
        return res.status(200).send(JSON.stringify(product))
    } else {
        return createError(404, 'not found')
    }
});

router.put('/:id', json(), (req, res) => {
    const id = req.params.id;
    const newItem = req.body;
    if (id !== newItem.id) {
        return createError(400, 'id does not match')
    }
    const index = fakeProductList.findIndex((p) => p.id === newItem.id);
    if (index === -1) {
        return createError(404, 'not found')
    }
    if (productKeys.some((key) => !Reflect.has(newItem, key))) {
        return createError(400, 'data is not legal')
    }
    fakeProductList[index] = newItem;
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
            type: 'product-change',
            data: req.body,
            }));
        }
    });
    return res.status(204).send()
})
module.exports = router;
