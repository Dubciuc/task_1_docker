const express = require('express')
const {Pool} = require('pg')

const cors = require('cors')

const app = express()
const port = 5400

app.use(cors())

const pool = new Pool ({
    user: 'dubciuc',
    host: 'localhost',
    database: 'dubciuc',
    password: 'dubciuc',
    port: 5433
})

app.use(express.json())

app.post('/submit-form', async (req, res) => {
    try {
        const { fName, lName, age, email } = req.body;
        const query = 'INSERT INTO informatii_utilizatori ("fName", "lName", "age", "email") VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [fName, lName, age, email];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Eroare internă.');
    }
});

app.listen(port, () => {
    console.log(`Serverul rulează la adresa http://localhost:${port}`);
});