import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart'
import {Container, Row ,Col} from 'react-bootstrap' ;
import getProducts from '../actions';

// import productData from '../assets/products.json' 

const sizes=['XS','S','M','ML','L','XL','XXL'];
const selected=['M'];

 
const ProductCollection =({dispatch,products})=>{
    useEffect( () => { dispatch(getProducts()) } );//dom更新后执行
    console.log(products);
    // const cartItems=[
    //     {
    //         "product_id":1,
    //         "size":'M',
    //         "quantity":5
    //     },
    //     {
    //         "product_id":2,
    //         "size":'M',
    //         "quantity":5
    //     }
    // ]
    // cartItems=cartItems.map((item)=>{
    //     item.product=products.find(item2=>item2.id===item.product_id)
    //     return item;
    // })

    const handleFilter=(size,checked)=>{
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

    return (
        <Container>
            <Row>
                <Col sm={4} md={2}>
                    <Filter sizes={sizes} selected={selected}
                       onChange={()=>handleFilter()}  />
                </Col>
                <Col sm={8} md={10}>
                    <Row className='mb-4'>
                        <Col>
                        {products?.length} Product(s) found.
                        </Col>       
                        <Col><Sort name={'Name'} /></Col>
                    </Row>
                    <Row>
                        { products?.length&&products.map((item) =>(
                         <Col xs={12} sm={6} md={4} className='mb-4' 
                            key={item.id}>
                                <ProductCard item={item}  />
                        </Col> ))} 
                    </Row>
                </Col> 
            </Row> 
            <Cart />
        </Container>
    )
}
    // constructor(props){
    //     super(props)
    //     this.state={
    //         selected:['M']
    //     }
    // }
      
const mapStateToProps=(state)=>({
    products:state.products.products
})
       
export default connect(mapStateToProps)(ProductCollection)
