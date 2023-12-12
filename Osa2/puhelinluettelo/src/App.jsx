import { useState } from 'react'
import Header from './components/Header'
import AddPersonForm from './components/AddPersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personAdded = persons.find((person) => person.name === newName)
    
    if (personAdded) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name : newName,
        number: newNumber
      }

      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Header text={'Phonebook'} />
      <AddPersonForm 
        formSubmit={addPerson} 
        nameValue={newName} 
        nameChange={handlePersonChange} 
        numberValue={newNumber} 
        numberChange={handleNumberChange} />
      <Header text={'Numbers'} />
      <Numbers persons={persons}/>
    </div>
  )

}

export default App