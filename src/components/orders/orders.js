import { APP_CONSTANTS } from "../../constants/constants.js";
import { MESSAGE_CONSTANTS } from "../../constants/messages.js";
import { Card } from "../../js/shared/cards.js";
import {
  appendGroup,
  createElement,
  getLocalStorage,
  hideElement,
  removeActiveClass,
  clearLocalStorage,
  setLocalStorage,
} from "../../js/utils/utils.js";
import { Cart, toggleCheckoutContainer } from "../cart-wishlist/cart/cart.js";
import { Categories } from "../categories/categories.js";

export const Orders = {
  create: {
    container: () => createOrderListContainer(),
    listItem: (element) => createOrderListItem(element),
  },
  handleClick: () => handleClickButton(),
  display: () => displayOrderList(),
};

const createOrderListContainer = () => {
  const orderListContainer = createElement("div", "orders-list-container");
  const container = createElement("div", "container");
  const orderConfirmationMessage = createElement(
    "div",
    "order-confirmation-message"
  );
  const containerTitleText = createElement("h2", "title-text");
  containerTitleText.textContent =
    MESSAGE_CONSTANTS.ORDER_CONFIRMATION.HEADING_TEXT;
  const containerDescText = createElement("p", "desc-text");
  containerDescText.textContent =
    MESSAGE_CONSTANTS.ORDER_CONFIRMATION.CONFIRMATION_TEXT;
  const ordersList = createElement("div", "orders-list");
  appendGroup(
    [containerTitleText, containerDescText],
    orderConfirmationMessage
  );
  appendGroup([orderConfirmationMessage, ordersList], container);
  orderListContainer.appendChild(container);
  const wrapper = document.querySelector(".wrapper");
  const checkExistingContainer = document.querySelector(
    ".orders-list-container"
  );
  if (!checkExistingContainer) wrapper.appendChild(orderListContainer);
};

const displayOrderList = () => {
  const productsScreen = document.querySelector(".products-screen");
  hideElement(productsScreen);
  Orders.create.container();
  const myCartArr = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
  let orders = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.ORDERS);
  orders = [...orders , myCartArr];
  setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.ORDERS , orders)
  if (orders) {
    const orderListContainer = document.querySelector(".orders-list");
    orderListContainer.innerHTML = "";
    myCartArr.forEach((element) => Orders.create.listItem(element));
  }
  const allNavLinks = document.querySelectorAll("header ul .nav-link");
  removeActiveClass(allNavLinks);
  clearLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
  Cart.clear();
  toggleCheckoutContainer();
  Categories.display();
};

const createOrderListItem = (item) => {
  const orderListContainer = document.querySelector(".orders-list");
  if (orderListContainer) {
    const orderFragment = new DocumentFragment();
    Card.create.ordersList(item, orderFragment);
    orderListContainer.appendChild(orderFragment);
  }
};
