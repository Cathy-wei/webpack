import React  from 'react'
import {Form} from 'react-bootstrap'
import { connect } from 'react-redux'; 
import {sort} from "../actions/sort" 
const sortBy = [
    { value: '', label: 'Select' },
    { value: 'lowestprice', label: 'Lowest to highest' },
    { value: 'highestprice', label: 'Highest to lowest' }
  ]; 
const Sort =({dispatch,products}) => {
    // const [sort,setSort]=useState('')
    return(
<div>
    <Form.Control as="select" size="sm"
        onChange={(e)=>{
            // console.log("e",e.target.value);
            // console.log("p",products); 
            dispatch(sort(e.target.value,products))
            }}
    > 
        {sortBy.map((item,key)=>
            <option key={key} value={item.value}>{item.label}</option>
        )}
    </Form.Control>
    
</div>
) }
// const mapStateToProps=(state)=>({
//     products:state.products.products
// })
export  default connect()(Sort)