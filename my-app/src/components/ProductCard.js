import React from 'react';
import {connect} from 'react-redux';
import {Badge,DropdownButton,ButtonGroup,Card,Image, Dropdown} from 'react-bootstrap'

const ProductCard =({item,dispatch}) => (
    
<div>
        <Card style={{border:''}}>
            <Image fluid src={`${process.env.PUBLIC_URL}/products/${item.sku}_1.jpg`} />
            <div className="text-center" >
                <p className="card_title">{item.title}</p><hr className='hr'/>

               <p>
                   <span>{item.currencyFormat}</span>
                   <span>{item.price}</span>
                </p> 
                
            </div>
        <DropdownButton as={ButtonGroup}  
            variant="dark" 
            className="but"
            drop="up"
            title="Add To Cart"
            
        >
           {item.availableSizes.map((size,key)=>(
               <Dropdown.Item 
                    className="but_item"
                    key={key}
                    onClick={()=>dispatch({
                        type:"ADD_CART",
                        payload:{
                            products_id:item.id,
                            products:item,
                            size:size,
                            quantity:1//数量
                        }}
                    )}
               >{size}</Dropdown.Item>
           ))}
        </DropdownButton>

        
        {
        item.isFreeShipping &&
        <Badge variant="dark" className='badges' >Free Shipping</Badge>
        }

        </Card>

    </div>
)
export default connect()(ProductCard)