import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState([])
    const [show, setShow] = useState(false)

    //($env:REACT_APP_API_KEY = "personal api key") -and (npm start)
    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                let weather_data = response
                setWeather(weather_data)
                setShow(true)
            })
    }, [])

    if (show) {
        return (
            <div>
                <h2>Weather in {country.capital}</h2>
                <p>temperature {weather.data.current.temperature} Celsius </p>
                <img src={weather.data.current.weather_icons} />
                <p>wind {parseFloat(weather.data.current.wind_speed/3.2808).toFixed(2)} m/s</p>           
            </div>
        )
    } else {
        return <p> loading weather data... </p>
    }
}

export default Weather