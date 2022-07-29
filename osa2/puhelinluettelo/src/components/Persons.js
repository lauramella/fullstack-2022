import React from 'react'

const Person = ({ id, name, number, handleRemove }) => {
    return (
        <li>
            {name} {number}
            <button onClick={() => handleRemove(id, name)}>delete</button>
        </li>
    )
} 

const Persons = ({ persons, sFilter, handleRemove }) => {
    if (sFilter.length === 0) {
        return persons.map(person => <Person key={person.name} id={person.id} name={person.name} number={person.number} handleRemove={handleRemove} />)
    }
    else {
        let filtered = persons.filter(person => person.name.toLowerCase().includes(sFilter.toLowerCase()))
        return filtered.map(person => <Person key={person.name} id={person.id} name={person.name} number={person.number} handleRemove={handleRemove} />)
    }
}

export default Persons


