import React from 'react';
import { Container, Nav ,ButtonGroup,Button} from 'react-bootstrap';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';

import Battle from '@/pages/Battle.jsx';
import Popular from '@/pages/Popular.jsx';
import BattleResult from '@/pages/BattleResult.jsx';
import { hot } from 'react-hot-loader/root';
// import { setConfig , hot} from 'react-hot-loader/root';

// setConfig({
//   showReactDomPatchNotification:false
// });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { route: 'Popular' };
  }

  handleMenu(key) {
    console.log('key', key);
    this.setState({
      route: key,
    });
  }

  render() {
    const menuItems = [
      'Popular',
      'Battle',
    ];
    const { route } = this.state;
    let page = null;
    switch (route) {
      case 'Battle':
        page = <Battle Submit={()=>this.handleMenu("BattleResult")} />;
        // Submit={()=>this.handleMenu().bind(this)} 
        break;
      case 'Popular':
        page = <Popular />;
        break;
      default:
        page = <Popular />;
        break;
    }
    return (
      <Container>
        {/* <Nav
          className="justify-content-center"
          style={{ border: 'soild black' }}
          variant="tabs"
          defaultActiveKey="All"
          onSelect={(selectedKey) => this.handleMenu(selectedKey)}
        >
          {menuItems.map((item, key) => (
            <Nav.Item key={key}>
              <Nav.Link eventKey={item}>{item}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <BattleResult/>
        <div>
          {page}
        </div> */}
        <HashRouter>
        <br/>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">
             <Link style={{ textDecoration:'none',color:'white'}}  to="/Popular/">
                Popular
              </Link> 
          </Button>
          <Button variant="secondary">
            <Link  style={{ textDecoration:'none',color:'white'}} to="/Battle/">
                Battle
              </Link>
          </Button>
          {/* <Button variant="secondary">
            <Link  style={{ textDecoration:'none',color:'white'}} to="/BattleResult/">
               BattleResult
              </Link> 
          </Button>  */}
        </ButtonGroup> 
          <Switch>
            <Route exact path="/" component={Popular}></Route>
            <Route exact path="/Popular" component={Popular}></Route>
            <Route path="/Battle" component={Battle}></Route>
            <Route path="/BattleResult" component={BattleResult}></Route>
          </Switch>
              
        </HashRouter> 
      </Container>
    );
  }
}

export default hot(App);