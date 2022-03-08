import joi from 'joi';
import logger from '../logger';
require('dotenv').config();

const schema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    PORT: joi.number().required(),
    TOKEN_EXPIRES: joi.number(),
    DB_HOST: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    JWT_SECRET_KEY: joi.string(),
    SENDGRID_API_KEY: joi.string(),
    SENDGRID_DOMAIN_EMAIL: joi.string(),
    RESET_PASSWORD_QUEUE: joi.string(),
    RESET_ROUTING_KEY: joi.string(),
    RESET_EXCHANGE: joi.string(),
    APP_LOGGER: joi.boolean(),
    APP_LEVEL: joi.string(),
    SIGNUP_QUEUE: joi.string(),
    SIGNUP_ROUTING_KEY: joi.string(),
    SIGNUP_EXCHANGE: joi.string(),
  })
  .unknown()
  .required();

const { error, value: env } = schema.validate(process.env);

if (error) {
  logger.error(`Config validation error: ${error.message}`);
}

const config = {
  env: env.NODE_ENV,
  PORT: env.PORT,
  TOKEN_EXPIRES: env.TOKEN_EXPIRES,
  DB_HOST: env.DB_HOST,
  DB_NAME: env.DB_NAME,
  DB_USER: env.DB_USER,
  DB_PASSWORD: env.DB_PASSWORD,
  JWT_SECRET_KEY: env.JWT_SECRET_KEY,
  SENDGRID_API_KEY: env.SENDGRID_API_KEY,
  SENDGRID_DOMAIN_EMAIL: env.SENDGRID_DOMAIN_EMAIL,
  RESET_PASSWORD_QUEUE: env.RESET_PASSWORD_QUEUE,
  RESET_ROUTING_KEY: env.RESET_ROUTING_KEY,
  RESET_EXCHANGE: env.RESET_EXCHANGE,
  AZURE_KEY: env.AZURE_KEY,
  BUCKET_NAME: env.BUCKET_NAME,
  STORAGE_CONNECTION_STRING: env.STORAGE_CONNECTION_STRING,
  APP_LOGGER: env.APP_LOGGER,
  APP_LEVEL: env.APP_LEVEL,
  CLOUDAMQP_URL: env.CLOUDAMQP_URL,
  SIGNUP_QUEUE: env.SIGNUP_QUEUE,
  SIGNUP_ROUTING_KEY: env.SIGNUP_ROUTING_KEY,
  SIGNUP_EXCHANGE: env.SIGNUP_EXCHANGE,
};

export default config;
