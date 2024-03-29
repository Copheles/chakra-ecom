import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide review name']
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
})

const productSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0,
    max: 5
  },
  numOfReviews: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  productIsNew: {
    type: Boolean,
    default: false
  }
}, { timestamps: true})

const Product = mongoose.model('Product',productSchema)

export default Product