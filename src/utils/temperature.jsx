import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Label = styled.label`
  font-size: 1em;
  text-align: center;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 10px 0 10px 0;
  place-self: center;
`;

const TempContainer = styled.div`
    display: grid;
    grid-template-columns: 150px 150px;
`

const TextLabel = styled.label`
    padding-left: 15px;
`

// ASSUME: default temp measurement is celsius because it's superior in every way
const Temperature = (props) => {
    const [checked, setChecked] = useState(true)

    useEffect(() => {
        tempConversion()
    }, [props.weatherNumber])


    const tempConversion = (id = 'celsius') => {
        const KELVIN = 273.15
    
        if ( typeof props.weatherNumber === 'object' ) {
            props.data('...')
        } else if ( typeof props.weatherNumber === 'number') {
            props.data(Math.round(id === 'celsius' ? props.weatherNumber - KELVIN : (props.weatherNumber - KELVIN) * 9 / 5 + 32))
        }
    }

    const handleTemperateChange = (event) => {
        tempConversion(event.target.id)
    }

    return (
        <>
            <Label>Temperature</Label> <br />
            <TempContainer>
                <label>
                    <Input id="celsius" type="radio" name="tempSwitcher" value="°C" defaultChecked={checked} onChange={handleTemperateChange} /><TextLabel htmlFor="celsius" aria-label="celcius">°C</TextLabel>
                </label>
                <label>
                    <Input id="fahrenheit" type="radio" name="tempSwitcher" value="°F" onChange={handleTemperateChange} /><TextLabel htmlFor="fahrenheit" aria-label="fahrenheit">°F</TextLabel>
                </label>
            </TempContainer>
        </>
    )

}

export default Temperature