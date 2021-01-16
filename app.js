const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

//
const log = (...arg) => console.log(...arg);

//Template engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
/* app.use('/css', express.static('css'))
app.use('/js', express.static('js')) */

//routes and templates
app.get('/javascript', (req, res) => {
    res.sendFile(__dirname + '/js/javascript.js');
});

app.get('/style', (req, res) => {
    res.sendFile(__dirname + '/css/style.css');
});

app.get('/insert', (req, res) => {res.render('insert')});
app.get('/delete', (req, res) => {res.render('delete')});
app.get('/update', (req, res) => {res.render('update')});
app.get('/read', (req, res) => {res.render('read')});
app.post('/controllerForm', (req, res) => {res.render('controllerForm')})
app.get('/', (req, res) => {
    res.render('index', { id: req.params.id });
    /*     console.log(req.params.id) */
});

//start server
app.listen(port, (req, res) => {
    log('funfando');
});
app.get('/', (req, res) => {});
