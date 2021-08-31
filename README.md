# Weather Widget UI


## Getting started
### Setup
- Pull this repo and install dependencies with `yarn install`

### Development / Start server
- `yarn start`
- Go to http://localhost:3000 


## What is Weather Widget UI ?

This weather widget UI was done as part of a coding test to see how well the design requirements could be translated into a feasible product. The purpose of this weather widget is to show the weather based on the user's location.
There were some limitations in what sort of data the OpenWeatherMap api could provide in accordance with the requirements of this test. For example the wind direction in cardinal was only provided if the user had requested the API in XML form otherwise in JSON form only the degree is provided. To ensure API calls was only made when necessary I chose to go with requesting the data in JSON form and wrote a couple of functions to convert where necessary. 
API calls is only made when necessary, any interactivity with the widget UI will re-use data from the latest fetch.

### Weather icon
The weather icon will change based on the weather. The icon is provided by OpenWeatherMap API however the usage of these icons weren't documented anywhere on the page. After a bit of digging I was able to find the "base URL" for the icon. It did require a bit of concatenation of the URL and icon ID (provided via API).

### User location
The weather widget UI will ask the user for their location via the Navigator API. However if the user refuses to allow my beautiful code to spy on them via locations then it will simply fallback to the default behaviour which is to use the coordinates of Sydney. 
On initial page load it will actually use the coordinates of Sydney and once user starts interacting with the UI (i.e. click somewhere on the page) then that's when they'll be prompted to either **Allow** or **Block** the location permission.

### Testing
Tests can be run with `yarn test`
Test coverage is very very basic. It will only test to see if the component has rendered. My testing knowledge is very limited right now but I do hope to be able to write more complex test in the future.

### Error handling
Error handling has been implemented with the usage of `useState`. Again there's no complex "error handling" but once the project gets more complicated then the handling of errors is readily available. 



