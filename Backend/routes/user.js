const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'id name');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /users
router.post('/users', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = new User({ name, email, phone });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /users/:user_id
router.get('/users/:user_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /users/:user_id
router.put('/users/:user_id', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.user_id,
      { name, email, phone },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
   }
});

// DELETE /users/:user_id
router.delete('/users/:user_id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

