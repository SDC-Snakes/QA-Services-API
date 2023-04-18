const db = require('./db.js');

module.exports.getPhotos = async (answer_id) => {
  // console.log(answer_id);
  const queryString = answer_id === undefined ?
  ``
  :
  `SELECT
  json_agg(
    json_build_object(
      'id', id,
      'url', url
    )
  )
  AS photos
  FROM answers_photos
  WHERE answer_id = ${answer_id};`;

  return await db.any(queryString);
};


module.exports.getAnswers = async (req) => {
  // console.log(req.params);
  // const x = [1, 2, 3];
  // 'photos', ${x} /* only gives first element */
  const queryString = req.params.question_id === undefined ?
  ``
  :
  `SELECT
  json_object_agg(
    answers.id,
    json_build_object(
      'id', answers.id,
      'body', answers.body,
      'date', to_timestamp(answers.date_written/1000),
      'answerer_name', answers.answerer_name,
      'helpfulness', answers.helpful
    )
  )
  AS answers
  FROM answers
  WHERE answers.question_id = ${req.params.question_id}
  AND answers.reported = false;`;

  return await db.any(queryString);
};

module.exports.getQuestions = async (req) => {
  // console.log(req.query);
  const params = req.query;

  const queryString = params.product_id === undefined ?
  `SELECT * FROM questions LIMIT 1;`
  :
  `SELECT
  json_agg(
    json_build_object(
      'question_id', questions.id,
      'question_body', questions.body,
      'question_date', to_timestamp(questions.date_written/1000),
      'asker_name', questions.asker_name,
      'question_helpfulness', questions.helpful,
      'reported', questions.reported
    )
  )
  AS results
  FROM questions
  WHERE product_id = ${params.product_id}
  AND questions.reported = false`;

  return await db.any(queryString);
};

module.exports.postQuestion = async (req) => {
  // console.log(answer_id);
  const queryString = req.query.product_id === undefined ?
  ``
  :
  // product_id integer NOT NULL,
	// body varchar(255) NOT NULL,
	// date_written double precision NOT NULL,
	// asker_name varchar(255) NOT NULL,
  // asker_email varchar(255) NOT NULL,
	// reported boolean NOT NULL,
  // helpful integer NOT NULL
  `INSERT INTO questions
  VALUES (${req.query.product_id}, ${req.query.body}, SELECT EXTRACT(EPOCH FROM TIMESTAMP WITH TIME ZONE CURRENT_TIME), ${req.query.name}, ${req.query.email}, 0, 0)
  WHERE answers.question_id = ${req.params.question_id};`

  return await db.any(queryString);
};

module.exports.postAnswer = async (req) => {
  // console.log(answer_id);
  const queryString = req.params.question_id === undefined ?
  ``
  :
  // id    |       question_id     |   body           | date_written       |  answerer_name  |   answerer_email |   r | h
  `INSERT INTO answers
  VALUES (${req.params.question_id}, ${req.query.body}, SELECT EXTRACT(EPOCH FROM TIMESTAMP WITH TIME ZONE CURRENT_TIME), ${req.query.name}, ${req.query.email}, 0, 0)
  WHERE answers.question_id = ${req.params.question_id};`

  return await db.any(queryString);
};
