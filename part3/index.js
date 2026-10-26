require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :body'))

app.get('/api/persons', (request, response, next) => {
    Person.find({})
    .then(persons => response.json(persons))
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }) 
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    const now = new Date()

    Person.find({})
    .then(persons => {
        response.send(
        `<div>
          <p>Phonebook has info for ${persons.length} people</p>
          <p>${now.toString()}</p>
        </div>`
      )
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request,response,next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
    .then(result => {
          console.log('Resultado do DELETE:', result)
        response.status(204).end()
    })
    .catch(error => next(error))

    })

app.post('/api/persons', (request,response,next) => {
   
    const body = request.body

    if (!body.name || !body.number  ){
        return response.status(400).json({
            error:"name or number is missing"
        })
     }
    const person = new Person ({ 
        name: body.name,
        number: body.number
    })

  person.save()
  .then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndUpdate(request.params.id, {number: request.body.number}, { new: true })
    .then(person => {
        if(person){
        console.log('Resultado do UPDATE:', person)
        response.json(person)
        }else{
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
}) 
