var router = require('koa-router')();
var travelNotes_contolller = require('../../controllers/travelNotes_contolller.js');

router.get('/travelNotes/list', travelNotes_contolller.getList);
router.post('/travelNotes/add', travelNotes_contolller.addTravelNotes);
router.post('/travelNotes/update', travelNotes_contolller.updateTravelNotes);
router.post('/travelNotes/upload', travelNotes_contolller.upload);

module.exports = router;
