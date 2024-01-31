const logger = require('./logger')

const requestLog = (request, response, next) => {
    logger.info('Method', request.method)
    logger.info('Path', request.path)
    logger.info('Body', request.body)
    logger.info('-------------')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).end({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'Malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    next(error)
}

const requestTokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    
    next()
}

module.exports = {
    requestLog, unknownEndpoint, errorHandler, requestTokenExtractor
}

