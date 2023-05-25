import { APP_CONSTANTS } from "../../constants/constants.js";
import { MESSAGE_CONSTANTS } from "../../constants/messages.js";
import { Card } from "../../js/shared/cards.js";
import { appendGroup, createElement, getLocalStorage, removeActiveClass } from "../../js/utils/utils.js";
import { Checkout } from "../cart-wishlist/checkout/checkout.js";

export const Orders = {
  handleClick :  () => handleClickButton(),
  create : {
    container : () => createOrderListContainer(), 
    listItem : () => createOrderListItem()
  },
  display: () => displayOrderList(),
};

const createOrderListContainer = () => {
    const orderListContainer = createElement("div" , "orders-list-container");
    const container = createElement("div" , "container");
    const orderConfirmationMessage = createElement("div" , "order-confirmation-message");
    const containerTitleText =  createElement("h2" , "title-text");
    containerTitleText.textContent = MESSAGE_CONSTANTS.ORDER_CONFIRMATION.HEADING_TEXT
    const containerDescText = createElement("p" , "desc-text");
    containerDescText.textContent = MESSAGE_CONSTANTS.ORDER_CONFIRMATION.CONFIRMATION_TEXT;
    const ordersList = createElement("div" , "orders-list");
    appendGroup([containerTitleText , containerDescText] , orderConfirmationMessage);
    appendGroup([orderConfirmationMessage , ordersList] , container);
    orderListContainer.appendChild(container);
}
const handleClickButton = () => {
    const placeOrderBtn = document.querySelector(".place-order");
    placeOrderBtn.addEventListener("click", () => Orders.display());
    Orders.create.container();
}

const displayOrderList = () => {
    const productsScreen = document.querySelector(".products-screen");
    productsScreen.classList.add("d-none");
    const myOrders = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
    if(myOrders){
        const orderListContainer = document.querySelector(".orders-list");
        orderListContainer.innerHTML = "";
        myOrders.forEach(element => Orders.create.listItem(element));
    }
    const allNavLinks = document.querySelectorAll("header ul .nav-link");
    removeActiveClass(allNavLinks);
    const ordersContainer = document.querySelector(".orders-list-container");
    ordersContainer.classList.remove("d-none")
    const catergoriesContainer = document.querySelector(".categories-container");
    catergoriesContainer.classList.remove("d-none");
}

const createOrderListItem = (item) => {
    const orderListContainer = document.querySelector(".orders-list");
    const orderFragment = new DocumentFragment();
    Card.create.ordersList(item, orderFragment);
    orderListContainer.appendChild(orderFragment);
  };

