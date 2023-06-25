const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  phoneNumber: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 15,
  },
});

const Contact = mongoose.model("Contact", schema);
module.exports = Contact;
