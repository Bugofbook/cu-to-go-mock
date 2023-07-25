var express = require('express');
var { json } = require('body-parser');
var createError = require('http-errors');
var router = express.Router();


function createResponseObject (identity) {
    switch (identity) {
        case 'restocker': {
            return {
                account: {
                    identity: 'restocker',
                },
                link: {
                    logout: '/api/users/logout',
                }
            }
        }
        case 'developer': {
            return {
                account: {
                    identity: 'developer',
                },
                link: {
                    logout: '/api/users/logout',
                }
            }
        }
        case 'manager': {
            return {
                account: {
                    identity: 'manager',
                },
                link: {
                    logout: '/api/users/logout',
                }
            }
        }
        case 'cloud': {
            return {
                account: {
                    identity: 'cloud',
                },
                link: {
                    logout: '/api/users/logout',
                }
            }
        }
        case 'customer': {
            return {
                account: {
                    identity: 'customer',
                },
                link: {
                    logout: '/api/users/logout',
                }
            }
        }
        default: {
            throw new Error('identity is not legal')
        }
    }
}

router.post('/signin', json(), (req, res) => {
    const { id, identity } = req?.body || {};
    if (id === undefined || identity === undefined) {
        return createError(400, 'data is not legal')
    }
    try {
        const responseObject = createResponseObject(identity)
        return res.status(200).send(JSON.stringify(responseObject))
    } catch (error) {
        return createError(400, 'data is not legal')
    }
})

router.post('/signout', json(), (req, res) => {
    return res.status(204).send()
})

module.exports = router;