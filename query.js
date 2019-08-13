const Pool = require('pg').Pool;
const connectionString = process.env.DATABASE_URL;

console.log(`DATABASE_URL: ${connectionString}`);


const pool = new Pool({
    connectionString: connectionString,
});

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    const { fName, lName, email, age } = req.body;
    console.log(`${fName}, ${lName}, ${email},${age}`);

    let userAge = parseInt(age, 10);
    if (isNaN(userAge)) {
        userAge = 0;
    }

    pool.query('INSERT INTO users (fName, lName, email, age) VALUES ($1, $2, $3, $4) RETURNING *', [fName, lName, email, userAge], (err, results) => {
        if (err) {
            throw err
        }
        console.log(`id: ${JSON.stringify(results.rows[0])}`);  //id: {"id":9,"name":"Peter","age":25,"email":"pjohnson@mtech.org"}
        res.status(201).send(`User added with ID: ${results.rows[0].id}  `)
    })
}

const updateUser = (req, res) => {
    const id = parseInt(req.body.id);
    const { fName, lName, email, age } = req.body;
    let userAge = parseInt(age, 10);

    pool.query(
        'UPDATE users SET fName = $1, lName = $2 , email = $2, age = $3 WHERE id = $5',
        [fName, lName, email, userAge, id],
        (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (req, res) => {
    const id = parseInt(req.body.userId);
    console.log(`deleteUser id: ${id}`);


    pool.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}