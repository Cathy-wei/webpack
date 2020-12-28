export default (state = [], action) => {
    // console.log(state);
  
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
          return [...state, action.payload];
        }
      case "CHECKOUT":
        return [];
      default:
        return state;
    }
  };
  