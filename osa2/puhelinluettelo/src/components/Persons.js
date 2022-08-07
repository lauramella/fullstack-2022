const Person = ({ name, number }) => {
    return (
      <li>{name} {number}</li>
    )
  }

const Persons = ({ persons, sFilter }) => {
    if (sFilter.length === 0) {
        return persons.map(p => <Person key={p.name} name={p.name} number={p.number} />)
    }
    else {
        let filtered = persons.filter(p => p.name.toLowerCase().includes(sFilter.toLowerCase()))
        return filtered.map(p => <Person key={p.name} name={p.name} number={p.number} />)
    }
}
  
  export default Persons