import { render, screen } from '@testing-library/react';
import WidgetTitle from './title';

test( 'It should render title label', () => {
    render( <WidgetTitle/>)
    const linkElement = screen.getByLabelText('widgetTitle')
    expect(linkElement).toBeInTheDocument()
})

test( 'It should render title input', () => {
    render( <WidgetTitle/>)
    const linkElement = screen.getByLabelText('widgetTitleInput')
    expect(linkElement).toBeInTheDocument()
})