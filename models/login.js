const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for user
const LoginSchema = new Schema({
  user_id: {
    type: String,
    required: [true, 'The user text field is required']
  },
  level: {
    type: String,
    required: [true, 'The user text field is required'],
  },
  timestamp: {
    type: String,
    required: [true, 'The user text field is required']
  }
})

//create model for user
const Login = mongoose.model('login', LoginSchema);

module.exports = Login;
