import express from 'express'
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import {
  admin,
  protectedRoute
} from '../middleware/authMiddleware.js';

const orderRoutes = express.Router()

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
    paymentDetails,
    userInfo
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems,
      user: userInfo._id,
      username: userInfo.name,
      email: userInfo.email,
      shippingAddress,
      paymentMethod,
      paymentDetails,
      shippingPrice,
      totalPrice
    })

    const createdOrder = await order.save();
    res.status(201).json(createdOrder)
  }
})

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).sort('-createdAt');
  res.json(orders);
})

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id)

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const setDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    const updatedOrder = await order.save();

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

orderRoutes.route('/').post(protectedRoute, createOrder)
orderRoutes.route('/:id').delete(protectedRoute, admin, deleteOrder);
orderRoutes.route('/:id').put(protectedRoute, admin, setDelivered)
orderRoutes.route('/').get(protectedRoute, admin, getOrders)

export default orderRoutes;