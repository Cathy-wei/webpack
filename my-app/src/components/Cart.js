import React, { useState } from 'react'
import { Badge, Button,Container,Row,Col } from 'react-bootstrap'
import Fa from 'react-fontawesome'
import { connect } from 'react-redux';
import CartItem from './CartItem';

const Cart = ({cart,dispatch})=>{
    const [opened,setOpened]=useState(false);
    const total = cart.reduce((total, item) => total + item.products.price * item.quantity, 0)
    .toFixed(2); 
    const cartNum =cart.reduce((cartNum,item)=>cartNum+item.quantity,0) ;
    return(
    <div className='cart' style={{right:opened ? '0px':'-400px'}}>
        <Button className='closer'  
        onClick={()=>setOpened(!opened)}>
            {
                opened ? <Fa name='close'/>:
                <span>
                    <Fa name="shopping-cart"/>
                    <Badge pill variant="warning" className="num_badge1">{cartNum}</Badge>
                </span>
                
            }
        </Button> 
        <h2 className="m-5"> 
            <Fa name="shopping-cart"/>
            <Badge pill variant="warning" 
                className="num_badge2">{cartNum}
            </Badge> 
            <span>&nbsp;&nbsp;Cart</span>
        </h2>
        <Container className="cart__content cart__content1" fluid >
            <div className="cart_Items">
                 {cart.length===0 ?
           <div className="text-center">The cart is empty. </div> :
           cart.map((item)=><CartItem key={item.products_id} {...item} />)}
            </div>
          
             
        </Container>
        <Container className="position-absolute" style={{bottom:0}}>
            <Container>
                <Row>
                    <Col className="text-secondary">
                        SUBTOTAL
                    </Col>
                    <Col className="d-flex flex-column align-items-end">
                        <div className="text-warning" style={{fontSize:'32px'}}>
                            {total}
                        </div>
                        <div className="text-secondary">OR UP TO 7 x $8.46</div>
                    </Col>
                    <Button variant="dark" block 
                        className="but"
                        onClick={() => dispatch({ type: "CHECKOUT" })}
                        disabled={cart.length === 0}
                    >checkout</Button>
                </Row>
            </Container>
        </Container>
    </div>
)}
const mapStateToProps =(state)=>({
    cart:state.cart
})

export default connect(mapStateToProps)(Cart)