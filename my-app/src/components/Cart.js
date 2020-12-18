import React, { useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import Fa from 'react-fontawesome'
import CartItem from './CartItem';
export default ({cartNum,cartItems})=>{
    const [opened,setOpened]=useState(false);
    return(
    <div className='cart' style={{right:'0'}}>
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
        <h2> 
            <Fa name="shopping-cart"/>
            <Badge pill variant="warning" 
                className="num_badge2">{cartNum}
            </Badge> 
            <span>&nbsp;&nbsp;Cart</span>
        </h2>
        <div className="cartItems">
           {cartItems.map((item)=><CartItem
                key={item.product_id} 
                product={item.product}
                size={item.size} 
                quantity={item.quantity} 
            />)}
             
        </div>
        <div>
            <Button block>checkout</Button>
        </div>
    </div>
)}