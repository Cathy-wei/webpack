// import logo from './logo.svg';
import React from 'react';
import { Container} from 'react-bootstrap';
import './App.css';
import ProductCollection from './pages/ProductCollection'
class App extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        return (
          <Container className="contain">
            
               <ProductCollection />
              
          </Container>
        )
    }
}

export default App;