import { useState, useEffect } from 'react'
import service from './services/service'
import Header from './components/Header'
import AddPersonForm from './components/AddPersonForm'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  
  const [persons, setPersons]       = useState([])
  const [newName, setNewName]       = useState('')
  const [newNumber, setNewNumber]   = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage]       = useState('')

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
      if (window.confirm(`${personAdded.name} is already added to phonebook. Replace old number to new one?`)) {
        const updatePerson = {...personAdded, number: newNumber}
        service
          .updateData(personAdded.id, updatePerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setMessage(`${returnedPerson.name} updated!`)
            setTimeout(() => {
              setMessage('')
            }, 1500)
          })
      }
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
          setMessage(`${person.name} created!`)
          setTimeout(() => {
            setMessage('')
          }, 1500)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    const personDelete = persons.find((person) => person.id === id)

    if (window.confirm(`Delete ${personDelete.name} ?`))
    {
      service
        .deleteData(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`${personDelete.name} removed!`)
          setTimeout(() => {
            setMessage('')
          }, 1500)
        })
    }
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
      <Notification message={message} />
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