const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../utils');


const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


 const userSchema = new Schema({
  password: {
    type: String,
         required: [true, 'Password is required'],
         minLength: 6,
    
  },
  email: {
      type: String,
      match: emailRegex,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
 }, {
     versionKey: false,
     timestamps: true
 })

 userSchema.post("save", handleMongooseError);

 

const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegex),
    subscription: Joi.string()    
    
   
      
})


const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
     email: Joi.string().pattern(emailRegex),
            
      
})

const User = model('user', userSchema);

const schemas = {
    registerSchema,
    loginSchema
}

module.exports = {
    User,
    schemas
}