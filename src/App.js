import React from 'react';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      cityData: [],
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
 
  getCityData = async (e) => {
    e.preventDefault();
    // let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json;`
    // let url = `https://us1.locationiq.com/v1/search?key=pk.e0f5c2dfa7500990d98d5aa3afd7b48e&q=${this.state.city}&format=json`;
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
   
    let cityData = await axios.get(url);
    let lat = console.log(cityData.data[0].lon);
    let lon = console.log(cityData.data[0].lat);
    console.log(lat);
    console.log(lon);

   
    // FOR YOUR LAB YOU WILL NEED TO GET A MAP IMAGE SRC. Example:
    // `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.3300624&zoom=10`
        
  }

  render(){

    return (
      <>
      
      <form onSubmit={this.getCityData}>
        <label> Pick a city!
          <input type="text" onInput={this.handleInput}/>
        </label>
        <button type="submit">Explore!</button>
      </form>

      {
        <p>{this.state.city}</p>
      }

        </>
    );
  }
}



export default App;
