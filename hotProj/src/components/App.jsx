import React,{ Suspense, lazy } from 'react';
import { Container, Nav ,ButtonGroup,Button} from 'react-bootstrap';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';

// import Battle from '@/pages/Battle.jsx';
import Popular from '@/pages/Popular.jsx';
import BattleResult from '@/pages/BattleResult.jsx';
import { hot } from 'react-hot-loader/root';
const Battle =lazy(()=>import('@/pages/Battle.jsx'))


class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { route: 'Popular' };
  }

  // handleMenu(key) {
  //   console.log('key', key);
  //   this.setState({
  //     route: key,
  //   });
  // }

  render() {
    // const menuItems = [
    //   'Popular',
    //   'Battle',
    // ];
    // const { route } = this.state;
    // let page = null;
    // switch (route) {
    //   case 'Battle':
    //     page = <Battle/>;
    //     // Submit={()=>this.handleMenu().bind(this)} 
    //     break;
    //   case 'Popular':
    //     page = <Popular />;
    //     break;
    //   default:
    //     page = <Popular />;
    //     break;
    // }
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
          <Button className='But'>
             <Link style={{ textDecoration:'none',color:'white'}}  to="/Popular/">
                Popular
              </Link> 
          </Button>
          <Button  className='But'>
            <Link  style={{ textDecoration:'none',color:'white'}} to="/Battle/">
                Battle
              </Link>
          </Button>
        </ButtonGroup> 
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Popular}></Route>
            <Route exact path="/Popular" component={Popular}></Route>
            <Route path="/Battle" component={Battle}></Route>
            {/* <Route path="/BattleResult/:query" component={BattleResult}></Route> */}
            <Route path="/BattleResult" component={BattleResult}></Route>

          </Switch>
        </Suspense>
          
              
        </HashRouter> 
      </Container>
    );
  }
}

export default hot(App);
