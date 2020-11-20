import React from 'react';
import axios from 'axios';
import {
  Container,Row, Col, Button,
} from 'react-bootstrap';

class BattleResult extends React.Component {
    constructor(props){
        super(props)
        console.log("props",this.props)
    //     console.log("win",this.props.match.params.win)
        this.state={
            oneName:this.props.location.query.name1,
            twoName:this.props.location.query.name2,
            imgUrl1:'',
            imgUrl2:'',
            winner:'平手',
            battle:false
            
        }

        componentDidMount=()=>{
            this.battle()
        }

        battle=async()=>{//获取第一个数据
            const {oneName,twoName}=this.state; 
            try{  
              const res1= await axios.get(`https://api.github.com/search/repositories?q=${oneName} in:name&sort=stars&order=desc&type=Repositories&per_page=1`)
              const res2= await axios.get(`https://api.github.com/search/repositories?q=${twoName} in:name&sort=stars&order=desc&type=Repositories&per_page=1`)
            
              const one=res1.data.items[0]
              const two=res2.data.items[0]
              const count1=one.stargazers_count
              const count2=two.stargazers_count

              if(count1>count2){
              this.setState({winner:one.name})

              }else if(count1<count2){
                  this.setState({winner:two.name})
              }
              this.setState({
                  imgUrl1:one.owner.avatar_url,
                  imgUrl2:two.owner.avatar_url,
                  battle:true
              })
              console.log(count1)
            }catch(e){
        
            } 
          }
    }
    render(){  
        const {oneName,twoName,winner,imgUrl1,imgUrl2}=this.state 
        return(
            <Container>
             <h2>比较页面</h2>
             
                { battle ?
                <Row>
                    <Col>
                        <Card>
                            <Card.Img src={imgUrl1} alt={oneName} style={{width:'200px',height:'200px',margin:'0 auto'}} />
                            <Card.Header>
                            {oneName}  
                            </Card.Header> 
                        </Card> 
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img src={imgUrl2} alt={twoName} style={{width:'200px',height:'200px',margin:'0 auto'}} />
                            <Card.Header>
                            {twoName}  
                            </Card.Header> 
                        </Card>
                    </Col>
                    <p>
                        {winner}
                    </p>
                </Row>
                    :
                    <p>没有对象</p>
                }

             
            
             </Container>
        )
        
    }
}
export default BattleResult;