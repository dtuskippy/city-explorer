import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from 'react-bootstrap/ListGroup';

class Movies extends React.Component {

  render(){
    return (
            
      this.props.moviesArray.length > 0 && 
        
        <div>
          <h2>Top Movies Related to {this.props.moviesCity}</h2>
          <ListGroup as="ol" numbered style={{ width: "30rem" }}> 
              {
                this.props.moviesArray.map((movie, idx) =>
                  <ListGroup.Item as="li" key={idx}>{movie.date}</ListGroup.Item>
                )
              }
          </ListGroup> 
        </div>

     );
    }
 }
     
 export default Movies;
   







