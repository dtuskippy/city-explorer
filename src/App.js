import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      cityData: [],
      weatherCity: '',
      weatherData: {},
      showWeather: false
      // error: false,
      // errorMessage: ''
    }
  }
 
  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  }

  handleInputX = (e) => {
    e.preventDefault();
    this.setState({
      weatherCity: e.target.value
    })
  }
 
  getCityData = async (e) => {
    e.preventDefault();
    // let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json;`
    // let url = `https://us1.locationiq.com/v1/search?key=pk.e0f5c2dfa7500990d98d5aa3afd7b48e&q=${this.state.city}&format=json`;
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
   
    let cityData = await axios.get(url);
    
    let lat = cityData.data[0].lat;
    let lon = cityData.data[0].lon;
    let coordinates = [];
    coordinates.push(lat, lon);

    let latLog = console.log(cityData.data[0].lat);
    let lonLog = console.log(cityData.data[0].lon);
    console.log(latLog);
    console.log(lonLog);

    this.setState({
      cityData: coordinates
      
    });

    }


    handleSubmit = async (e) => {
    e.preventDefault();

    let url = `${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.weatherCity}`
    let weatherData = await axios.get(url);

    console.log(weatherData.data);
    this.setState({
      weatherData: weatherData.data,
      showWeather: true
    })
    
    }
    // 
    // FOR YOUR LAB YOU WILL NEED TO GET A MAP IMAGE SRC. Example:
    // `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.3300624&zoom=10`
        
  

  render(){

    return (
      <>
      
      
      <form onSubmit={this.getCityData}>
        <label> Pick a city!
          <input type="text" onInput={this.handleInput}/>
        </label>
        <button type="submit">Explore!</button>
      </form>
      
      
      <h1>Find City Weather</h1>
      <form onSubmit={this.handleSubmit}>
        <label> 
          <input type="text" onInput={this.handleInputX}/>
        </label>
        <button type="submit">Display Weather City!</button>
      </form>

      {
          this.state.showWeather &&
          <p>Lat: {this.state.weatherData.lat} Lon: {this.state.weatherData.lon}</p>
      }
      
      {
        <>
          <p>{this.state.city}</p>
          <p>{this.state.cityData}</p>
         
        </>
      }


      </>
        
    );
  }
}



export default App;
