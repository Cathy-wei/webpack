import React from 'react'
import {Row,Col, Button,Image,ButtonGroup} from 'react-bootstrap'
import Fa from 'react-fontawesome'


export default ({products,size,quantity})=>(
    <Row className='cart_item' noGutters >
        <Col xs={2} className=" ">
        <Image fluid src={`${process.env.PUBLIC_URL}/products/${products.sku}_2.jpg`}   />
        </Col>
        <Col xs={8} className="pl-2 pr-2">
            <p> {products.title} </p>
            <div className='text-secondary'>{size} | {products.style} </div>
            <div className='text-secondary'>Quantity: {quantity}</div>
        </Col>
        <Col xs={2} className="d-flex flex-column align-items-end justify-content-between">
            <div>
                <Button size='sm' variant="link" className="text-danger" >
                  <Fa name="close"   /> 
                </Button>
            </div>
            <div className="text-warning">
                {products.currencyFormat}<span>{products.price}</span>
            </div>
            <div>
                <ButtonGroup   size="sm" >
                    <Button variant="dark" className="but">-</Button>
                    <Button variant="dark" className="but">+</Button> 
                </ButtonGroup>
            </div>
        </Col>
    </Row>
)