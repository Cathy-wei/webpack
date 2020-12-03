import React from 'react';
import { Container, Nav } from 'react-bootstrap';

class  Header extends React.Component{
    constructor(props){
        super(props)
        
    }
    render() {
        const menuItems = [
        'All',
        'Javascript',
        'Ruby',
        'Java',
        'Css',
        'Python',
        ];
        return(
            <Container>
            <Nav
                className="justify-content-center" 
                variant="tabs"
                defaultActiveKey="All"
                onSelect={(selectedKey) => this.props.onClick(selectedKey)}
            >
                {menuItems.map((item, key) => (
                <Nav.Item key={key}>
                    <Nav.Link eventKey={item} className='link'>{item}</Nav.Link>
                </Nav.Item>
                ))}
            </Nav> 
            </Container>
        )
    }
}
export default Header;