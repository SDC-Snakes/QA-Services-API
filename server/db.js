// const path = require('path');
// const fs = require('fs');

const cn = {
  // host: 'localhost',
  port: 5432,
  database: 'mymac',
  // user: 'mymac'
};

// const schemaPath = path.join(__dirname, 'dbSetup.sql');
// const schemaQuery = fs.readFileSync(schemaPath).toString();

// db
//   .query(schemaQuery)
//   .then((res) => console.log(res))
//   .catch((err) => {
//     console.log(err);
//     // throw new Error('Error creating tables', err);
//   });

module.exports = db;