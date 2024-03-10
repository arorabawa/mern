const express = require('express');
const mongoose = require('mongoose'); //depriciated
// const { MongoClient, ServerApiVersion } = require('mongodb');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

const app = express();

require('./models/User');
require('./services/passport');


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]    
  })
);
app.use(passport.initialize());
app.use(passport.session());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

require('./routes/authRoutes')(app);

const port = process.env.PORT || 3000; //want known
app.listen(port)
