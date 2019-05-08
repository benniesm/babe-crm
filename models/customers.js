const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for user
const CustomersSchema = new Schema({
  alt_id: {
    type: String,
    required: [true, 'The user text field is required']
  },
  category: {
    type: Number,
    required: [true, 'The user text field is required']
  },
  fullname: {
    type: String,
    required: [true, 'The user text field is required']
  },
  email: {
    type: String,
    required: [true, 'The user text field is required']
  },
  telephone: {
    type: String,
    required: [true, 'The user text field is required'],
  },
  city: {
    type: String,
    required: [true, 'The user text field is required']
  },
  address: {
    type: String,
    required: [true, 'The user text field is required']
  },
  date: {
    type: String,
    required: [true, 'The user text field is required']
  },
  comment: {
    type: String,
    required: [true, 'The user text field is required']
  }
})

//create model for user
const Customers = mongoose.model('customers', CustomersSchema);

module.exports = Customers;
