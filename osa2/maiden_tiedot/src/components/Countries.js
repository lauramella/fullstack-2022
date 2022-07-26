import React, { useState } from 'react'

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h1> {country.name} </h1>
            <p>
                capital {country.capital} <br />
                area {country.area} 
            </p>
            <h3> languages </h3>
            <ul>
                {country.languages.map((country) => 
                    <li> {country.name} </li> )}
            </ul>
            <img alt="Flag" src={country.flag} width="200px" />
        </div>       
    )
}




const Countries = ({ countries, sFilter, setFilter }) => {
    const countryName = countries.filter(country => country.name.toLowerCase().includes(sFilter.toLowerCase()))  

    if (countryName.length > 10) {
        return 'Too many matches, specify another filter'
    }

    if (countryName.length === 1) {
        return <CountryInfo country={countryName[0]} />
    }


    return countryName.map(country => <div> {country.name} <button onClick={() => {setFilter(country.name)}}>show</button> </div> )
    
   
}

export default Countries
