 const cart= (state = [], action) => {
    // console.log("cart",action,state);
  
    switch (action.type) {
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
        return state;
    }
  };
  export default cart
  