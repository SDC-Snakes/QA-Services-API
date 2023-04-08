const models = require('./models');

module.exports.get = (req, res) => {
  models.getQuestions()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// module.exports.post = (req, res) => {
//   models.postAnswer()
//     .then((results) => {
//       res.status(200).send(results);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// };