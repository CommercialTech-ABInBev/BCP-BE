import env from './env';
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = env;

module.exports = {
    production: {
        host: DB_HOST,
        database: DB_NAME,
        username: DB_USER,
        password: DB_PASSWORD,
        dialect: 'mysql',

    },
    development: {
        host: DB_HOST,
        database: DB_NAME,
        username: DB_USER,
        password: DB_PASSWORD,
        dialect: 'mysql',
    },
    test: {
        url: "env.DATABASE_URL_TEST",
        dialect: 'mysql',
    },
};