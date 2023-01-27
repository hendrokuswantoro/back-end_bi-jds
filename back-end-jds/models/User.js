const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    max: 100,
  },
  nama_kabupaten_kota: {
    type: String,
    required: true,
  },
  jenis_kelamin: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
});

module.exports = mongoose.model('User', userSchema);
