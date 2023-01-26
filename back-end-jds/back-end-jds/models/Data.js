const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
  nik: {
    type: String,
    required: true,
    value: 16,
  },
  role: {
    type: String,
    required: true,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 1024,
  },
});

module.exports = mongoose.model('Data', DataSchema);
