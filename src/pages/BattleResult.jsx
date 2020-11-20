import React from 'react';
import axios from 'axios';
import {
  Container, InputGroup, FormControl, Row, Col, Button,
} from 'react-bootstrap';

class BattleResult extends React.Component {
    constructor(props){
        super(props)
        console.log("props",this.props)
    //     console.log("win",this.props.match.params.win)
        this.state={
            id:this.props.location.query.id1
        }
    }
    render(){
        const {id}=this.state
         
        return(
            <div>
             <h2>比较页面</h2>
             <p>{id}</p>
             </div>
        )
        
    }
}
export default BattleResult;