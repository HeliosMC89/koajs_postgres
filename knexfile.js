const path = require('path');

const BASE_PATH = path.join(__dirname, 'database');

module.exports = {
    test: {
        client: 'pg',
        connection: 'postgres://postgres:helios@localhost:5432/koa_api_test',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    },
    development: {
        client: 'pg',
        connection: 'postgres://postgres:helios@localhost:5432/koa_api',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    }
}