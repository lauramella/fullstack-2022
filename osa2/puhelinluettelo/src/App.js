import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [sFilter, setFilter] = useState('')

  const handleName = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const double = persons.find(person => person.name === newName)
    if (double) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const person = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
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
        <Persons persons={persons} sFilter={sFilter} />
      </div>
    </div>
  )

}

export default App

/*//{persons.map(person =>
          //<Persons key={person.name} person={person} />
        )}*/
