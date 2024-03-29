const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//import validation
const { registerValidation } = require('../configs/validation');

// import models
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).json({
      status: res.statusCode,
      message: error.details[0].message,
    });

  // If email exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json({
      status: res.statusCode,
      message: 'Email sudah digunakan!',
    });

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    nama: req.body.nama,
    email: req.body.email,
    nama_kabupaten_kota: req.body.nama_kabupaten_kota,
    jenis_kelamin: req.body.jenis_kelamin,
    password: hashPassword,
  });

  //create user
  try {
    const saveUser = await user.save();
    res.json(saveUser);
  } catch (err) {
    res.status(400).json({
      status: res.statusCode,
      message: 'Gagal membuat user baru!',
    });
  }
});

// login
router.post('/login', async (req, res) => {
  // if email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({
      status: res.statusCode,
      message: 'Email Anda Salah!',
    });

  // check password
  const validPwd = await bcrypt.compare(req.body.password, user.password);
  if (!validPwd)
    return res.status(400).json({
      status: res.statusCode,
      message: 'Password Anda Salah!',
    });

  // token jwt
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.header('auth-token', token).json({
    token: token,
  });
});

module.exports = router;
