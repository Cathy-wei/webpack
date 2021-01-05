import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import filter from '../actions/filter';
import {connect} from "react-redux";
// import { Row ,Col } from 'react-bootstrap';

//  class  Filter extends React.Component{
//     render(){
//         const size=['XS','S','M','ML','L','XL','XXL'];
//         return(
            
//                 <div className='filter_box' >
                   
//                         {size.map((item,key)=>(
//                             <span key={key} className='check_box'>
//                                 <input type="checkbox" id={key} label={item} />
//                                 <span>{item}</span>
//                             </span>
//                         ))}
//                 </div>
            
//         )
//     }
//  }

//  export default Filter

const Filter= ({dispatch,selected,products,size})=>{
    const sizes=['XS','S','M','ML','L','XL','XXL'];
    // const selected=['M'];
    // const handleFilter=(size,checked)=>{ 
    //     if(checked){ 
    //         selected=[...selected,size]
    //     }else{ 
    //         selected=selected.filter(item => item !== size) 
    //     } 
    // }
  console.log("ss",selected,size)
    return(
        <div>
            <h5>Sizes:</h5>
          
            <Form>
                {sizes.map((item,key) =>(
                <Form.Check type='checkbox' key={key} label={item}
                // checked={selected?.includes(item)} 
                checked={size===item}
                // onChange={()=> handleFilter(item,!selected.includes(item))}   
                onChange={()=>
                    // handleFilter(item,!selected.includes(item))
                    // dispatch({
                    //     type:"FILTER",
                    //     filter:selected,
                    //     payload:products
                    // }) 
                  dispatch( filter(selected,products,item))
                }
                ></Form.Check>
            )) 
            }
            </Form>
            
        </div>

    )
}//selected存储逻辑出错

// Filter.propTypes={
//     sizes:PropTypes.array.isRequired
// }
// const handleFilter=(size,selected)=>{ 
    
//     if(!selected?.includes(size)){ 
//         return [...selected,size]
//     }else{ 
//        return selected.filter(item => item !== size) 
//     } 
// }
const mapStateToProps=(state)=>({
    selected:state.filter.filter,
    size:state.filter.size
    // selected:handleFilter(state.filter.size,state.filter.selected)
})
export default connect(mapStateToProps)(Filter)