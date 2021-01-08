 

const products=  (state = {}, action) => {
    switch (action.type) {
      case "GET_PRODUCTS": 
      // console.log("pr",action );
        return  action.payload

        
        case "SORT":
          return {...state,products:[...action.payload]};

      default:
        // console.log("2",state);
        return state;
    }
  };
  export default products