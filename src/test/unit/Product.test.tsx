import events from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import {
  getAllByTestId,
  getByTestId,
  render,
  waitFor,
} from "@testing-library/react";
import { Cart } from "../../client/pages/Cart";
import { addToCart, productDetailsLoad, productsLoad } from "../../client/store";
import { cn } from "@bem-react/classname";
import setupTestStore, { basename } from "../helpers/setupTestStore";
import { CART_STATE, CATALOG, FULL_ITEM_DATA, PRODUCTS_FOR_CART } from "./mocks";
import { Catalog } from "../../client/pages/Catalog";
import { ExampleApi } from "../../client/api";
import { Product } from "../../client/pages/Product";
import {Product as ProductType} from '../../common/types'
jest.mock("react-router", () => ({

	// 3- Import non-mocked library and use other functionalities and hooks
	  ...(jest.requireActual("react-router") as any),
	
	// 4- Mock the required hook
	  useParams: () => ({id:FULL_ITEM_DATA.id})
	}));
// beforeEach(() => {
//   // Clear all instances and calls to constructor and all methods:
//   jest.spyOn(ExampleApi.prototype, "getProductById").mockImplementation(() =>
//     Promise.resolve({
//       data:FULL_ITEM_DATA,
//       status: 200,
//       statusText: "OK",
//       headers: {},
//       config: {},
//     })
//   );
// });
const bem = cn("ProductDetails");

const testStoreRef = setupTestStore();

// const loadItemMock = () => {
//   testStoreRef.store.dispatch(productDetailsLoad(FULL_ITEM_DATA.id));
// };
describe("Тест страницы подробной информации", () => {
  it('отображаются: название товара, его описание, цена, цвет, материал и кнопка * * "добавить в корзину"', async () => {
    // loadItemMock();
	const { container } = render(<Product />, {
      wrapper: testStoreRef.wrapper,
    });
    
    await waitFor(() => expect(container.querySelector(`.${bem()}`)).toBeInTheDocument(), {
      timeout: 5000,
    });
    const itemContainer = container.querySelector(`.${bem()}`);
	const fieldsToGrab = ['Name','Description','Price','Color','Material']
	const fieldsValues:(string | number)[] = fieldsToGrab.map(field => itemContainer.querySelector(`.${bem(field)}`).textContent)
	const priceIndex = fieldsToGrab.findIndex(field => field === 'Price')
	fieldsValues[priceIndex] = Number(String(fieldsValues[priceIndex]).substring(1))
    expect(
      fieldsValues
    ).toEqual(Object.entries(FULL_ITEM_DATA).filter(([key])=>key !== 'id').map(([_,value]) => value));
	const button = itemContainer.querySelector(`.${bem('AddToCart')}`)
	expect(button).toBeInTheDocument()
  });
  it('если товар уже добавлен в корзину, на странице товара должно отображаться сообщение об этом',async()=>{
	// loadItemMock();
	testStoreRef.store.dispatch(addToCart(FULL_ITEM_DATA))
	const { container } = render(<Product />, {
		wrapper: testStoreRef.wrapper,
	  });
	  
	  await waitFor(() => expect(container.querySelector(`.${bem()}`)).toBeInTheDocument(), {
		timeout: 5000,
	  });
	  expect(container.querySelector('.CartBadge')).toBeInTheDocument()
  })
  it('если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество',async()=>{
	// loadItemMock();
	testStoreRef.store.dispatch(addToCart(FULL_ITEM_DATA))
	const { container } = render(<Product />, {
		wrapper: testStoreRef.wrapper,
	  });
	  
	  await waitFor(() => expect(container.querySelector(`.${bem()}`)).toBeInTheDocument(), {
		timeout: 5000,
	  });
	  const button = container.querySelector(`.${bem('AddToCart')}`)
	  await events.click(button)
	  expect(testStoreRef.store.getState().cart[FULL_ITEM_DATA.id].count).toBe(2)
  })
});
