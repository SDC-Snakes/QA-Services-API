const express = require('express');
const router = express.Router();
const controller = require('./controllers');

router.get('/qa/questions', controller.getQs);
// router.post('/qa/questions', controller.get);
router.get('/qa/questions/:question_id/answers', controller.getAs);
// router.post('/qa/questions/:question_id/answers', controller.get);

module.exports = router;