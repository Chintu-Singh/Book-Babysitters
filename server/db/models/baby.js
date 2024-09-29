const mongoose = require('mongoose'),
  validator = require('validator');

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['< 1', '1-3', '3-5', '> 5']
    },
    description: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    feeding: {
      type: String
    },
    cleaning: {
      type: String
    },
    exercise: {
      type: String
    },
    medical: {
      type: String
    },
    additional: {
      type: String
    },
    emergency: {
      type: String
    },
    links: [{ text: String, url: String }],
    events: [
      {
        title: String,
        start: String,
        end: String,
        allDay: Boolean
      }
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
