import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
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

const Filter= ({sizes,selected,onChange})=>(
    <div>
        <h5>Sizes:</h5>
        <Form>
            {sizes.map((item,key) =>(
            <Form.Check type='checkbox' key={key} label={item}
               checked={selected.includes(item)} 
               onChange={()=> onChange(item,!selected.includes(item))}   
             ></Form.Check>
        )) 
        }
        </Form>
        
    </div>

)

Filter.propTypes={
    sizes:PropTypes.array.isRequired
}

export default Filter