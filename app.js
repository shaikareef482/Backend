const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const bodyParser= require('body-parser');

const placesRouter= require('./routes/places-routes');
const userRouter = require('./routes/users-routes')
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-with,Content-Type,Accept,Authorization'
    );
    res.setHeader('Access-control-Allow-Methods','GET,POST,PATCH,DELETE');
    next();
})

app.use('/api/places',placesRouter); //=> /api/place/..
app.use('/api/users',userRouter);

app.use((req,res,next)=>{
    const error = new HttpError('could not find this route',404);
    throw error;
})


app.use((error, req, res, next) => {
    if (req.file) {
      fs.unlink(req.file.path, err => {
        console.log(err);
      });
    }
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });


mongoose.connect('mongodb+srv://Areef081:Areef123@cluster0.8ygy7sy.mongodb.net/mern?retryWrites=true&w=majority').then(()=>{
    app.listen(5000);
}).catch(err=>{
    console.log(err);
})
