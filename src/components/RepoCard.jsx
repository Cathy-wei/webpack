import React from 'react';
import {Card, ListGroup,ListGroupItem,OverlayTrigger, Tooltip } from 'react-bootstrap';
import img1 from '@/assets/imgs/pic1.png';
import styles from './Card.less';


class RepoCard extends React.Component{
    constructor(props){
        super(props) 
        
    }
   
    render(){
        
        return(
            <Card id={styles.card}>
                <Card.Header className="text-center bg-white font-weight-bold">{this.props.no}</Card.Header>
                    <Card.Body className="bg-light">
                <Card.Img src={img1} data-src={this.props.img} className="lazyload" />
                <Card.Title className={styles.text_online}>
                    <OverlayTrigger  placement="bottom-start" delay={{ show: 250, hide: 400 }} overlay={
                        <Tooltip id="button-tooltip" >{this.props.title}</Tooltip>
                    } >
                        <Card.Link href={this.props.url} target="_blank" className='link'>
                            {this.props.title}
                        </Card.Link>
                    </OverlayTrigger>
                </Card.Title>
                <ListGroup className="list-group-flush " className={styles.text_online}>
                    <ListGroupItem className="bg-light">
                    <Card.Text>
                        <i className="fa fa-user fa-lg fa-fw" style={{ color: 'orange' }} />
                        {this.props.author}
                    </Card.Text>
                    </ListGroupItem>
                    <ListGroupItem className="bg-light">
                    <Card.Text>
                        <i className="fa fa-star fa-lg fa-fw" style={{ color: 'yellow' }} />
                        {this.props.stars}
                    </Card.Text>
                    </ListGroupItem>
                    <ListGroupItem className="bg-light">
                    <Card.Text>
                        <i className="fa fa-code-fork fa-lg fa-fw" style={{ color: 'lightblue' }} />
                        {this.props.forks}
                    </Card.Text>
                    </ListGroupItem>
                    <ListGroupItem className="bg-light">
                    <Card.Text>
                        <i className="fa fa-warning fa-lg fa-fw" style={{ color: 'purple' }} />
                        {this.props.issues}
                    </Card.Text>
                    </ListGroupItem>
                </ListGroup>
                </Card.Body>
            </Card>
              
        )
    }
}
export default RepoCard;