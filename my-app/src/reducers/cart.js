 
 const cart= (state = [], action) => {
   
    switch (action.type) {
      // case "GET_CART":
      //   return action.payload.cart
      case "ADD_CART":
        const finded = state.find(
          (item) => item.products_id === action.payload.products_id
        );
        if (finded) {
          finded.quantity += action.payload.quantity; 
          return state.map((item) =>
            item.products_id === finded.products_id ? finded : item
          );
        } else {
          // console.log("payload",action.payload)
          return [...state, action.payload];
        };
      
      case "ADD_QUANTITY":
        // console.log("11",state,action.payload);

        const product = state.find(
          (item) => item.products_id === action.payload.id
        );
        if(product){
         product.quantity+=1
         return state.map((item) =>
            item.products_id === product.products_id ? product : item
          );
        }else{
          return [...state ]
        }

        case "SUB_QUANTITY":
          // console.log("11",state,action.payload);
  
          const product1 = state.find(
            (item) => item.products_id === action.payload.id
          );
          if(product1){
           product1.quantity-=1
           return state.map((item) =>
              item.products_id === product1.products_id ? product1 : item
            );
          }else{
            return [...state ]
          }
        
      case "REMOVE_PRODUCT":
        const index = state.findIndex((item)=>item.products_id === action.id)
        if(index>=0){
          // console.log('index',index);
          state.splice(index,1);
        }
        return [...state];

      case "CHECKOUT":
        let totle=0 ;
        state.map((item)=>totle+=item.products.price * item.quantity)
        alert("totle:"+totle)
        return state;
      default:
        const cart=JSON.parse(window.localStorage.getItem('state'))?.cart
        // console.log("c1",cart.length);
        
        return [...state || cart];
    }


  };
  export default cart
  