const express = require('express');
const mongoose = require('mongoose'); 
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://greg:xyacbx328er@cluster0-mppl3.mongodb.net/app?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);