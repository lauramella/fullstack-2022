import { useState, useEffect } from 'react'
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

    if (persons.map((persons) => persons.name).indexOf(newName) !== -1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const contact = persons.find(p => p.name === newName)
        const changedContact = { ...contact, number: newNumber }
        contactService
          .update(changedContact.id, changedContact)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== changedContact.id ? person : updatedPerson))
            })
          }
      } else {
      contactService
        .create(personObject)
          .then(returnedPerson => {  
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      contactService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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
      <Persons persons={persons} sFilter={sFilter} handleRemove={removePerson} />
      </ul>
    </div>
  )
}

export default App