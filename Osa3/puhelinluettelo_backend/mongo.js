const mongoose = require('mongoose')

const dbPassword      = process.argv[2]
const addPersonName   = process.argv[3]
const addPersonNumber = process.argv[4]
const url             = `mongodb+srv://admin:${dbPassword}@hyfullstackopen.kihwkni.mongodb.net/phonebook?retryWrites=true&w=majority`

if (!dbPassword) {
    console.log('Give database password as argument')
    process.exit(1)
}

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number : String
})

const Person = mongoose.model('Number', personSchema)

if (process.argv.length > 3) {
    const person = new Person({
        name: addPersonName,
        number: addPersonNumber
    })

    person.save()
        .then(dbResult => {
            console.log('new number added!')
            mongoose.connection.close()
        })
} else {
    Person.find({})
        .then(dbResult => {
            dbResult.forEach(person => {
                console.log(person)
            })
            mongoose.connection.close()
        })
}
