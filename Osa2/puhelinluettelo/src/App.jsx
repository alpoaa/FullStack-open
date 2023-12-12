import { useState } from 'react'
import Header from './components/Header'
import AddPersonForm from './components/AddPersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personAdded = persons.find((person) => person.name === newName)
    
    if (personAdded) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name : newName
      }

      setPersons(persons.concat(newPerson))
    }
    setNewName('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <Header text={'Phonebook'} />
      <AddPersonForm formSubmit={addPerson} inputValue={newName} inputChange={handlePersonChange} />
      <Header text={'Numbers'} />
      <Numbers numbers={persons}/>
    </div>
  )

}

export default App