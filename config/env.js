import joi from "joi";
import logger from '../src/logger'
require("dotenv").config();

const schema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    PORT: joi.number().required(),
    TOKEN_EXPIRES: joi.number().required(),
    MONGODB_URL: joi.string().required(),
    TEST_MONGODB_URL: joi.string().required(),
    JWT_SECRET_KEY: joi.string().required(),
    SENDGRID_API_KEY: joi.string().required(),
    SENDGRID_DOMAIN_EMAIL: joi.string().required(),
    RESET_PASSWORD_QUEUE: joi.string().required(),
    RESET_ROUTING_KEY: joi.string().required(),
    RESET_EXCHANGE: joi.string().required(),
    APP_LOGGER: joi.boolean().required(),
    APP_LEVEL: joi.string().required(),
    AMQP_URL: joi.string().required(),
    SIGNUP_QUEUE: joi.string().required(),
    SIGNUP_ROUTING_KEY: joi.string().required(),
    SIGNUP_EXCHANGE: joi.string().required(),
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
  MONGODB_URL: env.MONGODB_URL,
  TEST_MONGODB_URL: env.TEST_MONGODB_URL,
  JWT_SECRET_KEY: env.JWT_SECRET_KEY,
  SENDGRID_API_KEY: env.SENDGRID_API_KEY,
  SENDGRID_DOMAIN_EMAIL: env.SENDGRID_DOMAIN_EMAIL,
  RESET_PASSWORD_QUEUE: env.RESET_PASSWORD_QUEUE,
  RESET_ROUTING_KEY: env.RESET_ROUTING_KEY,
  RESET_EXCHANGE: env.RESET_EXCHANGE,
  APP_LOGGER: env.APP_LOGGER,
  APP_LEVEL: env.APP_LEVEL,
  AMQP_URL: env.AMQP_URL,
  SIGNUP_QUEUE: env.SIGNUP_QUEUE,
  SIGNUP_ROUTING_KEY: env.SIGNUP_ROUTING_KEY,
  SIGNUP_EXCHANGE: env.SIGNUP_EXCHANGE
};

export default config;