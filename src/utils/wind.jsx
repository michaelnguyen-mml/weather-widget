import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const Label = styled.label`
  font-size: 1em;
  text-align: center;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 10px 0 10px 0;
`;

const WindContainer = styled.div`
    display: grid;
    grid-template-columns: 150px 150px;
`

const TextLabel = styled.label`
    padding-left: 15px;
`

const Wind = (props) => {

    const [checked, setChecked] = useState(true)

    const displayWindInfo = (windToggle) => {
        props.data( {
            visibility : windToggle === 'On' ? true : false
        })
    }

    const handleWindChange = (event) => {
        displayWindInfo( event.target.value )
    }

    return (
        <>
        <Label >Wind</Label> <br />
        <WindContainer>
            <label>
                <Input id="onInput" type="radio" name="windSwitcher" value="On" defaultChecked={checked} onChange={handleWindChange}/><TextLabel htmlFor="onInput" aria-label="onInput">On</TextLabel>
            </label>
            <label>
                <Input id="offInput" type="radio" name="windSwitcher" value="Off" onChange={handleWindChange}/><TextLabel htmlFor="offInput" aria-label="offInput">Off</TextLabel>
            </label>
        </WindContainer>
        </>
    )
    
}

export default Wind