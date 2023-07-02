import { CartState } from "../../common/types";

export const CATALOG = [
	{
	  id: 0,
	  name: "Unbranded Keyboard",
	  price: 842,
	},
	{
	  id: 1,
	  name: "Intelligent Shoes",
	  price: 508,
	},
	{
	  id: 2,
	  name: "Gorgeous Tuna",
	  price: 342,
	},
	{
	  id: 3,
	  name: "Handmade Bike",
	  price: 776,
	},
	{
	  id: 4,
	  name: "Tasty Table",
	  price: 377,
	},
	{
	  id: 5,
	  name: "Rustic Chips",
	  price: 344,
	},
	{
	  id: 6,
	  name: "Handcrafted Salad",
	  price: 31,
	},
	{
	  id: 7,
	  name: "Incredible Bacon",
	  price: 890,
	},
	{
	  id: 8,
	  name: "Intelligent Chicken",
	  price: 974,
	},
	{
	  id: 9,
	  name: "Handcrafted Chair",
	  price: 715,
	},
	{
	  id: 10,
	  name: "Fantastic Fish",
	  price: 775,
	},
	{
	  id: 11,
	  name: "Generic Soap",
	  price: 624,
	},
	{
	  id: 12,
	  name: "Refined Chicken",
	  price: 891,
	},
	{
	  id: 13,
	  name: "Sleek Shoes",
	  price: 158,
	},
	{
	  id: 14,
	  name: "Sleek Chair",
	  price: 31,
	},
	{
	  id: 15,
	  name: "Incredible Cheese",
	  price: 613,
	},
	{
	  id: 16,
	  name: "Gorgeous Soap",
	  price: 758,
	},
	{
	  id: 17,
	  name: "Unbranded Soap",
	  price: 741,
	},
	{
	  id: 18,
	  name: "Sleek Fish",
	  price: 513,
	},
	{
	  id: 19,
	  name: "Refined Towels",
	  price: 327,
	},
	{
	  id: 20,
	  name: "Handcrafted Computer",
	  price: 553,
	},
	{
	  id: 21,
	  name: "Tasty Chicken",
	  price: 41,
	},
	{
	  id: 22,
	  name: "Awesome Chicken",
	  price: 121,
	},
	{
	  id: 23,
	  name: "Generic Computer",
	  price: 598,
	},
	{
	  id: 24,
	  name: "Small Bike",
	  price: 811,
	},
	{
	  id: 25,
	  name: "Handcrafted Towels",
	  price: 98,
	},
	{
	  id: 26,
	  name: "Fantastic Sausages",
	  price: 2,
	},
  ];
  

export const FULL_ITEM_DATA = {
    "id": 3,
    "name": "Handmade Bike",
    "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    "price": 776,
    "color": "lime",
    "material": "Rubber"
}


  export const PRODUCTS_FOR_CART = [
	  {
		  "id": 0,
		  "name": "Unbranded Keyboard",
		  "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
		  "price": 842,
		  "color": "blue",
		  "material": "Concrete"
	  },{
		"id": 0,
		"name": "Unbranded Keyboard",
		"description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
		"price": 842,
		"color": "blue",
		"material": "Concrete"
	},{
		"id": 0,
		"name": "Unbranded Keyboard",
		"description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
		"price": 842,
		"color": "blue",
		"material": "Concrete"
	},{
		  "id": 1,
		  "name": "Intelligent Shoes",
		  "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
		  "price": 508,
		  "color": "cyan",
		  "material": "Steel"
	  },{
		  "id": 3,
		  "name": "Handmade Bike",
		  "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
		  "price": 776,
		  "color": "lime",
		  "material": "Rubber"
	  }
  ]

  export const CART_STATE: CartState = {};
  for (const product of PRODUCTS_FOR_CART) {
	if (CART_STATE[product.id]) {
	  CART_STATE[product.id].count += 1;
	  continue;
	}
	CART_STATE[product.id] = {
	  name: product.name,
	  price: product.price,
	  count: 1,
	};
  }