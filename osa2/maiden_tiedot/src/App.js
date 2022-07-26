import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [sFilter, setFilter] = useState('')

  const handleFilter = (event) => setFilter(event.target.value)


  useEffect(() => {
    axios.get('https://restcountries.com/v2/all')
      .then(response => {
        let maat = response.data
        setCountries(maat)
      })
  }, [])

  return (
    <div>
      <p>find countries <input value={sFilter} onChange={handleFilter} /> </p>
      <Countries countries={countries} sFilter={sFilter} setFilter={setFilter} />
    </div>
  );
}
//<Countries countries={countries} sFilter={sFilter} />
//<ListCountry countries={countries} filterName={filterName} setFilterName={setFilterName} />

export default App

