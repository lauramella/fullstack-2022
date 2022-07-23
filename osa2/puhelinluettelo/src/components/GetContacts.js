import React from 'react'

const Person = ({ person }) => {
    return (
        <li>{person.name} {person.number}</li>
    )
} 

const GetContacts = ({ persons, sFilter }) => {
    if (sFilter.length === 0) {
        return persons.map(person => <Person key={person.name} person={person} />)
    }
    else {
        let filtered = persons.filter(person => person.name.toLowerCase().includes(sFilter.toLowerCase()))
        return filtered.map(person => <Person key={person.name} person={person} />)
    }
}

export default GetContacts


