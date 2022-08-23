import React from 'react';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: ''
  
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

   let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json;`
       
  
    let cityData = await axios.get(url)
    console.log(cityData.data);
   
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

     {/* {
       this.state.error
       ?
       <p>{this.state.errorMessage}</p>
       :
       console.log(') //placeholder
       
     } */}

    </>
  );
}
}






export default App;
