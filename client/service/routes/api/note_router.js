var router = require('koa-router')();
var note_controller = require('../../controllers/note_controller.js');

router.post('/addNote', note_controller.addNote);
router.post('/deleteNote', note_controller.deleteNote);
router.post('/updateNote', note_controller.updateNote);
router.get('/getNote/:type/:query', note_controller.getNote);
router.get('/getNote/:type/:query/:row', note_controller.getNoteList);
router.get('/permission', note_controller.getPermission);

module.exports = router;
