const express = require('express');
const router = express.Router();
const controller = require('./controllers.js');

router.get('/qa/questions/:question_id/answers/:answer_id/photos', controller.getPs);
router.get('/qa/questions/:question_id/answers', controller.getAs);
router.get('/qa/questions', controller.getQs);
// router.post('/qa/questions', controller.post);
// router.post('/qa/questions/:question_id/answers', controller.post);


module.exports = router;