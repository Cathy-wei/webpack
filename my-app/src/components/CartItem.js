import React from 'react'
import {Row,Col, Button,Image,ButtonGroup} from 'react-bootstrap'

export default ({product,size,quantity})=>(
    <Row className='cart_item' >
        <Col md={3}>
        <Image fluid src={`${process.env.PUBLIC_URL}/products/${product.sku}_2.jpg`} rounded  />
        </Col>
        <Col md={7}>
            <p> {product.title} </p>
            <div>{size} | {product.style} </div>
            <div>Quantity: {quantity}</div>
        </Col>
        <Col md={2}>
            <div>&times;</div>
            <div>
                {product.currencyFormat}<span>{product.price}</span>
            </div>
            <div>
                <ButtonGroup className="button_group">
                    <Button variant="dark">-</Button>
                    <Button variant="dark">+</Button> 
                </ButtonGroup>
            </div>
        </Col>
    </Row>
)