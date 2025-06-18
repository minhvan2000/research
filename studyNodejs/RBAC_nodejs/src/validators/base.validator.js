import { check } from 'express-validator';

// TODO: Let's find to make it better
function queryFilterValidator() {
    return [
        check('limit', 'Invalid limit').isInt({ min: 1, max: 1000 }).toInt(),
        check('page', 'Invalid page').isInt({ min: 1 }).toInt(),
    ];
}

function idMongoValidator() {
    return [check('id', 'Invalid id data').isMongoId()];
}

function keySearchValidator() {
    return [
        check('keySearch', 'Invalid key search')
            .not()
            .matches(/[{\],$,\[,\] ]/),
    ];
}

export { queryFilterValidator, idMongoValidator, keySearchValidator };
