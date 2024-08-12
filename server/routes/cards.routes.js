const router = require('express').Router()
const { Card } = require('../db/models')

router.route('/')
    .get(async (req, res) => {
        try {
            const cardsAll = await Card.findAll()
            console.log({ cardsAll });
            res.json(cardsAll)

        } catch (error) {
            res.status(500).json({ error: error.message })
        }

    })
    .post(async (req, res) => {
        try {
            const { title, description, price, image, category_id, user_id } = req.body
            const postCard = await Card.create({ title, description, price, image, category_id, user_id })
            console.log(postCard);

            res.status(201).json(postCard)

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })

router.route('/:id')
    .put(async (req, res) => {

        try {
            const { title, description, price, image, category_id, user_id } = req.body
            // const {id} = req.params
            console.log(req.params);
            const updateCard = await Card.update(title, description, price, image, category_id, user_id, { where: { id } })
            res.json(updateCard)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const { id } = req.params
            const delCard = await Card.destroy({ where: { id } })
            res.json(delCard)

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })


module.exports = router