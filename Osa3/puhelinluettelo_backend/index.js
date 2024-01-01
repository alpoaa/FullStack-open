require('dotenv').config()

const express = require('express')
const morgan  = require('morgan')
const app     = express()
const cors    = require('cors')
const Number  = require('./models/numbers')

const errorHandler = (error, request, response, next) => {
    console.log(error)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'Malformatted id'})
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'Unknown endpoint'})
}

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = []

//const generateNewPersonId = () => Math.floor(Math.random() * 1000)

app.get('/', (request, response) => {
    response.send('<h4>Osa3<h4>')
})

app.get('/api/persons', (request, response) => {
    //response.json(persons)
    Number.find({})
        .then(persons => {
            response.json(persons)
        })
})

app.get('/info', (request, respomse) => {
    const currentDate   = new Date()

    Number.find({})
        .then(numbers => {
            respomse.send(`<p>Phonebook has info for ${numbers.length} people</p><p>${currentDate}</p>`)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    Number.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
    /*
    const personId = Number(request.params.id)
    const person   = persons.find(person => person.id === personId)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    */
})

app.post('/api/persons', (request, response) => {
    const requestBody = request.body

    if (!requestBody) {
        return response.status(400).json({error: 'no request body'})
    }

    if (!requestBody.name || !requestBody.number) {
        return response.status(400).json({error: 'missing name or number'})
    }

    const personExists = persons.find(person => person.name === requestBody.name)

    if (personExists) {
        return response.status(400).json({error: 'number already exists'})
    }
  
    const newPerson = new Number({
        name: requestBody.name,
        number: requestBody.number,
    })

    //persons = persons.concat(newPerson)
    newPerson.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Number.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
    /*
    const personId = Number(request.params.id)
    const person   = persons.find(person => person.id === personId)

    if (person) {
        persons = persons.filter(person => person.id !== personId)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
    */
})

app.put('/api/persons/:id', (request, response, next) => {
    const requestBody = request.body

    const updatedPerson = {
        name: requestBody.name,
        number: requestBody.number
    }

    Number.findByIdAndUpdate(request.params.id, updatedPerson, {new: true})
        .then(updatePerson => {
            response.json(updatePerson)
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})