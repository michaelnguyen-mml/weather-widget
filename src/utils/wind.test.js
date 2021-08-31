import { render, screen } from '@testing-library/react';
import Wind from './wind'

test( 'It should render the label for Wind', () => {
    render(<Wind />)
    const linkElement = screen.getByText('Wind')
    expect(linkElement).toBeInTheDocument()
})

test( 'It should render the On radio ', () => {
    render( <Wind/>)
    const linkElement = screen.getByLabelText('onInput')
    expect(linkElement).toBeInTheDocument()
})

test( 'It should render the Off radio', () => {
    render( <Wind/>)
    const linkElement = screen.getByLabelText('offInput')
    expect(linkElement).toBeInTheDocument()
})