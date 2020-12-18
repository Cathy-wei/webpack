import React from 'react'
import {Badge, Button, Card,Image} from 'react-bootstrap'
export default ({item}) => (
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
        <Button block variant="dark" className='but'>Add To Cart</Button>
        {
        item.isFreeShipping &&
        <Badge variant="dark" className='badges' >Free Shipping</Badge>
        }

        </Card>

    </div>
)