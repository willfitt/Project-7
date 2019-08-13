const express = require('express');
const app = express();
const path = require('path');
const db = require('./query');

const port = process.env.PORT || 5432;

app.use(express.json);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('createUser')
});

app.get('/userList', db.getUsers);

app.get('/user/edit/:id', db.getUserById);

app.post('/createUser', db.createUser, (req, res) => {
    res.redirect('/userList')
});

// app.post('/sortUser', db.sortUser); implement??

// app.post('/findUsers', db.findUsers, (req, res) => {
//         res.render('userListing');
// });  implement?

app.post('/editUser/:id', db.updateUser, (req, res) => {
    res.redirect('/userList')
});

app.post('/deleteUser/:id', db.deleteUser, (req, res) => {
    res.redirect('/userList')
});


app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`App Server listen on port: ${port}`);
});