const express = require('express');
const router = express.Router();
const GuruJabar = require('../models/GuruJabar');

const verifyToken = require('../routes/verifyToken');

// CREATE
router.post('/', async (req, res) => {
  const guruJabarPost = new GuruJabar({
    nama_kabupaten_kota: req.body.nama_kabupaten_kota,
    jenis_kelamin: req.body.jenis_kelamin,
    jumlah_guru: req.body.jumlah_guru,
    tahun_ajaran: req.body.tahun_ajaran,
  });

  try {
    const guruJabar = await guruJabarPost.save();
    res.json(guruJabar);
  } catch (err) {
    res.json({ message: err });
  }
});

// READ
router.get('/', verifyToken, async (req, res) => {
  try {
    const guruJabar = await GuruJabar.find();
    res.json(guruJabar);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE
router.put('/:guruJabarId', async (req, res) => {
  try {
    const guruJabarUpdate = await GuruJabar.updateOne(
      { _id: req.params.guruJabarId },
      {
        nama_kabupaten_kota: req.body.nama_kabupaten_kota,
        jenis_kelamin: req.body.jenis_kelamin,
        jumlah_guru: req.body.jumlah_guru,
        tahun_ajaran: req.body.tahun_ajaran,
      }
    );
    res.json(guruJabarUpdate);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE
router.delete('/:guruJabarId', async (req, res) => {
  try {
    const guruJabarUpdate = await GuruJabar.deleteOne({ _id: req.params.dataId });
    res.json(guruJabarUpdate);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
