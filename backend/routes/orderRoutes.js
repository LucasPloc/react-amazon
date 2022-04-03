const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { isAuth } = require('../utils');
const Order = require('../models/orderModel');

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    const order = await newOrder.save();
    console.log(order);
    res.status(201).send({ message: 'New Order Created', order });
  })
);
orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      return res.send(order);
    } else {
      return res.status(404).send({ message: 'Order not found' });
    }
  })
);

module.exports = orderRouter;
