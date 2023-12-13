import { useState, useEffect } from 'react'
import service from './services/service'
import Header from './components/Header'
import AddPersonForm from './components/AddPersonForm'
import Numbers from './components/Numbers'
import Filter from './components/Filter'


const App = () => {
  
  const [persons, setPersons]       = useState([])
  const [newName, setNewName]       = useState('')
  const [newNumber, setNewNumber]   = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    service
      .getData()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

      service
        .createData(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    service
      .deleteData(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <Header text='Phonebook' />
      <Filter filterName={filterName} filterChange={handleFilterNameChange}/>
      <Header text= 'Add new' />
      <AddPersonForm 
        formSubmit={addPerson} 
        nameValue={newName} 
        nameChange={handlePersonChange} 
        numberValue={newNumber} 
        numberChange={handleNumberChange} />
      <Header text='Numbers' />
      <Numbers persons={persons} filterValue={filterName} handleDeleteClick={deletePerson}/>
    </div>
  )

}

export default App