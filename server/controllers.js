const models = require('./models.js');

module.exports.getQs = (req, res) => {
  models.getQuestions(req)
    .then((data) => {
      // console.log('made it: ', data[0]);
      if (req.query.product_id !== undefined) {
        data[0].product_id = req.query.product_id;
      }
      return data;
    })
    .catch((err) => {
      res.status(500).send(err);
    })
    .then((data) => {
      if (req.query.product_id === undefined) {
        res.status(200).send(data);
      }
      var i = 0;
      data[0].results.map((result) => {
        models.getAnswers({params: {question_id: result.question_id}})
        .then((ans) => {
          if (ans[0].answers === null) {
            data[0].results[i].answers = {};
            return ++i;
          } else {
            data[0].results[i].answers = ans[0].answers;
          }
          // console.log(data[0].results[i]);
          return ++i;
        })
        .catch((err) => {
          console.log(err);
        })
        .then((i) => {
          // console.log(i);
          if (i === data[0].results.length) {
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
      // console.log('made it: ', data[0]);
      var i = 0;
      Object.keys(data[0].answers).map((key) => {
        // console.log(key, i);
        models.getPhotos(key)
        .then((photoArr) => {
          // console.log(key, photoArr[0].photos);
          data[0].answers[key].photos = photoArr[0].photos === null ? [] : photoArr[0].photos;
          // console.log(data[0].answers[key])
          return ++i;
        })
        .catch((err) => {
          res.status(500).send(err);
        })
        .then((i) => {
          if (i === Object.keys(data[0].answers).length) {
            // console.log(data);
            res.status(200).send(data);
          }
        })
        .catch((err) => {
          res.status(500).send(err);
        });
      });
      // res.status(200).send(data);
    }
    )
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.getPs = (req, res) => {
  models.getPhotos(req.params.answer_id)
  .then((photoArr) => {
    // console.log(photoArr);
    res.status(200).send(photoArr);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
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