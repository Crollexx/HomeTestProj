const router = require('express').Router()
const { User } = require('../db/models')

router.post('/registration', async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            return res.status(400).json({ message: "Есть пустые поля" })
        }
        console.log(req.body);
        

        const userInDb = await User.findOne({ where: { email } })

        if (userInDb) {
            return res.status(400).json({ message: "Такой пользователь уже зарегистрирован" })
        } else {
            const regUser = await User.create({name, email, password, role})
            res.json(regUser)
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/authorization', async (req, res) => {

    try {
        const { email, password } = req.body
        if (email.trim() === '' || password.trim() === '') {
            res.status(400).json({ message: "Заполните все поля" })
        }
        const user = await User.findOne({ where: { email } })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete('/logout', async (req, res) => {

})



module.exports = router