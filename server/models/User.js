import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: [true, 'Please provide name']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide password']
  },
  isAdmin: {
    type: Boolean,
    default: false

  },

}, {
  timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){ 
  if(!this.isModified('password')){
    next();
  } 
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema);
export default User