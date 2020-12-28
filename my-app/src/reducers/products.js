export default (state = [], action) => {
    switch (action.type) {
      case "GET_PRODUCTS":
          console.log('product',state);
        return action.payload;
    //   case "ADD_CART":
    //     return state.map((item) => {
    //       console.log(item.id === action.payload.products_id);
  
    //       if (item.id === action.payload.products_id && item.inventory > 0) {
    //         console.log(1);
  
    //         item.inventory--;
    //         return item;
    //       }
    //       return item;
    //     });
      default:
        return state;
    }
  };
  