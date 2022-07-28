import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [sFilter, setFilter] = useState('')

  const handleFilter = (event) => setFilter(event.target.value)

  useEffect(() => {
    axios.get(`https://restcountries.com/v2/all`)
      .then(response => {
        let countries = response.data
        setCountries(countries)
      })
  }, [])

  return (
    <div>
      <p>find countries <input value={sFilter} onChange={handleFilter} /> </p>
      <Countries countries={countries} sFilter={sFilter} setFilter={setFilter} />
    </div>
  );
}

export default App

