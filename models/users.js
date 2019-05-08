const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for user
const UsersSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'The user text field is required']
  },
  level: {
    type: Number,
    required: [true, 'The user text field is required'],
  },
  username: {
    type: String,
    required: [true, 'The user text field is required']
  },
  password: {
    type: String,
    required: [true, 'The user text field is required']
  },
  email: {
    type: String,
    required: [true, 'The user text field is required']
  }
})

//create model for user
const Users = mongoose.model('users', UsersSchema);

module.exports = Users;
