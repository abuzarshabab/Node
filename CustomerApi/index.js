const mongoose = require('mongoose')
const express = require('express');
const customerRoute = require('./routes/customers')

const app = express()

const PORT = process.env.PORT || 8080;
const mongoURI = 'mongodb://localhost/customers';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Connection Failed', 'err'))


app.use(express.json())
app.use('/customer', customerRoute)

app.listen(PORT, () => console.log('App is Listening On Port :', PORT))