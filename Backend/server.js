const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://${process.env.USER_NAME}:${process.env.USER_ID}.afmfbok.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
