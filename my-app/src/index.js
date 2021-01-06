import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import promiseMiddleWare from 'redux-promise';
import rootReduers from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; 
import Root from "./Root";

// const initialState =
// JSON.parse(window.localStorage.getItem('state')) || initialState;
const store =createStore(rootReduers ,applyMiddleware(promiseMiddleWare));
// store.subscribe(() => {
//     const state = store.getState();
//     const persist = {
//       cart: state.cart ,
//       products:state.products.products
//     }; 
//     window.localStorage.setItem('state', JSON.stringify(persist));
//   });
ReactDOM.render( 
    <Provider store={store}>
        <App/>
    </Provider>,
        // <Root>
        //     <App />
        // </Root> ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();