import { compose, createStore, applyMiddleware } from 'redux';
import promiseMiddleWare from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
 
export default  ( initialState )=> {
 
  initialState = 
    JSON.parse(window.localStorage.getItem('state')) || initialState
   
  
  const middleware = [thunk];

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      // applyMiddleware(...middleware)
      applyMiddleware(promiseMiddleWare)
      /* window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__() */
    )
  );

  store.subscribe(() => {
    const state = store.getState();
    const persist = {
      cart: state.cart,
      products:state.products 
    };

    window.localStorage.setItem('state', JSON.stringify(persist));
  });

  return store;
};
