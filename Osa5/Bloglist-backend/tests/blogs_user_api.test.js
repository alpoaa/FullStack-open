const bcrypt     = require('bcrypt')
const mongoose   = require('mongoose')
const supertest  = require('supertest')
const testHelper = require('../tests/test_helper')
const app        = require('../app')
const api        = supertest(app)
const User       = require('../models/user')

beforeEach(async() => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const testUser     = new User({ username: 'root', passwordHash: passwordHash })

    await testUser.save()
})

describe('API tests relating to POST- method', () => {
    test('Create user', async() => {
        const usersBefore = await testHelper.usersInDb()

        const testUser = testHelper.testUser

        await api
            .post('/api/users')
            .send(testUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAfter = await testHelper.usersInDb()
        expect(usersAfter).toHaveLength(usersBefore.length + 1)

        const usernames = usersAfter.map(user => user.username)
        expect(usernames).toContain(testUser.username)
    })

    test('Username not unique', async() => {
        const usersBefore = await testHelper.usersInDb()

        const testUser = {
            username: 'root',
            password: 'salasana'
        }

        const result = await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('User validation failed')

        const usersAfter = await testHelper.usersInDb()
        expect(usersAfter).toHaveLength(usersBefore.length)
    })

    test('Username not long enough', async() => {
        const testUser = testHelper.testUserInvalidUsername

        const result = await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('User validation failed')
    })

    test('Password not long enough', async() => {
        const testUser = testHelper.testUserInvalidPassword

        const result = await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('Password not long enough')
    })
})