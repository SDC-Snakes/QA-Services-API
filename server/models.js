const db = require('./db');

module.exports.getQuestions = () => {
  const queryString = 'SELECT * FROM question LIMIT 5';
  return db.any(queryString);
};