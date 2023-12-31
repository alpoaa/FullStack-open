require('dotenv').config()

const express = require('express')
const morgan  = require('morgan')
const app     = express()
const cors    = require('cors')
const Number  = require('./models/numbers')

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
    const phonebookSize = persons.length

    respomse.send(`<p>Phonebook has info for ${phonebookSize} people</p><p>${currentDate}</p>`)

})

app.get('/api/persons/:id', (request, response) => {
    Number.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
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

app.delete('/api/persons/:id', (request, response) => {
    const personId = Number(request.params.id)
    const person   = persons.find(person => person.id === personId)

    if (person) {
        persons = persons.filter(person => person.id !== personId)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})