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
import { addToCart, productsLoad } from "../../client/store";
import { cn } from "@bem-react/classname";
import setupTestStore, { basename } from "../helpers/setupTestStore";
import { CART_STATE, CATALOG, FULL_ITEM_DATA, PRODUCTS_FOR_CART } from "./mocks";
import { Catalog } from "../../client/pages/Catalog";
import { ExampleApi } from "../../client/api";

const spy = jest.spyOn(ExampleApi.prototype, "getProducts")
const bem = cn("ProductItem");

const testStoreRef = setupTestStore();

const loadCatalogDataMock = () => {
  testStoreRef.store.dispatch(productsLoad());
};
describe("Тест каталога", () => {
  it("в каталоге должны отображаться товары, список которых приходит с сервера", async () => {
    const { container } = render(<Catalog />, {
      wrapper: testStoreRef.wrapper,
    });
    loadCatalogDataMock();
	await waitFor(()=>expect(spy).toBeCalledTimes(1))
    await waitFor(() => expect(container.querySelector(`.${bem()}`)).toBeInTheDocument(), {
      timeout: 5000,
    });
    const items = container.querySelectorAll(`.${bem()}`);
    expect(
      Array.from(items).map((item) => Number(item.getAttribute("data-testid")))
    ).toEqual(CATALOG.map((item) => item.id));
  });
  it("для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре", async () => {
    const { container } = render(<Catalog />, {
      wrapper: testStoreRef.wrapper,
    });
    loadCatalogDataMock();
    await waitFor(() => expect(container.querySelector(`.${bem()}`)).toBeInTheDocument(), {
      timeout: 5000,
    });
    const items = container.querySelectorAll(`.${bem()} .card-body`);
	const grabbedData = Array.from(items).map((item) => [
        item.querySelector(`.${bem()}-Name`).textContent,
        Number(
          item.querySelector(`.${bem()}-Price`).textContent.substring(1)
        ),
        item.querySelector(`.${bem()}-DetailsLink`).getAttribute("href"),
      ])
	  const expectedData = CATALOG.map((item) => [item.name,item.price,`${basename}/catalog/${item.id}`])
	  console.log({grabbedData,expectedData})
    expect(
      grabbedData
    ).toEqual(expectedData);
  });
  it('если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом',async()=>{
	loadCatalogDataMock();
	testStoreRef.store.dispatch(addToCart(FULL_ITEM_DATA))
	const { container } = render(<Catalog />, {
		wrapper: testStoreRef.wrapper,
	  });
	  
	  await waitFor(() => expect(container.querySelector(`.${bem()}`)).toBeInTheDocument(), {
		timeout: 5000,
	  });
	  const badge = container.querySelector(`.${bem()} .CartBadge`);
	  expect(badge).toBeInTheDocument()
  })
});
