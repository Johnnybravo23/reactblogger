const express = require('express');
const mongoose = require('mongoose');

// connecting the users file
const users = require('./routes/api/users');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connecting to mongoDB through mongoose
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

// Use Routes, initializing the connection
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));