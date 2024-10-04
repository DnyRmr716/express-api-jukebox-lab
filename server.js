const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');


const Track = require('./models/Track');
const trackRoutes = require('./controllers/tracks'); 


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(cors());
app.use(methodOverride('_method'));

// Routes go here

app.get('/', (req, res) => {
    res.send('Welcome to the Jukebox API!');
});
  

app.use('/tracks', trackRoutes);


app.listen(3000, () => {
  console.log('The express app is ready!');
});
