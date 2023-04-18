const models = require('./models.js');

module.exports.getQs = async (req, res) => {
  const data = await models.getQuestions(req);
  // console.log('made it: ', data[0]);
  if (Array.isArray(data[0].results)) {
    data[0].results = data[0].results.slice(0, req.query.count);
  }
  if (req.query.product_id !== undefined) {
    data[0].product_id = req.query.product_id;
  } else {
    res.status(200).send(data);
    return;
  }
  var i = 0;
  if (Array.isArray(data[0].results)) {
    data[0].results.map(async (result) => {
      // console.log(result);
      const ans = await models.getAnswers({params: {question_id: result.question_id}});
      // console.log(ans);
      if (ans[0].answers === null) {
        data[0].results[i].answers = {};
      } else {
        data[0].results[i].answers = ans[0].answers;
      }
      // console.log(data[0].results[i]);
      if (++i === data[0].results.length) {
        res.status(200).send(data);
      }
    });
  } else {
    res.status(200).send(data);
  }
};

module.exports.getAs = async (req, res) => {
  const data = await models.getAnswers(req);
  // console.log('made it: ', data[0]);
  var i = 0;
  Object.keys(data[0].answers).map(async (key) => {
    // console.log(key, i);
    const photoArr = await models.getPhotos(key);
    // console.log(key, photoArr[0].photos);
    data[0].answers[key].photos = photoArr[0].photos === null ? [] : photoArr[0].photos;
    // console.log(data[0].answers[key])
    if (++i === Object.keys(data[0].answers).length) {
      // console.log(data);
      res.status(200).send(data);
    }
  });
  // res.status(200).send(data);
};

module.exports.getPs = async (req, res) => {
  // console.log(req.params);
  const data = await models.getPhotos(req.params.answer_id);
  res.status(200).send(data);
  // res.status(500).send(err);
};

module.exports.postQ = (req, res) => {
  models.postQuestion(req)
    .then((results) => {
      res.status(201).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.postA = (req, res) => {
  models.postAnswer(req)
    .then((results) => {
      res.status(201).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.putAH = (req, res) => {
  models.putAnswerHelpful()
    .then((results) => {
      res.status(204);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.putAR = (req, res) => {
  models.putAnswerReport()
    .then((results) => {
      res.status(204);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.putQH = (req, res) => {
  models.putQuestionHelpful()
    .then((results) => {
      res.status(204);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.putQR = (req, res) => {
  models.putQuestionReport()
    .then((results) => {
      res.status(204);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};