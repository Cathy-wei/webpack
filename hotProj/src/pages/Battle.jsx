import React from 'react';
import axios from 'axios'; 
// import { HashRouter as Router, Link } from 'react-router-dom';

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
      input1:'',
      input2:''
    }
    // this.oneVal=React.createRef()
    // this.twoVal=React.createRef()
    this.oneSubmit=React.createRef()
    this.twoSubmit=React.createRef()

  }
  getOne=async()=>{//获取第一个数据
    // const val1=this.oneVal.current.value
    const val1=this.state.input1
    console.log(val1);
    if(val1!==''){
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
        this.setState({getOne:true,loadingOne:false,one:oneData,battle:true})
        console.log(oneData)
      }catch(e){

      }
    }
    
    this.setState({loadingOne:false})
  }

  rmOne=()=>{//删除获取的数据
    this.setState({getOne:false,one:''})
  }

  inputChange1=(e)=>{
    // console.log(e);
    let val=e.target.value
    if (val.match(/^[ ]*$/)) {
      this.oneSubmit.current.disabled=true
      return
    }
    this.oneSubmit.current.disabled=false

    this.setState({input1:val})
  }
  enter1=(e)=>{
    if (e.key == "Enter") {
        this.getOne();
    }
  }

  getTwo=async()=>{
    // const val2=this.twoVal.current.value
    const val2=this.state.input2
    if (val2!=='') {
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
        this.setState({getTwo:true,loadingTwo:false,two:twoData,battle:true})
        console.log(twoData)
      }catch(e){

    }
    this.setState({loadingTwo:false})}
    
  }

  rmTwo=()=>{
    this.setState({getTwo:false,two:''})
  }

  inputChange2=(e)=>{
    let val=e.target.value
    if (val.match(/^[ ]*$/)) {
      this.twoSubmit.current.disabled=true
      return
  }
  this.twoSubmit.current.disabled=false
  this.setState({input2:val})
  }

  enter2=(e)=>{
    if (e.key == "Enter") {
        this.getTwo();
    }
  }

//比较项目
  battleResult=()=>{
    const {getOne,getTwo, one,two,battle}=this.state 
    console.log("battle:",battle)
    // if(one=='' || two=='' || (one&&two)==''){
    if(!getOne||!getTwo){
      // battle=true
      // this.setState({battle:true})
      alert('其中一项不能为空')
    }else if(battle){
      this.props.history.push({
        pathname:"/BattleResult/",
        query:{
          name1:one.name,
          name2:two.name
        }
      })
    }
    
    // this.props.history.push("/BattleResult",{da:win})
  }
  
  render() {
    const {getOne,getTwo,loadingOne,loadingTwo,one,two,input1,input2}=this.state;
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
            <img src={img1} className='imgShadow' alt=" " />
          </Col>
          <Col>
            <p>Battle</p>
            <img src={img2} className='imgShadow' alt=" " />
          </Col>
          <Col>
            <p>See the winner</p>
            <img src={img3} className='imgShadow' alt=" " />
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
                    <Card.Img src={one.owner.avatar_url} alt={one.name} className='battleCardImg' />
                    <Card.Header>
                      {one.name}
                    <Button variant="light" onClick={this.rmOne} className=" delButton  button-del">
                    <i className="fa fa-times-circle " ></i>
                    </Button> 
                    </Card.Header>
                    
                </Card> 
                :
                <InputGroup>
                  <FormControl
                    // ref={this.oneVal}
                    placeholder="github username"
                    aria-label="github username"
                    aria-describedby="basic-addon2"
                    className='formInput' 
                    onChange={(e)=>{this.inputChange1(e)}}
                    onKeyDown={(e)=>{this.enter1(e)}}
                  />
                  <InputGroup.Append >
                  {
                    // (this.oneVal&&this.oneVal.current&&this.oneVal.current.value&&(this.oneVal.current.value!==''))?
                    input1!==''?
                     <Button  className='But' onClick={this.getOne}  ref={this.oneSubmit}>SUBMIT</Button>
                    :
                    <Button  className='But' onClick={this.getOne} disabled  ref={this.oneSubmit}>SUBMIT</Button>

                  }
                    
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
                    <Card.Img src={two.owner.avatar_url} alt={two.name} className='battleCardImg' />
                    <Card.Header>
                      {two.name}
                      <Button variant="light" onClick={this.rmTwo} className=" delButton button-del">
                      <i className="fa fa-times-circle"></i>
                      </Button>
                    </Card.Header>
                </Card> :
                <InputGroup>
                <FormControl
                  // ref={this.twoVal}
                  placeholder="github username"
                  aria-label="github username"
                  aria-describedby="basic-addon2"
                  className='formInput'
                  onChange={(e)=>{this.inputChange2(e)}}
                  onKeyDown={(e)=>{this.enter2(e)}}
                />
                <InputGroup.Append>
                  {
                    input2!==''?
                    <Button  className='But' onClick={this.getTwo}  ref={this.twoSubmit}>SUBMIT</Button>
                    :
                  <Button  className='But' onClick={this.getTwo} disabled ref={this.twoSubmit}>SUBMIT</Button>
                  }
                  
                </InputGroup.Append>
              </InputGroup>
            }
          </Col>
        </Row><br/>
        <Row>
          <Col>
       
                <Button  className='But' onClick={this.battleResult} >
                   Battle
                </Button> 
         {/* <Router>
          {
            this.state.getOne && this.state.getTwo ? 
              (<Link to={{pathname:this.state.battle?`/BattleResult/${this.state.one.name}&${this.state.two.name}`
              :`/BattleResult`}}>
                <Button className='But'>battle</Button>
              </Link>) : null
          }
        </Router> */}
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
