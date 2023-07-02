import events from "@testing-library/user-event";

import {Application} from '../../client/Application'
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom'
import { getByTestId, render, waitFor } from '@testing-library/react';
import setupTestStore, { basename } from '../helpers/setupTestStore';
import resizeWindow from '../helpers/resizeWindow';
import { addToCart } from "../../client/store";
import { CART_STATE, PRODUCTS_FOR_CART } from "./mocks";
const testStoreRef = setupTestStore()
describe('Тест шапки сайта', () => {
 
    it('в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', () => {
       const {container} = render(<Application/>, {wrapper:testStoreRef.wrapper});
      const links = container.querySelectorAll('.navbar-nav a')
      const neededLinks = ["/catalog","/delivery","/contacts","/cart"].map(link => `${basename}${link}`)
        expect(Array.from(links).map(link => link.getAttribute('href'))).toEqual(neededLinks);
    });
    
    it('название магазина в шапке должно быть ссылкой на главную страницу',()=>{
       const {container} = render(<Application/>,{wrapper:testStoreRef.wrapper});
      const title = container.querySelector('.navbar-brand')
      
      expect(title).toBeInTheDocument()
      expect(title.getAttribute('href')).toBe(`${basename}/`)
    })
    it('в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней',()=>{
      const {container} = render(<Application/>,{wrapper:testStoreRef.wrapper});
      for(const product of PRODUCTS_FOR_CART){
        testStoreRef.store.dispatch(addToCart(product));
        }
      const cartLink = getByTestId(container,'cart-link')
      const formattedContent = /\(([^;]+)\)/.exec(cartLink.textContent)[1]
        expect(formattedContent).toBe(String(Object.values(CART_STATE).length))
    })
    // it('при выборе элемента из меню "гамбургера", меню должно закрываться',async()=>{
      
    //   const { container } = renderWithRoot(<Application/>);
    //   const linksContainer = getByTestId(container,'1')
    //   await events.click(linksContainer.firstElementChild)
    //   expect(linksContainer.classList.contains('collapse')).toBeTruthy()
    // })
});