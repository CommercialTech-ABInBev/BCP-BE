import OrderService from '../services/order';

const orderService = new OrderService();

export class OrderController {
  async createOrder(req, res, next) {
    try {
      const order = await orderService.createOrder(req.body, req.tokenData);
      res.status(201).send(order);
    } catch (error) {
      next(error);
    }
  }
}
