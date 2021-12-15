const config = require('config');
const express = require('express');
const coursesRoute = require('./routes/courses')
const app = express();
const Joi = require('joi');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const homeRoute = require('./routes/homepage');
// const pug = require('pug')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'))

app.use('/api/courses', coursesRoute);
app.use('/', homeRoute)

/* Configuration */
console.log('App  Name : ' + config.get('name'))
console.log('password of mail server ' + config.get('mail.host'))

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan Enabled')
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening on port : ${PORT}`));