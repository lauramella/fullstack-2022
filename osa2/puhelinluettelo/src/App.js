import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [sFilter, setSFilter] = useState('')

  const handleName = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setSFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault() // Estetään lomakkeen lähetys.
    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
      number: newNumber
    }
    
    if (persons.map((persons) => persons.name).indexOf(newName) !== -1) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
  setNewName('')
  setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter sFilter={sFilter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm 
            addPerson={addPerson}
            newName={newName}
            newNumber={newNumber}
            handleName={handleName}
            handleNumber={handleNumber} />
      <h2>Numbers</h2>
      <ul>
      <Persons persons={persons} sFilter={sFilter} />
      </ul>
    </div>
  )
}

export default App