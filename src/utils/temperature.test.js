import { render, screen } from '@testing-library/react';
import Temperature from './temperature'

test( 'It should render the label for Temperature', () => {
    render(<Temperature />)
    const linkElement = screen.getByText('Temperature')
    expect(linkElement).toBeInTheDocument()
})

test( 'It should render the celcius option ', () => {
    render( <Temperature/>)
    const linkElement = screen.getByLabelText('celcius')
    expect(linkElement).toBeInTheDocument()
})

test( 'It should render the fahrenheit option', () => {
    render( <Temperature/>)
    const linkElement = screen.getByLabelText('fahrenheit')
    expect(linkElement).toBeInTheDocument()
})