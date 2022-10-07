const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

const verifyToken = require('./verifyToken');

// CREATE
router.post('/', async (req, res) => {
  const dataPost = new Data({
    nik: req.body.nik,
    role: req.body.role,
    password: req.body.password,
  });

  try {
    const data = await dataPost.save();
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }
});

// READ
router.get('/', verifyToken, async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE
router.put('/:dataId', async (req, res) => {
  try {
    const dataUpdate = await Data.updateOne(
      { _id: req.params.dataId },
      {
        nik: req.body.nik,
        role: req.body.role,
        password: req.body.password,
      }
    );
    res.json(dataUpdate);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE
router.delete('/:dataId', async (req, res) => {
  try {
    const dataUpdate = await Data.deleteOne({ _id: req.params.dataId });
    res.json(dataUpdate);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
