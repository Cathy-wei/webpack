import React from 'react';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart'
import {Container, Row ,Col} from 'react-bootstrap' ;
import productData from '../assets/products.json'

export default class ProductCollection extends  React.Component
{
    constructor(props){
        super(props)
        this.state={
            selected:['M']
        }
    }
    handleFilter=(size,checked)=>{
        let {selected} = this.state
        if(checked){
            this.setState({
                selected:[...selected,size]
            })
        }else{
            this.setState({
                selected: selected.filter(item => item !== size) 
            })
        }
    }
    render(){
        const sizes=['XS','S','M','ML','L','XL','XXL'];
        console.log(productData);
        let cartItems=[
            {
                "product_id":1,
                "size":'M',
                "quantity":5
            },
            {
                "product_id":2,
                "size":'M',
                "quantity":5
            },
            {
                "product_id":3,
                "size":'S',
                "quantity":5
            },
            {
                "product_id":4,
                "size":'S',
                "quantity":5
            }
        ]
        cartItems=cartItems.map((item)=>{
            item.product=productData.products.find(item2=>item2.id===item.product_id)
            return item;
        })
        return (
            <Container>
                <Row>
                    <Col sm={4} md={2}>
                        <Filter sizes={sizes} selected={this.state.selected}
                           onChange={this.handleFilter}  />
                    </Col>
                    <Col sm={8} md={10}>
                        <Row className='mb-4'>
                            <Col>
                            {productData.products.length} Product(s) found.
                            </Col>       
                            <Col><Sort name={'Name'} /></Col>
                        </Row>
                        <Row>
                            {productData.products.map((item) => <Col xs={12} sm={6} md={4} className='mb-4' key={item.id}>
                                <ProductCard item={item}  />
                            </Col> )}

                        </Row>
                    </Col>

                </Row>
                <Cart cartNum={cartItems.length} cartItems={cartItems} />
            </Container>
        )
    }
}