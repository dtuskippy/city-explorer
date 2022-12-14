import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Alert from "react-bootstrap/Alert";
import './app.css'
import Movies from './components/Movies.js';
import Weather from './components/Weather.js';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      showCity: false,
      cityLat: '',
      cityLon: '',
      weatherData: {},
      moviesData: [],
      showError: false
    }
  }
 
  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  }
 
   
  getCityData = async (e) => {
    e.preventDefault();
       
    try {
      if(`${this.state.city}` === ''){
        this.setState({
          showError: true
        })
      } else {
          let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
          let cityData = await axios.get(url);
    
          let moviesUrl = `${process.env.REACT_APP_SERVER}/movies?city=${this.state.city}`
          let moviesResponse = await axios.get(moviesUrl);
          
          let lat = cityData.data[0].lat;
          let lon = cityData.data[0].lon;
      
          let urlWeather = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`
          let weatherResponse = await axios.get(urlWeather);

          this.setState({
            showCity: true,
            cityLat: lat,
            cityLon: lon,
            weatherData: weatherResponse.data,
            moviesData: moviesResponse.data
          });
        }
    } catch (err) {
        console.log(err);
      }
  }

  render() {
        console.log(this.state);
    return (
      <>
        
      <Form id="form" onSubmit={this.getCityData}>
        <Form.Group>
           <Form.Label><h3>Pick a city!</h3></Form.Label>
           <Form.Control onChange={this.handleInput} type="text" placeholder="Enter city here"/>
         </Form.Group>
         <Button id="button" variant="outline-primary" type="submit">Explore!</Button>
      </Form>
          
      {
        this.state.showCity && 

        <Card style={{ width: '22rem' }}>
          <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=${14}`}/>
          <Card.Body>
            <Card.Title>{this.state.city} is a great choice!</Card.Title>
            <Card.Text>
              <p>Latitude: {this.state.cityLat}</p>
              <p>Longitude: {this.state.cityLon}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      }
  
      {
        this.state.showError &&
        <Alert variant="warning" style={{ width: "30rem" }}>
          <Alert.Heading>
            Please enter a city name
          </Alert.Heading>
        </Alert>
      }

      <div>
        <Movies moviesArray={this.state.moviesData}  moviesCity={this.state.city} />
        <Weather weatherArray={this.state.weatherData}  weatherCity={this.state.city} />
      </div>

      </>
    );
  }
}

export default App;
