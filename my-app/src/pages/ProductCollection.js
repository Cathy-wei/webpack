import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart' 
import {Container, Row ,Col} from 'react-bootstrap' ;
import getProducts from '../actions'; 



 
const ProductCollection =({dispatch,products})=>{
    useEffect( () => { 
        dispatch(getProducts())
        console.log("kk",products);
    },[]);//dom更新后执行
    // useEffect( () => { 
    //     console.log("kk",products);

    // }) 
    
    


    return (
        <Container>
            <Row>
                <Col sm={4} md={2}>
                    {/* <Filter sizes={sizes} selected={selected}
                       onChange={()=>handleFilter()}  
                    /> */}
                    <Filter products={products} />
                </Col>
                <Col sm={8} md={10}>
                    <Row className='mb-4'>
                        <Col>
                        {products?.length} Product(s) found.
                        </Col>       
                        <Col><Sort products={products}  /></Col>
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
 
const mapStateToProps=(state)=>({
    products:state.products.products, 
    // sort:state.sort.type
})
       
export default connect(mapStateToProps)(ProductCollection)
