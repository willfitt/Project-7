const Pool = require("pg").Pool;
const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/Users";

console.log(`DATABASE_URL: ${connectionString}`);
// console.log('der', process.env)

const pool = new Pool({
  connectionString: connectionString
});

const getUsers = () =>
  pool
    .query("SELECT * FROM users ORDER BY id ASC")
    .then(response => response.rows);

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  return pool
    .query("SELECT * FROM users WHERE id = $1", [id])
    .then((response => response.rows[0]));
};

const createUser = (req, res) => {
  const { fName, lName, email, age } = req.body;
  console.log("createuser", `${fName}, ${lName}, ${email},${age}`);

  let userAge = parseInt(age, 10);
  if (isNaN(userAge)) {
    userAge = 0;
  }

  return pool
    .query(
      'INSERT INTO users ("fName", "lName", email, age) VALUES ($1, $2, $3, $4) RETURNING *',
      [fName, lName, email, userAge]
      // (err, results) => {
      //   if (err) {
      //     throw err;
      //   }
      //   console.log(`id: ${JSON.stringify(results.rows[0])}`);
      //   return results.rows;
    )
    .then(response => response.rows);
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { fName, lName, email, age } = req.body;
  let userAge = parseInt(age, 10);
  console.log(req.params)

  return pool
    .query(
      'UPDATE users SET "fName" = $1, "lName" = $2 ,email = $3, age = $4  WHERE id = $5',
      [fName, lName, email, userAge, id]
    )
    .then(response => response.rows);
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`deleteUser id: ${id}`);

  return pool
    .query(
      "DELETE FROM users WHERE id = $1", [id]
    )
    .then(response => response.rows);
};

const findUser = (req, res) => {
  const name = req.body.name
  console.log(name)
  if (name === '') {
    return pool
      .query("SELECT * FROM users ORDER BY id ASC")
      .then(response => response.rows);
  } else {
    return pool
      .query(`SELECT * FROM users WHERE "fName" = $1 OR "lName" = $1`, [name])
      .then(response => response.rows);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  findUser
};
