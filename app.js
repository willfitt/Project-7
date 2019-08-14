const express = require("express");
const path = require("path");
const app = express();
const db = require("./query");

const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("createUser");
});

app.get("/userListing", (req, res) => {
  db.getUsers()
    .then(users => {
      res.render("userListing", { users: users });
    });
});

app.get("/user/edit/:id", (req, res) => {
  db.getUserById(req)
    .then(user => {
      res.render("editUser", { editUser: user });
    });
});

app.post("/createUser", (req, res) => {
  db.createUser(req, res).then(() => res.redirect("/userListing"));
});

// app.post('/sortUser', db.sortUser); implement??

// app.post('/findUsers', db.findUsers, (req, res) => {
//         res.render('userListing');
// });  implement?

app.post("/editUser/:id", db.updateUser, (req, res) => {
  res.redirect("/userListing");
});

app.post("/deleteUser/:id", db.deleteUser, (req, res) => {
  res.redirect("/userListing");
});

app.listen(port, () => {
  console.log(`App Server listen on port: ${port}`);
});
