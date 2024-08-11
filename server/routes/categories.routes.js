const router = require('express').Router()
const { Category } = require("../db/models")

router.get('/', async (req, res) => {

    try {
        const categoryAll = await Category.findAll()
        res.json(categoryAll)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})




module.exports = router