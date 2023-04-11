const models = require('./models');

module.exports.getQs = (req, res) => {
  models.getQuestions(req)
    .then((data) => {
      // console.log('made it: ', data[0]);
      data[0].product_id = req.query.product_id;
      return data;
    })
    .catch((err) => {
      res.status(500).send(err);
    })
    .then((data) => {
      data[0].results.map((result, i) => {
        models.getAnswers({params: {question_id: result.question_id}})
        .then((ans) => {
          if (ans[0].answers === null) {
            data[0].results[i].answers = {};
          } else {
            data[0].results[i].answers = ans[0].answers;
          }
          // console.log(data[0].results[i]);
          return i;
        })
        .catch((err) => {
          console.log(err);
        })
        .then((i) => {
          if (i === data[0].results.length - 1) {
            res.status(200).send(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.getAs = (req, res) => {
  models.getAnswers(req)
    .then((data) => {
      console.log('made it: ', data[0]);
      res.status(200).send(data);
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

// qa/questions/:question_id/answers
// can use req.params.question_id