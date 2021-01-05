import * as api from "../assets";
import { createAction } from "redux-actions";

const getProducts = createAction("GET_PRODUCTS", async () => {
  const data = await api.getProducts(); //异步action,操作结束后才会发出"GET_PRODUCTS"
//   console.log("data",data)
//   if (!!sort) {
//     console.log("sd", sort);
//     data.products.sort(compare[sort]);
// }
  return data;
});
export default getProducts;
