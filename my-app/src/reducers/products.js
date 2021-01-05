 

const products= (state = {}, action) => {
    switch (action.type) {
      case "GET_PRODUCTS":
          // console.log('product',action.payload);
        return action.payload
        // return {
        //   ...state,
        //   a:action.payload,
        //   // b:action.payload
        // };

        
        case "SORT":
          // console.log("-1231",action.payload); 
          // return action.payload
          // let arr = state.products
          // arr.sort(compare[action.sort]);
          return {...state,products:[...action.payload]};

        // case "FILTER":
        //   console.log("1111",action.payload);
        //   return {...state,products:[...action.payload]};

      default:
        return state;
    }
  };
  export default products