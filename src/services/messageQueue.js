import amqplib from 'amqplib';
import env from '@src/config/env';
import logger from '@src/logger';

const { CLOUDAMQP_URL } = env;

export default class RabbitMQService {
  static async publisher(payload, queue, exchange, routingKey) {
    const connection = await amqplib.connect(
      process.env.NODE_ENV === 'test' ? 'amqp://localhost:5673' : CLOUDAMQP_URL,
      'heartbeat=60'
    );
    const channel = await connection.createChannel();

    try {
      logger.info('Publishing');

      await channel.assertExchange(exchange, 'direct', { durable: true });
      await channel.assertQueue(queue, { durable: true });
      await channel.bindQueue(queue, exchange, routingKey);

      await channel.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(payload))
      );

      logger.info('Message published');
    } catch (e) {
      logger.error('Error in publishing message', e);
    } finally {
      logger.info('Closing channel and connection if available');
      await channel.close();
      await connection.close();
      logger.info('Channel and connection closed');
    }
  }

  static async consumer(queue, service) {
    const connection = await amqplib.connect(CLOUDAMQP_URL, 'heartbeat=60');
    const channel = await connection.createChannel();
    channel.prefetch(10);

    process.once('SIGINT', async () => {
      logger.info('got sigint, closing connection');
      await channel.close();
      await connection.close();
      process.exit(0);
    });

    await channel.assertQueue(queue, { durable: true });
    await channel.consume(
      queue,
      async (msg) => {
        logger.info('processing messages');

        service(JSON.parse(msg.content.toString()));
        await channel.ack(msg);
      },
      {
        noAck: false,
      }
    );
    logger.info(' [*] Waiting for messages. To exit press CTRL+C');
  }
}
