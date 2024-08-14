const router = require('express').Router()
const authRouter = require('./auth.routes')
const cardsRouter = require('./cards.routes')
const categoryRouter = require('./categories.routes')
const tokensRouter = require('./token.routes')

router.use('/', authRouter)
router.use('/card', cardsRouter)
router.use('/category', categoryRouter)
router.use('/token', tokensRouter)



module.exports = router