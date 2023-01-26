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

  // If NIK exist
  const nikExist = await User.findOne({ nik: req.body.nik });
  if (nikExist)
    return res.status(400).json({
      status: res.statusCode,
      message: 'NIK sudah digunakan!',
    });

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    nik: req.body.nik,
    role: req.body.role,
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

// Login
router.post('/login', async (req, res) => {
  // if nik exist
  const user = await User.findOne({ nik: req.body.nik });
  if (!user)
    return res.status(400).json({
      status: res.statusCode,
      message: 'NIK Anda Salah!',
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
