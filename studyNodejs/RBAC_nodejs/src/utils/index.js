'use strict';

import _ from 'lodash';
import { Types } from 'mongoose';
import crypto from 'node:crypto';

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
};

const convertToObjectId = (id) => Types.ObjectId.createFromHexString(id);

const generateKey = (byte = 64) => crypto.randomBytes(byte).toString('hex');

// exp: [a, b] => {a: 1, b: 1}
const getSelectData = (select = []) => {
    return Object.fromEntries(select.map((el) => [el, 1]));
};

// exp: [a, b] => {a: 0, b: 0}
const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map((el) => [el, 0]));
};

// exp: [a, b] => {a: -1, b: -1}
const descSort = (array = []) => {
    return Object.fromEntries(array.map((el) => [el, -1]));
};

const getSort = (sort = '') => {
    if (sort.charAt() == '-') {
        return descSort([sort.slice(1)]);
    } else {
        return getSelectData([[sort]]);
    }
};

const removeFieldSecret = (array = [], condition = '') => {
    if (typeof condition == 'string') {
        return array.filter((value) => !value.includes(condition));
    } else {
        return array.filter((value) => !condition.includes(value));
    }
};

const removeUndefinedObject = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key] === undefined) delete obj[key];
        if (obj[key] === null) delete obj[key];
    });

    return obj;
};

const removeNestedObject = (obj) => {
    const final = {};
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            const response = removeNestedObject(obj[key]);
            Object.keys(response).forEach((k) => {
                final[`${key}.${k}`] = response[k];
            });
        } else {
            final[key] = obj[key];
        }
    });

    return final;
};

/**
 * The sanitize function recursively removes keys starting with '$' from nested objects.
 * @param value - The `value` parameter in the `sanitize` function is the input that needs to be
 * sanitized. The function recursively iterates through the properties of the input object and removes
 * any keys that start with a dollar sign ('$').
 * @returns The `sanitize` function is recursively removing any keys in the object `value` that start
 * with a dollar sign ('$'). The function returns the sanitized object after removing all such keys.
 */
function sanitize(value) {
    if (value instanceof Object) {
        for (var key in value) {
            if (/^\${}/.test(key)) {
                delete value[key];
            } else {
                sanitize(value[key]);
            }
        }
    }
    return value;
}

export {
    getInfoData,
    getSelectData,
    unGetSelectData,
    removeUndefinedObject,
    removeNestedObject,
    convertToObjectId,
    generateKey,
    getSort,
    removeFieldSecret,
    sanitize,
};
