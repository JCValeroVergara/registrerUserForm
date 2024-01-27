const express = require('express');
const cors = require('cors');
const moragn = require('morgan');
const routerApi = require('./routes/index');


const app = express();


// Middlewares
app.use(cors());
app.use(moragn('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
routerApi(app);

module.exports = app;
