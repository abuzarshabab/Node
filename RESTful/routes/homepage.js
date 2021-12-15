const homeRoute = require('express').Router()

homeRoute.get('/', (req, res) => {
    res.render('index', { message: "Hello Express", title: "Homepage" });
});

module.exports = homeRoute;