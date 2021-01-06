import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import filter from '../actions/filter';
import {connect} from "react-redux";

const Filter= ({dispatch,selected,products})=>{
    const sizes=['XS','S','M','ML','L','XL','XXL'];

    // console.log("123",selected);
    return(
        <div>
            <h5>Sizes:</h5>
          
            <Form>
                {sizes.map((item,key) =>(
                <Form.Check type='checkbox' key={key} label={item}
                checked={selected?.includes(item)} 
              
                onChange={()=>
                   
                  dispatch( filter(selected,products,item))
                }
                ></Form.Check>
            )) 
            }
            </Form>
            
        </div>

    )
}

const mapStateToProps=(state)=>({
    selected:state.filter.filter
   
})
export default connect(mapStateToProps)(Filter)