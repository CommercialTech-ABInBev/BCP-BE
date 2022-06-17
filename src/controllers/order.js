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
      const orders = await orderService.getAllOrders(req.query);
      res.status(200).send(orders);
    } catch (error) {
      next(error);
    }
  }

  async getWHMOrders(req, res, next) {
    try {
      const orders = await orderService.getWHMorders(req.tokenData, req.query);
      res.status(200).send(orders);
    } catch (error) {
      next(error);
    }
  }

  async queryOrderByCondition(req, res, next) {
    try {
      const orders = await orderService.queryOrders(req.tokenData, req.query);
      res.status(200).send(orders);
    } catch (error) {
      next(error);
    }
  }

  async csvDownloadOrders(req, res, next) {
    try {
      const csvData = await orderService.printOrders(req.tokenData, res);
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

  async searchOrder(req, res, next) {
    try {
      const data = await orderService.searchOrder(req.tokenData, req.query);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  async cancelOrder(req, res, next) {
    try {
      const data = await orderService.cicCancelOrder(req.query);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  async replanOrder(req, res, next) {
    try {
      const data = await orderService.distReplanLoad(req.query, req.body);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req, res, next) {
    try {
      const data = await orderService.editCustomer(req.body, req.query.id);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  async orderLiveUpdate(req, res, next){
    try {
      await orderService.captureLiveOrderUpload(res, req.file)
    } catch (error) {
      next(error);
    }
  }
}
