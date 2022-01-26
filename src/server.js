import './utils/module-alias';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import expressPino from 'express-pino-logger';
import logger from './logger';
import routes from './routes';
import apiSchema from './api-schema.json';

export class SetupServer {
  app = express();
  server;

  /*
   * same as this.port = port, declaring as private here will
   * add the port variable to the SetupServer instance
   */
  constructor(port = 3000) {
    this.port = port;
  }

  /*
   * We use a different method to init instead of using the constructor
   * this way we allow the server to be used in tests and normal initialization
   */
  async init() {
    this.setupExpress();
    this.docsSetup();
    this.setupControllers();
    //must be the last

    this.setupErrorHandlers();
  }

  setupExpress() {
    this.app.use(bodyParser.json());
    this.app.use(
      expressPino({
        logger,
      })
    );
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }

  setupControllers() {
    this.app.get('/', (req, res) =>
      res.status(200).send({
        message: 'Welcome to Inventory Management System',
      })
    );
    this.app.use('/v1.0/api', routes);
    this.app.all('*', (req, res) => res.send({ message: 'route not found' }));
  }

  async docsSetup() {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
  }

  setupErrorHandlers() {
    this.app.use((err, _, res, __) => {
      if (err.name === 'HttpError') {
        return err.getErrorResponse(res);
      }
      res.status(500).json({ success: false, error: `An error occurred` });
    });
  }

  getApp() {
    return this.app;
  }

  async close() {
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve(true);
        });
      });
    }
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      logger.info('Server listening on port: ' + this.port);
    });
  }
}
