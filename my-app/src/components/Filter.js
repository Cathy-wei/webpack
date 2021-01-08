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
          
            <div>
                {sizes.map((item,key) =>(
                <label>
                    <input  type='checkbox'  key={key} 
                            checked={selected?.includes(item)}  
                            onChange={()=> 
                            dispatch( filter(selected,products,item))
                            } /> 
                    <span className="checkmark">{item}</span>
                </label>
                ))}
            </div>
            
        </div>

    )
}

const mapStateToProps=(state)=>({
    selected:state.filter.filter
   
})
export default connect(mapStateToProps)(Filter)