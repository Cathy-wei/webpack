import React from 'react';
import {
  Container, InputGroup, FormControl, Row, Col, Button,
} from 'react-bootstrap';
import img1 from '../assets/imgs/pic2.png';
import img2 from '../assets/imgs/pic3.png';
import img3 from '../assets/imgs/pic4.png';

class Battle extends React.Component {
  render() {
    return (
      <Container className="text-center">
        <br />
        {' '}
        <h3>Instructions</h3>
        {' '}
        <br />
        <Row>
          <Col>
            <p>Enter two Github users</p>
            <img src={img1} style={{ 'box-shadow': '0 0 5px 3px #00000042' }} alt=" " />
          </Col>
          <Col>
            <p>Battle</p>
            <img src={img2} style={{ 'box-shadow': '0 0 5px 3px #00000042' }} alt=" " />
          </Col>
          <Col>
            <p>See the winner</p>
            <img src={img3} style={{ 'box-shadow': '0 0 5px 3px #00000042' }} alt=" " />
          </Col>
        </Row>
        <br />
        <h3>Players</h3>
        {' '}
        <br />
        <Row>
          <Col>
            <p>Player One</p>
            <InputGroup>
              <FormControl
                placeholder="github username"
                aria-label="github username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">SUBMIT</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col>
            <p>Player Two</p>
            <InputGroup>
              <FormControl
                placeholder="github username"
                aria-label="github username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">SUBMIT</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>

      </Container>
    );
  }
}
export default Battle;
