import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import * as api from "./assets";
 
const Root = ({ children, initialState = {} }) => {
  // console.log(initialState);
  return(
  <Provider store={store(initialState)}>{children}</Provider>
);}

export default Root;
