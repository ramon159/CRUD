const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

//
const log = (...arg) => console.log(...arg)

//Template engine
app.engine("handlebars", handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars');

//routes and templates
app.get('/:id?', (req, res) => {
    res.render('index', {id:req.params.id})
/*     console.log(req.params.id) */
});

//start server
app.listen(port, (req, res) => {
    log('funfando')
})
app.get('/', (req, res) => {})