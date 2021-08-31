import React, { useState, useEffect } from 'react';
import WidgetTitle from "../utils/title"
import Temperature from "../utils/temperature"
import Wind from "../utils/wind"
import styled from 'styled-components';

const Container = styled.div`
  background-color: #F5F5F5;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
  padding: 2em 3em;
  width: 600px;
  display: grid;
  grid-template-columns: 300px 300px;
  grid-template-rows: auto;
  column-gap: 25px;
  row-gap: 15px;
`;

const LeftSide = styled.div`
    border-right: 3px solid #dbdbdb;
`

const RightSide = styled.div`
    background-color: white;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border-radius: 3px;
    padding: 1em;
`

const WeatherInformationContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`

const Img = styled.div`
    img {
        display: block;
        width: 80px;
    }
    
`

const WeatherText = styled.div`
    display: grid;
    grid-template-rows: auto;
    margin-left: 20px;
`

const WeatherLocation = styled.p`
    margin: 0;
    background-color: lightblu
`

const TempNumber = styled.h1`
    margin: 0;
`

const WindNumber = styled.p`
    margin: 0;
`
// convert meteorological to cardinal
const convertWindDirection = (degree) => {
    const compass = [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW"
    ]
    const pos = Math.floor( ( degree / 22.5 ) + 0.5 )
    const compassPos = ( pos % 16 )
    return compass[compassPos]
}
// covnert wind speed from meter/sec to km/h 
const convertWindSpeed = (speed) => {
    return Math.round( speed * 3.6 )
}

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null)
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState(null)
    const [lat, setLat] = useState('-33.865143')
    const [long, setLong] = useState('151.209900')
    const [hasDefaultCoordChanged, setHasDefaultCoordChanged ] = useState(false)

    const [widgetTitle, setWidgetTitle] = useState(null)
    const [temperature, setTemperature] = useState(null)
    const [wind, setWind] = useState({
        visibility: true,

    })
    // ASSUME weather widget is being init first time, prepare a "default" weather
    useEffect(() => {
        // Check if weather has been provided already
        if ( !hasDefaultCoordChanged ) { 
            (async () => {
                getGeoCoords()
                    .then( (coordinates) => {
                        setLat(coordinates.latitude)
                        setLong(coordinates.longitude)
                        setHasDefaultCoordChanged(true)
                    })
                    .catch( (err) => {
                        // If user has denied permission then default back to Sydney coordinates 
                        setLat('-33.865143')
                        setLong('151.209900')
                    })
            })()
        }
        setStatus('pending')
        if ( lat && long ) {
            fetchWeatherApi(lat, long)
            .then(res => {
                setStatus('resolved')
                setWeather(res)
            }, error => {
                setStatus('rejected')
                setError(error)
            })
        }
    }, [ hasDefaultCoordChanged ])
    

    if (status === 'idle') // do nothing
    if (status === 'rejected') console.error(error)
    if (status === 'pending') console.log(status)
    if (status === 'resolved') // do nothing

    return (
        <>
            <Container>
                <LeftSide>
                    <WidgetTitle data={setWidgetTitle} />
                    <Temperature weatherNumber={ weather ? weather.main.temp : null} data={setTemperature}/>
                    <Wind data={setWind} />
                </LeftSide>
                <RightSide>
                    <p>{widgetTitle ? widgetTitle : 'TITLE OF WIDGET'}</p>
                    <WeatherInformationContainer>
                        <Img>
                            <img src={ weather ? `https://openweathermap.org/img/w/${weather.weather[0].icon}.png` : `/default-weather-icon.png`} alt="" />
                        </Img>
                        <WeatherText >
                            <WeatherLocation>{weather ? weather.name : 'Sydney'}</WeatherLocation>
                            <TempNumber>{ temperature ? temperature + `\u00b0` : `26\u00b0` }</TempNumber>
                            { wind.visibility &&
                                 <WindNumber><strong>Wind</strong> { weather ? convertWindDirection(weather.wind.deg) : '...'} { weather ? convertWindSpeed(weather.wind.speed) : '...'}km/h</WindNumber>
                            }
                        </WeatherText>
                    </WeatherInformationContainer>
                </RightSide>
            </Container>
        </>
    )
}


const fetchWeatherApi = async (lat, long) => {
    const api_key = "bbd71db36ed671c9437f898f6a610882"
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`
    return await fetch(api_url)
        .then(response => response.json())
        .then(res => res)
}

// Add a default coord
const getGeoCoords = () => {
    return new Promise( (resolve, reject ) => {
        navigator.geolocation.getCurrentPosition( position => {
            resolve(position.coords)
        }, reject)
    })
}
export default WeatherWidget