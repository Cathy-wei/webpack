import { combineReducers } from "redux";
import products from "./products";
import cart from "./cart";

export default combineReducers({
  products:products,
  // cartItem:cart
  cart:cart
});
