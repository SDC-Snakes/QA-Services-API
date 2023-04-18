const express = require('express');
const router = express.Router();
const controller = require('./controllers.js');

// optional route
router.get('/qa/questions/:question_id/answers/:answer_id/photos', controller.getPs);

// GET
router.get('/qa/questions/:question_id/answers', controller.getAs);
router.get('/qa/questions', controller.getQs);

// POST
router.post('/qa/questions', controller.postQ);
router.post('/qa/questions/:question_id/answers', controller.postA);

// PUT
router.put('/qa/questions/:question_id/helpful', controller.putQH);
router.put('/qa/questions/:question_id/report', controller.putQR);
router.put('/qa/questions/:answer_id/helpful', controller.putAH);
router.put('/qa/questions/:answer_id/report', controller.putAR);


module.exports = router;