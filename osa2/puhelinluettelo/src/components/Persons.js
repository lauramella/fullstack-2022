const Person = ({ id, name, number, handleDelete }) => {
    return (
      <li>
        {name} {number}
        <button onClick={() => handleDelete(id, name)}>delete</button>
      </li>
    )
  }

const Persons = ({ persons, sFilter, handleDelete }) => {
    if (sFilter.length === 0) {
        return persons.map(p => <Person key={p.id} id={p.id} name={p.name} number={p.number} handleDelete={handleDelete}/>)
    }
    else {
        let filtered = persons.filter(p => p.name.toLowerCase().includes(sFilter.toLowerCase()))
        return filtered.map(p => <Person key={p.id} id={p.id} name={p.name} number={p.number} handleDelete={handleDelete} />)
    }
}
  
export default Persons