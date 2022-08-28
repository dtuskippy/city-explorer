import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from 'react-bootstrap/ListGroup';

class Weather extends React.Component {

  render(){
    return (
            
      this.props.weatherArray.length > 0 && 
        
        <div>
          <h2>{this.props.weatherCity}'s Next 16 Day Weather Forecast</h2>
          <ListGroup as="ol" numbered style={{ width: "30rem" }}> 
              {
                this.props.weatherArray.map((day, idx) =>
                  <ListGroup.Item as="li" key={idx}>{day.date}</ListGroup.Item>
                )
              }
          </ListGroup> 
        </div>
        
     );
    }
 }
     
 export default Weather;

     








