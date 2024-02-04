const config      = require('./utils/config')
const express     = require('express')
const cors        = require('cors')
const mongoose    = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger      = require('./utils/logger')
const middleware  = require('./utils/middleware')
const app         = express()

mongoose.set('strictQuery', false)

logger.info('connecting to database:', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to database successfully')
    })
    .catch((error) => {
        logger.error('error connecting to database:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLog)
app.use(middleware.requestTokenExtractor)

//removed user extractor middleware for all the blogsrouter functions app.use('/api/blogs', middleware.requestUserExtractor, blogsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app