var express = require('express');
var { json } = require('body-parser');
var createError = require('http-errors');
var router = express.Router();
let  fakeAisleList = [
    {
        id: '1',
        name: '001',
        productID: '1',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-08-01',
        state: 'normal',
    },
    {
        id: '2',
        name: '002',
        productID: '2',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-08-01',
        state: 'normal',
    },
    {
        id: '3',
        name: '003',
        productID: '3',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-08-01',
        state: 'normal',
    },
    {
        id: '4',
        name: '004',
        productID: '4',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-08-01',
        state: 'normal',
    },
    {
        id: '5',
        name: '005',
        productID: '5',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-08-01',
        state: 'normal',
    },
    {
        id: '6',
        name: '006',
        productID: '6',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-08-01',
        state: 'normal',
    },
    {
        id: '7',
        name: '007',
        productID: '7',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-08-01',
        state: 'normal',
    },
    {
        id: '8',
        name: '008',
        productID: '1',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-09-01',
        state: 'normal',
    },
    {
        id: '9',
        name: '009',
        productID: '2',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-09-01',
        state: 'normal',
    },
    {
        id: '10',
        name: '010',
        productID: '3',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-09-01',
        state: 'normal',
    },
    {
        id: '11',
        name: '011',
        productID: '4',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-09-01',
        state: 'normal',
    },
    {
        id: '12',
        name: '012',
        productID: '5',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-09-01',
        state: 'normal',
    },
    {
        id: '13',
        name: '013',
        productID: '6',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-09-01',
    },
    {
        id: '14',
        name: '014',
        productID: '7',
        fullCount: 10,
        stockCount: 5,
        restockCount: 0,
        shelfLifeDate: '2023-09-01',
    }
]

const aisleKeys = ['id', 'name', 'productID', 'fullCount', 'stockCount', 'restockCount', 'shelfLifeDate', 'state']
router.get('/', (req, res) => {
    return res.status(200).send(JSON.stringify(fakeAisleList))
})
router.put('/', json(), (req, res) => {
    const newAisleList = req.body;
    if (!Array.isArray(newAisleList)) {
        return createError(400, 'data is not legal')
    }
    if (newAisleList.some((aisle) => aisleKeys.some((key) => !Reflect.has(aisle, key)))) {
        return createError(400, 'data is not legal')
    }
    fakeAisleList = newAisleList;
    return res.status(204).send()
})
router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return createError(400, 'aisleID is not legal')
    }
    const aisle = fakeAisleList.find((p) => p.id === id);
    if (!aisle) {
        return createError(404, 'not found')
    }
    return res.status(200).send(JSON.stringify(aisle))
})
router.put('/:id', json(), (req, res) => {
    const id = req.params.id;
    if (!id) {
        return createError(400, 'aisleID is not legal')
    }
    const newItem = req.body;
    if (!newItem) {
        return createError(400, 'data is not legal')
    }
    if (aisleKeys.some((key) => !Reflect.has(newItem, key))) {
        return createError(400, 'data is not legal')
    }
    if (id !== newItem.id) {
        return createError(400, 'id does not match')
    }
    const aisleIndex = fakeAisleList.findIndex((p) => p.id === newItem.id);
    if (aisleIndex === -1) {
        return createError(404, 'not found')
    }
    fakeAisleList[aisleIndex] = newItem;
    return res.status(204).send()
})
module.exports = router;
