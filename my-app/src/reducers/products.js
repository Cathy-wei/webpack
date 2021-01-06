 

const products= (state = {}, action) => {
    switch (action.type) {
      case "GET_PRODUCTS": 
      console.log("pr",action.payload );
        return action.payload

        
        case "SORT":
          return {...state,products:[...action.payload]};

      default:
        return state;
    }
  };
  export default products