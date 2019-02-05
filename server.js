const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// connecting the users file
const users = require('./routes/api/users');

const app = express();

// Adding Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connecting to mongoDB through mongoose
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));

// Creating the Passport MiddleWare
app.use(passport.initialize()); 

// Passport Config
require('./config/passport')(passport); // using the JWT strategy

// Use Routes, initializing the connection
app.use('/api/users', users);

// Server static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }); 
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));