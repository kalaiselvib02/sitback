import { APP_CONSTANTS } from "../../constants/constants.js";
import { Card } from "../../js/shared/cards.js";
import { getLocalStorage } from "../../js/utils/utils.js";
import { Checkout } from "../cart-wishlist/checkout/checkout.js";

export const Orders = {
  handleClick :  () => handleClickButton(),
  create : () => createOrderListItem(),
  display: () => displayOrderList(),
};

const handleClickButton = () => {
    const placeOrderBtn = document.querySelector(".place-order");
    placeOrderBtn.addEventListener("click", () => Orders.display());
}

const displayOrderList = () => {
    const productsScreen = document.querySelector(".products-screen");
    productsScreen.classList.add("d-none");
    const myOrders = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
    if(myOrders){
        myOrders.forEach(element => createOrderListItem(element));
    }
    const ordersContainer = document.querySelector(".orders-list-container");
    ordersContainer.classList.remove("d-none")
    const catergoriesContainer = document.querySelector(".categories-container");
    catergoriesContainer.classList.remove("d-none")
}

const createOrderListItem = (item) => {
    const orderListContainer = document.querySelector(".orders-list");
    const orderFragment = new DocumentFragment();
    Card.create.ordersList(item, orderFragment);
    orderListContainer.appendChild(orderFragment);
  };