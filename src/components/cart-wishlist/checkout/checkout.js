import { APP_CONSTANTS } from "../../../constants/constants.js";
import {
  convertToRupee,
  setLocalStorage,
  getLocalStorage,
  createElement,
  appendGroup,
} from "../../../js/utils/utils.js";
import { Orders } from "../../orders/orders.js";
export const Checkout = {
  create: () => createContainer(),
  calculate: (ordersListArr) => calculatePrice(ordersListArr),
  display: (totalPrice) => displayPrice(totalPrice),
  populate: () => populatePrice(),
  handleClick: () => handleClickButton(),
};

const createContainer = () => {
  const cartWishlistDetails = document.querySelector(".cart-wishlist-details");
  // Create Checkout UI //
  const checkoutContainer = createElement("div", "checkout-container");
  const checkoutDetailsContainer = createElement("div", "checkout-details");
  const containerHeading = createElement("p", "container-heading text-sm");
  containerHeading.textContent = APP_CONSTANTS.CHECKOUT.TOTAL;
  const priceContainerDetails = createElement("div", "price-container-details");
  const totalPriceContainer = createElement("div", "total-price");
  const rupeeIcon = createElement("i", "fa fa-inr");
  const totalAmount = createElement("p", "total-amount");
  const buttonContainer = createElement("div", "button-container");
  const placeOrderButton = createElement(
    "button",
    "btn btn-sm btn-primary place-order"
  );
  placeOrderButton.textContent = APP_CONSTANTS.CHECKOUT.PLACE_ORDER;
  // Set event listener
  placeOrderButton.addEventListener("click", () => Orders.display());
  // append element
  buttonContainer.appendChild(placeOrderButton);
  appendGroup([rupeeIcon, totalAmount], totalPriceContainer);
  appendGroup([containerHeading , totalPriceContainer] , priceContainerDetails)
 
  appendGroup([priceContainerDetails , buttonContainer], checkoutDetailsContainer);
  checkoutContainer.appendChild(checkoutDetailsContainer);

  const checkExistingContainer = document.querySelector(".checkout-container");
  if (!checkExistingContainer)
    cartWishlistDetails.appendChild(checkoutContainer);
};

const calculatePrice = (ordersListArr) => {
  let price = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.TOTAL_PRICE);
  let totalPrice =  price ? price : 0;
  ordersListArr.forEach(element => (totalPrice += element.quantity * parseInt(element.price))
  );
  // totalPrice = convertToRupee(totalPrice);
  Checkout.display(totalPrice);
};

const displayPrice = (totalPrice) => {
  const priceContainer = document.querySelector(".total-amount");
  if (priceContainer) {
    priceContainer.textContent = totalPrice;
    
  }
  setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.TOTAL_PRICE , totalPrice);
};

const populatePrice = () => {
  const currentPrice = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.TOTAL_PRICE);
  if (currentPrice) {
    const priceContainer = document.querySelector(".total-amount");
    if (priceContainer) priceContainer.textContent = currentPrice;
  }
};
