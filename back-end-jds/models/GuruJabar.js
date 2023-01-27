const mongoose = require('mongoose');

const GuruJabarSchema = mongoose.Schema({
  nama_kabupaten_kota: {
    type: String,
    required: true,
  },
  jenis_kelamin: {
    type: String,
    required: true,
  },
  jumlah_guru: {
    type: String,
    required: true,
  },
  tahun_ajaran: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('GuruJabar', GuruJabarSchema);
