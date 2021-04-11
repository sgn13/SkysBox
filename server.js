const express = require('express');
const path =require('path');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(express.static('uploads'));

//Bodyparser Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()) ;
app.use(express.static('public/uploads'));
  
//DB Config
const db = config.get('mongoURI');

//Connect to Mongo
mongoose.connect(db,{
  useNewUrlParser: true,
  useCreateIndex : true,
  useUnifiedTopology: true
})
  .then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


//Use Routes  
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/img',require('./routes/api/img'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));