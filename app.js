const express = require('express');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const { isNumber } = require('util');


const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
const port = 3000;
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crud',
});

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
app.use('/img', express.static('img'))
app.get('/style', (req, res) => {
    res.sendFile(__dirname + '/css/style.css');
});

app.get('/insert', (req, res) => {
    res.render('insert');
});
app.get('/read', (req, res) => {
    sql.query("SELECT * FROM user", (error, result, fields) => {
        res.render('read', {data: result});
    })
});
app.post('/update', (req, res) => {
    const r = req.body;
    const id = r.id;
    const name = r.name;
    const age = r.age;
    console.log(id,name,age);
    if (Number.isInteger(parseInt(id)) && Number.isInteger(parseInt(age)) && name) {
        sql.query("UPDATE user set name = ?, age = ? where id = ?", [name, age, id])
        console.log(`Dados atualizados: [${id}] `, name, age)
        res.json({id: id, name: name, age: age})
    }
});
app.post('/delete', (req, res) => {
    const id = req.body.id;
    sql.query("DELETE FROM user WHERE id = ?", [id])
    log('dados deletados do ID: ', id)
    res.json({id: id})
});
app.get('/', (req, res) => {

    res.redirect('/read')
});
app.post('/controllerForm', (req, res) => {
    const r = req.body;
    const name = r.name;
    const age = r.age;
    if (Number.isInteger(parseInt(age))  && name && age > 0) {
        sql.query('insert into user (name, age) values (?,?)', [name, age]);
        console.log(`dados inseridos: ${name}, ${age}`)
        res.render('insert', {msg: " Dados inseridos com sucesso", code: 1})
    } else {
        res.render('insert', {msg: "Falha ao inserir dados", code: 0})
    }

});

//start server
app.listen(port, (req, res) => {
    log('[*] Server running...');
});
app.get('/', (req, res) => {});
