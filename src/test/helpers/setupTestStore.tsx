import React from "react";
import { Provider } from 'react-redux';
import { initStore } from "../../client/store";
import { ExampleApi, CartApi, LOCAL_STORAGE_CART_KEY } from "../../client/api";
export const basename = "/hw/store";

import { render } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { Store } from "redux";
export default function setupTestStore() {
	const api = new ExampleApi(basename);
const cart = new CartApi();
	const refObj:{store?:Store,wrapper?:({children}:any)=>JSX.Element} = {}
	
	beforeEach(() => {
		
	  localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
	  refObj.store = initStore(api, cart)
	  refObj.wrapper = function Wrapper({ children }: any) {
		return <BrowserRouter basename={basename}><Provider store={refObj.store}>{children}</Provider></BrowserRouter>
	  }
	})
  
	return refObj
}
