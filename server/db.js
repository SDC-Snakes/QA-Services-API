require('dotenv').config();
const pgp = require('pg-promise')();
const path = require('path');
const fs = require('fs');

const cn = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER
};

const db = pgp(cn);

// const schemaPath = path.join(__dirname, '../dbSetup.sql');
// const schemaQuery = fs.readFileSync(schemaPath).toString();

// db
//   .query(schemaQuery)
//   .then((res) => console.log(res))
//   .catch((err) => {
//     console.log(err);
//     // throw new Error('Error creating tables', err);
//   });

module.exports = db;