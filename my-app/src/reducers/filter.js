const filter= (state = {}, action) => {
    switch (action.type) {
      case "FILTER": 
          console.log("23",state);
          if(!action.filter.includes(action.size)){
              
               action.filter=[...action.filter,action.size]
               return{
                 ...state,
                 filter:action.filter,
                 products:action.payload,
                 size:action.size
               }
          }else{
             
                return {
                  ...state,
                  filter:action.filter.filter(item => item !== action.size),
                  products:action.payload,
                  size:action.size
                }
          }
      //  return  {
      //   ...state,
      //   selected:action.filter,
      //   size:action.size
      // } 
      default:
        // console.log("qq",state)
        
        return state;
    }
  };

  export default filter;