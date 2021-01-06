import { createAction } from "redux-actions";

const cart = createAction("GET_CART", () => {
    console.log("s",cart);
    const data =window.localStorage.getItem("state")||[]
 
    return data;
 
});
// const cart =()=>({
     
//         type:"GET_CART",
//         payload:window.localStorage.getItem("cart")||[]
    
// })
export default cart;