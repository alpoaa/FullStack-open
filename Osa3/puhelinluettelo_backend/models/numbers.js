const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const dbUrl = process.env.MONGODB_URI

console.log('Connecting to mongo database...')
mongoose.connect(dbUrl)
    .then(result => {
        console.log('Connected to mongo database successfully.')
    })
    .catch((error) => {
        console.log('Error has been raised while connecting to mongo database.', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function (number) {
                return /\d{2,3}-\d{7,8}/gm.test(number)
            },
            message: props => `${props.value} is not valid phone number. It should start with 2 or 3 numbers with separated 7 to 8 numbers.`
        },
        required: true
    },
})

personSchema.set('toJSON', {
    transform: (document, returnObj) => {
        returnObj.id = returnObj._id.toString()
        delete returnObj._id
        delete returnObj.__v
    }
})

module.exports = mongoose.model('Number', personSchema)