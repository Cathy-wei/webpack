import React from 'react';
import axios from 'axios';
import {
  Container,Row, Col, Card,Button
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

       
    }
    componentDidMount() {
            this.battle();
             
        } 
    battle=async()=>{//获取第一个数据
        const {oneName,twoName}=this.state; 
        try{  
            const res1= await axios.get(`https://api.github.com/search/repositories?q=${oneName} in:name&sort=stars&order=desc&type=Repositories&per_page=1`)
            const res2= await axios.get(`https://api.github.com/search/repositories?q=${twoName} in:name&sort=stars&order=desc&type=Repositories&per_page=1`)
        
            const one=res1.data.items[0]
            const two=res2.data.items[0] 

            if(one.stargazers_count>two.stargazers_count){
            this.setState({winner:one.name,win1:true})

            }else if(one.stargazers_count<two.stargazers_count){
                this.setState({winner:two.name,win2:true})
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
    goBack=()=>{
        // console.log('123')
        this.props.history.push('/Battle')
    }
    render(){  
        const {oneName,twoName,winner,imgUrl1,imgUrl2,battle}=this.state 
        return(
            <Container className="text-center">
             <h2>比较结果</h2>
             <br/>
                { battle ?
                <Row>
                    <Col>
                        <Card>
                            <Card.Img src={imgUrl1} alt={oneName} className='battleCardImg' />
                            <Card.Header>
                            {oneName}  {winner==oneName ?   <span style={{color:'#efc85dd9',fontWeight:'bold'}}>winner</span>:''}
                            </Card.Header> 
                        </Card> 
                        
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img src={imgUrl2} alt={twoName} className='battleCardImg' />
                            <Card.Header>
                            {twoName} {winner==twoName ?   <span style={{color:'#efc85dd9',fontWeight:'bold'}}>winner</span>:''} 
                            </Card.Header> 
                        </Card>
                         
                    </Col>
                    
                </Row>
                    :
                    <p>没有对象</p>
                }
                <br/>
                <Row>
                    <Col>
                        <Button className='But' onClick={this.goBack}>返回</Button>
                    </Col>
                </Row>
              
            
             </Container>
        )
        
    }
}
export default BattleResult;