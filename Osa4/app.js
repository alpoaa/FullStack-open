const config      = require('./utils/config')
const express     = require('express')
const cors        = require('cors')
const mongoose    = require('mongoose')
const blogsRouter = require('./controllers/blogs')
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
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)

module.exports = app