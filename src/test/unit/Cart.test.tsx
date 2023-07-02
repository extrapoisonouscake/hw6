import events from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { getByTestId, render} from "@testing-library/react";
import { Cart } from "../../client/pages/Cart";
import { addToCart } from "../../client/store";
import { cn } from "@bem-react/classname";
import setupTestStore from "../helpers/setupTestStore";
import { CART_STATE, PRODUCTS_FOR_CART } from "./mocks";
const bem = cn("Cart");

const testStoreRef = setupTestStore();

const addTestProducts = () => {
  for (const product of PRODUCTS_FOR_CART) {
    testStoreRef.store.dispatch(addToCart(product));
  }
};
describe("Тест корзины", () => {
  it('в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
    const { container } = render(<Cart />, { wrapper: testStoreRef.wrapper });
    addTestProducts();
    const clearButton = container.querySelector(`.${bem("Clear")}`);
    expect(clearButton).toBeInTheDocument();
    await events.click(clearButton);
    expect(Object.keys(testStoreRef.store.getState().cart).length).toBe(0);
  });
  it("если корзина пустая, должна отображаться ссылка на каталог товаров", () => {
    const { container } = render(<Cart />, { wrapper: testStoreRef.wrapper });
    const linkToCatalog = container.querySelector(
      'a[href="/hw/store/catalog"]'
    );
    expect(linkToCatalog).toBeInTheDocument();
  });
  it("в корзине должна отображаться таблица с добавленными в нее товарами", () => {
    const { container } = render(<Cart />, { wrapper: testStoreRef.wrapper });
    addTestProducts();
    const summaryTable = getByTestId(container, "summary-table");
    expect(summaryTable).toBeInTheDocument();
    const presentedNamesElements = summaryTable.querySelectorAll(
      `tbody tr .${bem("Name")}`
    );
    expect(
      Array.from(presentedNamesElements).map((el) => el.textContent)
    ).toEqual(
      Object.values(CART_STATE).map((product) => product.name)
    );
  });
  // !! повторяется????!!
  it("для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа", () => {
    const { container } = render(<Cart />, { wrapper: testStoreRef.wrapper });
    addTestProducts();
    const summaryTable = getByTestId(container, "summary-table");
    expect(summaryTable).toBeInTheDocument();
    const presentedRows = summaryTable.querySelectorAll(`tbody tr`);
    const allDataArray = Array.from(presentedRows).map((row) => {
      const [name, price, count, total] = Array.from(row.childNodes)
        .filter((row) =>row.nodeName === "TD")
        .map((child) => child.textContent);
      const clearedPrice = price.substring(1),
        clearedTotal = total.substring(1);
      return [name, ...[clearedPrice, count, clearedTotal].map(Number)];
    });

    const expectedData = Object.entries(CART_STATE).map(([_, object]) => {
      const entry = Object.values(object);
      return [...entry, entry[1] * entry[2]];
    });
    expect(allDataArray).toEqual(expectedData);
	const totalAmount = expectedData.map(entry => entry[3]).reduce((prev,cur)=>prev+cur,0)
	const totalPriceText = container.querySelector('.Cart-OrderPrice')
	expect(totalPriceText).toBeInTheDocument()
	expect(Number(totalPriceText.textContent.substring(1))).toBe(totalAmount)
  });
});
