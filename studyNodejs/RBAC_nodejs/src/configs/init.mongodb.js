'use strict';

import { set, connect as _connect } from 'mongoose';
import environmentConfig from './environment.config.js';
import { countConnect } from '../utils/check.connect.js';

const {
    dbConfig: { host, port, name },
} = environmentConfig;

const connectString = `mongodb://${host}:${port}/${name}`;

class Database {
    constructor() {
        this.connect();
    }

    //connect
    connect(type = 'mongodb') {
        if (1 == 1) {
            set('debug', true);
            set('debug', { color: true });
        }

        _connect(connectString, { maxPoolSize: 100 })
            .then((_) => {
                countConnect();
                console.log(`Mongodb :: connected ${name}`);
            })
            .catch((error) => console.log(`Error Connect!`, error));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

export default instanceMongodb;
