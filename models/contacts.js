const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for contact
const ContactsSchema = new Schema({
  customer_id: {
    type: String,
    required: [true, 'The contact text field is required']
  },
  user_id: {
    type: String,
    required: [true, 'The contact text field is required'],
  },
  category: {
    type: String,
    required: [true, 'The contact text field is required']
  },
  details: {
    type: String,
    required: [true, 'The contact text field is required']
  },
  timestamp: {
    type: String,
    required: [true, 'The contact text field is required']
  }
})

//create model for contact
const Contacts = mongoose.model('contacts', ContactsSchema);

module.exports = Contacts;
