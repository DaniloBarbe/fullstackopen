const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://danilobarbe4_db_user:${password}@fullstackopen.8ph8xln.mongodb.net/`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {

  Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})

}else if (process.argv.length === 5 ) {


const person = new Person({
  name: name,
  number: number,
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})

}