const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/auth', './auth.routes')
router.use('/comment', './comment.routes')
router.use('/quality', './quality.routes')
router.use('/profession', './profession.routes')
router.use('/user', './user.routes')

module.exports = router
