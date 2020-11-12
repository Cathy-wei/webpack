 
import Battle from '../pages/Battle.jsx'
import Popular from '../pages/Popular.jsx'
import axios from 'axios'
import React from 'react'
import {Container,Nav} from 'react-bootstrap'

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={route:'Popular'}
    }
    handleMenu(key){
        console.log('key',key)
        this.setState({
            route:key
        })
    }
    render(){
        const menuItems=[
            "Popular",
            "Battle"
        ]
        const {route}= this.state
        let page =null
        switch (route){
            case 'Battle':
                page=<Battle></Battle>
                break;
            case 'Popular':
                page=<Popular></Popular>
                break;
            default:
                page=<Popular></Popular>
                break;
        }
        return (
            <Container>
                 <Nav className="justify-content-center" style={{ border: 'soild black' }} 
                variant="tabs" defaultActiveKey="All" onSelect={(selectedKey) => this.handleMenu(selectedKey)} >
                    {menuItems.map((item, key) => <Nav.Item key={key}>
                        <Nav.Link eventKey={item} >{item}</Nav.Link>
                    </Nav.Item>)}
                </Nav>
                <div>
                    {page}
                </div>
            </Container>
        )
    }
}