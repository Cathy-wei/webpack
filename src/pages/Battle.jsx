import React from 'react';
import axios from 'axios'; 
import {
  Container, InputGroup, FormControl, Row, Col, Button,Spinner,Card 
} from 'react-bootstrap';
import img1 from '@/assets/imgs/pic2.png';
import img2 from '@/assets/imgs/pic3.png';
import img3 from '@/assets/imgs/pic4.png'; 

class Battle extends React.Component {
  constructor(props){
    super(props)
    this.state={
      getOne:false,//是否获取数据
      getTwo:false,
      loadingOne:false,//是否在加载
      loadingTwo:false,
      one:"",//获取的数据
      two:"",
      battle:false,//是否可以比较 
    }
    this.oneVal=React.createRef()
    this.twoVal=React.createRef()
  }
  getOne=async()=>{//获取第一个数据
    const val1=this.oneVal.current.value
    const url= `https://api.github.com/search/repositories?q=${val1} in:name&sort=stars&order=desc&type=Repositories&per_page=1`
    this.setState({loadingOne:true})
    try{  
      const res= await axios.get(url)
      if(res.data.items.length==0){
        alert("未找到项目")
        this.oneVal.current.value=""
        return
      }  
      const oneData=res.data.items[0]
      this.setState({getOne:true,loadingOne:false,one:oneData})
      console.log(oneData)
    }catch(e){

    }
    this.setState({loadingOne:false})
  }

  rmOne=()=>{//删除获取的数据
    this.setState({getOne:false,one:''})
  }

  getTwo=async()=>{
    const val2=this.twoVal.current.value
    const url= `https://api.github.com/search/repositories?q=${val2} in:name&sort=stars&order=desc&type=Repositories&per_page=1`
    this.setState({loadingTwo:true})
    try{  
      const res= await axios.get(url)
      if(res.data.items.length==0){
        alert("未找到项目")
        this.twoVal.current.value=""
        return
      } 
      // this.props.setOne(res.data.items[0])
      const twoData=res.data.items[0]
      this.setState({getTwo:true,loadingTwo:false,two:twoData})
      console.log(twoData)
    }catch(e){

    }
    this.setState({loadingTwo:false})
  }

  rmTwo=()=>{
    this.setState({getTwo:false,two:''})
  }
//比较项目
  battleResult=()=>{
    const {one,two,battle}=this.state 
    // console.log("battle:",battle)

    this.props.history.push({
      pathname:"/BattleResult/",
      query:{
        name1:one.name,
        name2:two.name
      }
    })
    // this.props.history.push("/BattleResult",{da:win})
  }
  
  render() {
    const {getOne,getTwo,loadingOne,loadingTwo,one,two}=this.state;
    // const {win}=this.props;
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
            <img src={img1} style={{ boxShadow: '0 0 5px 3px #00000042' }} alt=" " />
          </Col>
          <Col>
            <p>Battle</p>
            <img src={img2} style={{ boxShadow: '0 0 5px 3px #00000042' }} alt=" " />
          </Col>
          <Col>
            <p>See the winner</p>
            <img src={img3} style={{ 'boxShadow': '0 0 5px 3px #00000042' }} alt=" " />
          </Col>
        </Row>
        <br />
        <h3>Players</h3>
        {' '}
        <br />
        <Row>
          <Col>
            <p>Player One</p>
            {
              loadingOne ? 
                <div>
                  正在查找<Spinner animation="border" />
                </div>
                : getOne ?
                  <Card>
                    <Card.Img src={one.owner.avatar_url} alt={one.name} style={{width:'200px',height:'200px',margin:'0 auto'}} />
                    <Card.Header>
                      {one.name}
                    <Button variant="light" onClick={this.rmOne} className="button-del">
                    <i className="fa fa-times-circle" style={{ color: 'rgb(194, 57, 42)' }}></i>
                    </Button> 
                    </Card.Header>
                    
                </Card> 
                :
                <InputGroup>
                <FormControl
                  ref={this.oneVal}
                  placeholder="github username"
                  aria-label="github username"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary" onClick={this.getOne} >SUBMIT</Button>
                </InputGroup.Append>
              </InputGroup>
            }
            
          </Col>
          <Col>
            <p>Player Two</p>
            {
              loadingTwo ? 
                <div>
                  正在查找<Spinner animation="border" />
                </div>
                : getTwo ?
                <Card>
                    <Card.Img src={two.owner.avatar_url} alt={two.name} style={{width:'200px',height:'200px',margin:'0 auto'}} />
                    <Card.Header>
                      {two.name}
                      <Button variant="light" onClick={this.rmTwo} className="button-del">
                      <i className="fa fa-times-circle" style={{ color: 'rgb(194, 57, 42)' }}></i>
                      </Button>
                    </Card.Header>
                </Card> :
                <InputGroup>
                <FormControl
                  ref={this.twoVal}
                  placeholder="github username"
                  aria-label="github username"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary" onClick={this.getTwo} >SUBMIT</Button>
                </InputGroup.Append>
              </InputGroup>
            }
          </Col>
        </Row><br/>
        <Row>
          <Col>
       
                <Button variant="primary" onClick={this.battleResult} >
                   Battle
                </Button> 
             
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center text-black bg-light">
              <p>版权所有 &copy; 韦仲茜</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Battle;
