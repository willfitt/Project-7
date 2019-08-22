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

app.get('/findUser', (req, res) => {
  db.findUser(req)
    .then(users => {
      res.render("userListing", { users: users });
    });
});

app.post("/createUser", (req, res) => {
  db.createUser(req, res)
    .then(() => res.redirect("/userListing"));
});


app.post("/editUser/:id", (req, res) => {
  db.updateUser(req, res)
    .then((req) => res.redirect("/userListing"));
});

app.post("/deleteUser/:id", (req, res) => {
  db.deleteUser(req, res)
    .then(() => res.redirect("/userListing"));
});

app.listen(port, () => {
  console.log(`App Server listen on port: ${port}`);
});
