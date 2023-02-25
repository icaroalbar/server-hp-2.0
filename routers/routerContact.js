const sendController = require('../controllers/sendController');
const router = require('express').Router()

router.post('/telegram', sendController.telegram)
router.post('/sendMail', sendController.sendMail)
router.post('/database', sendController.database)

module.exports = router