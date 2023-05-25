import { APP_CONSTANTS } from "../../../constants/constants.js";
import { MESSAGE_CONSTANTS } from "../../../constants/messages.js";
import { Card } from "../../../js/shared/cards.js";
import {
  checkUnique,
  getLocalStorage,
  removeActiveClass,
  setLocalStorage,
  checkDataLength,
} from "../../../js/utils/utils.js";
import { Checkout } from "../checkout/checkout.js";
import { QuantityCounter } from "../../quantity-counter/quantity-counter.js";
import { CartWishlist } from "../cart-wishlist.js";
import { Toaster } from "../../ui/toaster.js";
import { hideCheckout } from "../wishlist/wishlist.js";
import { populateWishlist } from "../../../js/shared/shared.js";

let cartStore = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
let myCart = cartStore ? cartStore : [];

export const Cart = {
  add: (item) => addToCartStore(item),
  remove: (item, arr) => removeFromCartStore(item, arr),
  displayCart: (item) => displayCartItems(item),
  displayWishlist: (item) => displayWishlistItems(item),
  populateCart: (dataArr) => populateCartItems(dataArr),
};

const addToCartStore = (item) => {
  const existingItem = checkUnique(myCart, item);
  if (!existingItem) {
    Cart.displayCart(item);
    item.quantity = 1;
    myCart = [...myCart, item];
    Toaster.show(
      APP_CONSTANTS.TOASTER.SUCCESS,
      MESSAGE_CONSTANTS.TOASTER.CART.CART_SUCCESS
    );
    setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART, myCart);
  } else {
    const currentElement = myCart.find((cartItem) => cartItem.id == item.id);
    QuantityCounter.increment(currentElement);
  }
  const cartContainer = document.querySelector(".cart-container");
  toggleCheckoutContainer(true);
  toggleMessageContainer(false, cartContainer);
  const myWishlistArr = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST);
  populateWishlist(myWishlistArr);
  CartWishlist.setActive("cartContainer");
  Checkout.calculate(myCart);
};

const removeFromCartStore = (item, arr) => {
  myCart = arr.filter((cartItem) => cartItem.id !== item.id);
  setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART, myCart);
  Card.remove.cartList(item.id);
  if (!myCart.length) {
    const cartContainer = document.querySelector(".cart-container");
    checkDataLength(
      APP_CONSTANTS.STORAGE_KEYS.MY_CART,
      MESSAGE_CONSTANTS.EMPTY_LIST.MY_CART,
      cartContainer
    );
    toggleCheckoutContainer();
  }
};

const displayCartItems = (item) => {
  const cardFragment = new DocumentFragment();
  Card.create.cartList(item, cardFragment);
};

const populateCartItems = (dataArr) => {
  const cardFragment = new DocumentFragment();
  dataArr.forEach((element) => Card.create.cartList(element, cardFragment));
  CartWishlist.setActive("cartContainer");
};

export const toggleCheckoutContainer = (show) => {
  const containerElement = document.querySelector(".checkout-container");
  show
    ? containerElement.classList.remove("d-none")
    : containerElement.classList.add("d-none");
};

export const toggleMessageContainer = (show, container) => {
  console.log("called")
  const containerElement = container.querySelector(".message-container");
  if (containerElement) {
    show
      ? (containerElement.style.display = "flex")
      : (containerElement.style.display = "none");
  }
};
