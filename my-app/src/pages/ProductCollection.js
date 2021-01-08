import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart' 
import {Container, Row ,Col} from 'react-bootstrap' ;
import getProducts from '../actions'; 



 
const ProductCollection =({dispatch,products,selectProducts})=>{
    useEffect( async () => { 
       await dispatch(getProducts())
        console.log("kk",products);
    },[]);
    return (
        <Container>
            <Row>
                <Col sm={4} md={2}>
                 
                    <Filter products={products} />
                </Col>
                <Col sm={8} md={10}>
                    <Row className='mb-4'>
                        <Col>
                        {selectProducts.length?selectProducts.length:products.length} Product(s) found.
                        </Col>       
                        <Col><Sort products={selectProducts.length?selectProducts:products}  /></Col>
                    </Row>
                    <Row>
                        { (selectProducts.length?selectProducts:products)?.map((item) =>(
                         <Col xs={12} sm={5} md={4} className='mb-4' 
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
 
const mapStateToProps=(state)=>{
    // console.log(state);
    return({
    products:state.products.products||[],
    selectProducts: state.filter.products
})}
       
export default connect(mapStateToProps)(ProductCollection)
