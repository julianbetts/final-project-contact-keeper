const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const contactSchema = new Schema({
  contactText: {
    type: String,
    required: 'You need to leave a contact',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  contactAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Contact = model('Contact', contactSchema);

module.exports = Contact;
