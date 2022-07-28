import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [sFilter, setSFilter] = useState('')

  const handleName = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setSFilter(event.target.value)

  useEffect(() => {
    contactService
      .getAll()
        .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  const addPerson = (event) => {
    const personObject = {
      name: newName,
      number: newNumber
    }

    contactService
      .create(personObject)
        .then(returnedPerson => {  
          if (persons.map((persons) => persons.name).indexOf(newName) !== -1) {
            alert(`${newName} is already added to phonebook`)
          } else {
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
          } 
        })
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