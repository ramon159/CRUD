const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const { isNumber } = require('util');
const urlEncodeParser = bodyParser.urlencoded({ extended: false });
const app = express();
const port = 3000;
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crud',
});
sql.query('use crud');
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

app.get('/insert', (req, res) => {
    res.render('insert');
});
app.get('/delete', (req, res) => {
    res.render('delete');
});
app.get('/update', (req, res) => {
    res.render('update');
});
app.get('/read', (req, res) => {
    res.render('read');
});
app.get('/', (req, res) => {

    res.render('index', {id: 30});
});
app.post('/controllerForm', urlEncodeParser, (req, res) => {
    const r = req.body;
    const name = r.name;
    const age = r.age;
    if (!isNaN(age) && name) {
        sql.query('insert into user (name, age) values (?,?)', [name, age]);
        console.log(`dados inseridos: ${name}, ${age}`)
        res.render('insert', {msg: " Dados inseridos com sucesso", code: 1})
    } else {
        res.render('insert', {msg: "Falha ao inserir dados", code: 0})
    }


});

//start server
app.listen(port, (req, res) => {
    log('funfando');
});
app.get('/', (req, res) => {});
