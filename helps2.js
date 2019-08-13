const express = require('express');
const path = require('path');
const app = express();
const db = require('./query');

// this need 'dotenv'
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/testAPI', (req, res) => {
    res.json([
        { Title: "Express, pg, REST API Demo" },
        { create: "curl --data 'name=John&age=23&email=jsmith@mtech.org' http://localhost:3000/users" },
        { read: "curl http://localhost:3000/users/<USER_ID>" }
    ]);
});
app.get('/', (req, res) => {
    res.render('index.html')
});
app.get('/create', (req, res) => {
    res.render('create')
});
app.get('/create', (req, res) => {
    res.send('createUser')
});
app.get('/delete', (req, res) => {
    res.render('delete')
});
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/addUser', db.createUser)
app.post('/updateUser', db.updateUser)
app.post('/removeUser', db.deleteUser)

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}.`)
});