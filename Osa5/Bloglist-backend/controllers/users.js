const bcrypt      = require('bcrypt')
const usersRouter = require('express').Router()
const User        = require('../models/user')

usersRouter.post('/', async(request, response, next) => {
    const { username, name, password } = request.body

    if (password.length < 3) {
        return response.status(400).json({error: 'Password not long enough'})
    }

    const hashSaltRounds = 10
    const passwordHash   = await bcrypt.hash(password, hashSaltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })
    try {
        const savedUser = await newUser.save()
        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }

})

usersRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1})

    response.json(users)
})

module.exports = usersRouter