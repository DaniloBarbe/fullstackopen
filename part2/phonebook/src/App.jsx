import { useEffect, useState } from 'react'
import personsService from './services/persons' 
import Notification from './components/Notification'

const List = ({name,number,id,deleteName}) =>{
  return(
    <div>
    {name} {number} <button onClick={() => deleteName(id)}>delete</button>
    </div>
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

const PersonForm = ({showNotfication,addName,newName,newNumber,handleNameChange,handleNumberChange}) =>{
  return(
    <div>
          <h2>Add a new</h2>
          < Notification message={showNotfication?.message} estate={showNotfication?.estate}/>
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

const Person = ({personsToShow, deleteName}) => {
  return(
  <div>
    <h2>Numbers</h2>
        {personsToShow.map(person => 
        <List key={person.id} name={person.name} number={person.number} id={person.id} deleteName={deleteName}/>)
        }
  </div>   
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showName, setShowName] = useState('')
  const [showNotfication,setShowNotification] = useState(null)

  useEffect(() =>{
    personsService.getAll()
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
    const resultado = persons.find((person) => person.name === personObject.name)
    if(resultado){
     if(window.confirm(`${newName}já existe. Deseja substituir o número?`)){
        personsService.updatePerson(personObject, resultado.id)
        .then(response => {
          setPersons(persons.map(person => person.id === response.data.id? response.data : person))
          setNewName('')
          setNewNumber('')  
          
          setShowNotification({
            message : `Addded ${newName}`,
            estate : "success"})
          setTimeout(() => {
            setShowNotification(null)
          }, 2000)
          
        })
         .catch(() => {
        setShowNotification({
          message : `This contact has already been deleted and can no longer be updated.`,
          estate : "error"})
          setPersons(persons.filter(person => person.id !== resultado.id))
        setTimeout(()=> {
          setShowNotification(null)
        }, 2000)

      }) 
      }
    }else{ personsService.create(personObject)
      .then(response => { 
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('') 

        setShowNotification({
            message : `Addded ${newName}`,
            estate : "success"})
          setTimeout(() => {
            setShowNotification(null)
          }, 2000)
        
      })
    }}

  const deleteName = (id) =>{
    if(window.confirm('Tem certeza?')){
      personsService.deletePerson(id)
      .then(()=> {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(() => {
        setShowNotification({
          message : `This contact has already been deleted and can no longer be updated.`,
          estate : "error"})
        setTimeout(()=> {
          setShowNotification(null)
        }, 2000)
         setPersons(persons.filter(person => person.id !== id))
      })  
    }  
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
      <PersonForm showNotfication={showNotfication}addName={addName}newName={newName}
      newNumber={newNumber}handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} />
      <Person personsToShow={personsToShow} deleteName={deleteName}/>
    </div>
  )
}

export default App