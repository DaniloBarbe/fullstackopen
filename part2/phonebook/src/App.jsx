import { useEffect, useState } from 'react'
import axios from 'axios'

const List = ({name,number}) =>{
  return(
    <div>{name} {number}</div>
  )
}

const Filter = ({showName,handleFilterChange}) => {
  return(
      <div>
          <h2>Phonebook</h2>
        <div>
          filter: <input value={showName} onChange={handleFilterChange}/>
        </div>
      </div>
  )
}

const PersonForm = ({addName,newName,newNumber,handleNameChange,handleNumberChange}) =>{
  return(
    <div>
          <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>  
  )
}

const Person = ({personsToShow}) => {
  return(
  <div>
    <h2>Numbers</h2>
        {personsToShow.map(person => 
        <List key={person.name} name={person.name} number={person.number}/>)
        }
  </div>   
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showName, setShowName] = useState('')

  useEffect(() =>{
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log("deu certo")  
      setPersons(response.data)
    })
  },[])


  const addName = (event) =>{
    event.preventDefault()
    const personObject = {
      name: newName, 
      number: newNumber
    }
    persons.some((person) => person.name === personObject.name)
    ? alert(`${newName} is already added to phonebook`) 
    : setPersons(persons.concat(personObject)) 
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event)=>{
    setShowName(event.target.value)
  }

  const personsToShow = showName
    ? persons.filter(person=>person.name.toLowerCase().includes(showName.toLowerCase()))
    : persons
  

  console.log(persons)
  return (
    <div>

      <Filter showName={showName} handleFilterChange={handleFilterChange} />
      <PersonForm addName={addName}newName={newName}
      newNumber={newNumber}handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}/>
      <Person personsToShow={personsToShow}/>
    </div>
  )
}

export default App