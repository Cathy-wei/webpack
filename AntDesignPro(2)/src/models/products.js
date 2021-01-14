/*
 * @Author: your name
 * @Date: 2021-01-12 14:23:55
 * @LastEditTime: 2021-01-13 11:35:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AntDesignPro\src\models\customer.js
 */
import {
  query as queryProducts
} from '@/services/products';

const ProductsModel = {
  namespace: 'products',
  state: {
    data: [],
    meta: {}
  },
  effects: {
    * fetch(_, {
      call,
      put
    }) {
      const response = yield call(queryProducts);
      console.log('response', response)
      yield put({
        type: 'save',
        payload: response,
      });
    },

  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        currentUser: action.payload || {}
      };
    },
  },
};
export default ProductsModel;
