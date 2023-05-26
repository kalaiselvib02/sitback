import { APP_CONSTANTS } from "../../constants/constants.js";
import {
  createElement,
  select,
  setLocalStorage,
  appendGroup,
  createButton,
  getLocalStorage,
} from "../../js/utils/utils.js";
import { Cart } from "../cart-wishlist/cart/cart.js";
import { Checkout } from "../cart-wishlist/checkout/checkout.js";

export const QuantityCounter = {
  create: (item, fragment) => createQuantityCounter(item, fragment),
  increment: (item) => incrementQuantity(item),
  decrement: (item) => decrementQuantity(item),
  update: (item) => updateCounterValue(item),
};

const createQuantityCounter = (itemDetails, fragment) => {
  const quantityCounter = createElement(
    "div",
    "quantity-counter item-right-section"
  );
  quantityCounter.setAttribute("data-index", itemDetails.cardId);
  const decrementQuantityBtn = createButton("-", "dec-quantity");
  decrementQuantityBtn.addEventListener("click", () =>
    QuantityCounter.decrement(itemDetails)
  );
  const quantity = createElement("p", "quantity-value");
  quantity.textContent = itemDetails.cardQuantity;
  const addQuantityBtn = createButton("+", "add-quantity");
  addQuantityBtn.addEventListener("click", () =>
    QuantityCounter.increment(itemDetails)
  );
  appendGroup(
    [decrementQuantityBtn, quantity, addQuantityBtn],
    quantityCounter
  );
  fragment.appendChild(quantityCounter);
  return fragment;
};

const incrementQuantity = (item) => {
  const myCartArr = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
  if (myCartArr) {
    const currentIndex = myCartArr.findIndex(
      (it) => it.id == (item.id || item.cardId)
    );
    myCartArr[currentIndex].quantity = myCartArr[currentIndex].quantity + 1;
    setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART, myCartArr);
    QuantityCounter.update(myCartArr[currentIndex]);
    Checkout.calculate(myCartArr);
  }
};

const decrementQuantity = (itemVal) => {
  const myCartArr = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
  if (myCartArr) {
    const currentIndex = myCartArr.findIndex((it) => it.id == itemVal.cardId);
    myCartArr[currentIndex].quantity = myCartArr[currentIndex].quantity - 1;
    setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART, myCartArr);
    QuantityCounter.update(myCartArr[currentIndex]);
    Checkout.calculate(myCartArr);
    if (myCartArr[currentIndex].quantity <= 0) {
      Cart.remove(myCartArr[currentIndex], myCartArr);
    }
  }
};

const updateCounterValue = (item) => {
  const allCartNodes = document.querySelectorAll(".cart-container .card");
  allCartNodes.forEach((cartNode) => {
    const quantityCounter = cartNode.querySelector(".quantity-counter");
    const currentIndex = quantityCounter.getAttribute("data-index");
    if (item.id == currentIndex) {
      const counterValue = quantityCounter.querySelector(".quantity-value");
      counterValue.textContent = item.quantity;
    }
  });
};
