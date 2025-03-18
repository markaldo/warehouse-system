const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(email, hashedPassword, role);
    req.session.user = user;
    res.redirect('/sales' || '/logistics');
  } catch (err) {
    res.status(500).send('Registration failed');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).send('Invalid credentials');
    }
    req.session.user = user;
    res.redirect('/sales' || '/logistics');
  } catch (err) {
    res.status(500).send('Login failed');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('login');
  });
  
  router.get('/register', (req, res) => {
    res.render('register');
  });
  
module.exports = router;