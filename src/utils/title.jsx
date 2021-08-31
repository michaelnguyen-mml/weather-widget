import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  font-size: 1em;
  text-align: center;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 10px 0 10px 0;
`;

const WidgetTitle = (props) => {
  const handleTitleChange = (event) => {
    props.data(event.target.value)
  }
  return (
    <div>
      <Label htmlFor="widgetTitle" aria-label="widgetTitle" >Title</Label> <br />
      <Input onChange={handleTitleChange} id="widgetTitle" placeholder="Title of Widget" aria-label="widgetTitleInput" />
    </div>
  )

}

export default WidgetTitle