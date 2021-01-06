const filter= (state = {}, action) => {
    switch (action.type) {
      case "FILTER": 
       
        return {
          ...state,
          filter:action.filter,
          products:action.payload,
          size:action.size
        }
      default:
        
        return {...state,filter:[],products:[]};
    }
  };

  export default filter;