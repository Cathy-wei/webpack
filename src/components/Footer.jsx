import React from 'react';
import {Container} from 'react-bootstrap';

class Footer extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Container>
                    <div className="text-center text-black jumbotron bg-light">
                        {this.props.children}
                    </div>
                </Container>
            </div>
        )
    }
}
export default Footer;