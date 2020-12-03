import React from 'react';
import {Container} from 'react-bootstrap';

class Content extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
              <Container>
                {this.props.children}
              </Container>
            </div>
          )
    }
}

export default Content;