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

  async getOrders(req, res, next) {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).send(orders);
    } catch (error) {
      next(error);
    }
  }

  async queryOrderByCondition(req, res, next) {
    try {
      const orders = await orderService.queryOrders(req.query);
      res.status(200).send(orders);
    } catch (error) {
      next(error);
    }
  }

  async csvDownloadOrders(req, res, next) {
    try {
      const csvData = await orderService.printOrders(res);
      res.status(200).send(csvData);
    } catch (error) {
      next(error);
    }
  }

  async OrderLoad(req, res, next) {
    try {
      const load = await orderService.planOrderLoad(req.body);
      res.status(200).send(load);
    } catch (error) {
      next(error);
    }
  }

  async generateOrderInvoice(req, res, next) {
    try {
      const data = await orderService.generateOrderInvoice(req.query);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  async pickOrder(req, res, next) {
    try {
      const data = await orderService.pickOrder(req.query);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
}
