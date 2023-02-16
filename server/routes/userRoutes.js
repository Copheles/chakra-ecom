import express from "express";
import User from "../models/User.js";
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import protectedRoute from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

const genToken = (id) => {
  return jwt.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}


const loginUser = asyncHandler(async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const user = await User.findOne({
    email
  });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
      createdAt: user.createdAt
    })
  } else {
    console.log('not match')
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;

  const userExists = await User.findOne({
    email
  });

  if (userExists) {
    res.status(400);
    throw new Error('We already have an account with that email.')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id)
    })
  } else {
    res.json(400)
    throw new Error('Invalid user data')
  }
})

const updateUserProifle = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genToken(updatedUser._id),
      createdAt: updatedUser.createdAt
    })
  } else {
    res.status(404);
    throw new Error('User not found')

  }
})

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser)
userRoutes.route('/profile/:id').put(protectedRoute, updateUserProifle)

export default userRoutes