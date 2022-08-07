import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [sFilter, setFilter] = useState('')

  const handleName = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  useEffect(() => {
    personService.getAll().then(persons => {
        setPersons(persons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
    }
    setNewName('')
    setNewNumber('')

    const double = persons.find(p => p.name === newName)
    if (double) {
      if (window.confirm(`${newName} is already added to phonebook, update the number?`)) {
        personService.update(double.id, {...double, number: newNumber }).then(updatedPerson => {
          setPersons(persons.map(p => p.id === double.id ? updatedPerson : p ))
        })
        return 
      }
    }
    personService.create(person).then(newPerson => {  
      setPersons(persons.concat(newPerson))
    })
  }


  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
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
      <div>
        <Persons persons={persons} sFilter={sFilter} handleDelete={deletePerson}/>
      </div>
    </div>
  )
}

export default App
