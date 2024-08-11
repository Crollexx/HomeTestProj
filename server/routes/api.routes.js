const router = require('express').Router()
const authRouter = require('./auth.routes')
const cardsRouter = require('./cards.routes')
const categoryRouter = require('./categories.routes')

router.use('/', authRouter)
router.use('/card', cardsRouter)
router.use('/category', categoryRouter)



module.exports = router