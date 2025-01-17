const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const authRoutes = require('./routes/authroutes');
const transactionRoutes = require('./routes/transactions');
const postsRouter= require('./routes/postroutes')
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const mongoURL = process.env.MONGOURL;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));

app.use(bodyParser.json());

// Use cors middleware
app.use(cors());


app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);
app.use('/posts', postsRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
