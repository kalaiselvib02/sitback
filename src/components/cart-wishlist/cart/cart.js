import { APP_CONSTANTS } from "../../../constants/constants.js";
import { MESSAGE_CONSTANTS } from "../../../constants/messages.js";
import { Card } from "../../../js/shared/cards.js";
import {
  checkUnique,
  getLocalStorage,
  removeActiveClass,
  setLocalStorage,
  checkDataLength,
  showElement,
  hideElement,
} from "../../../js/utils/utils.js";
import { Checkout } from "../checkout/checkout.js";
import { QuantityCounter } from "../../quantity-counter/quantity-counter.js";
import { CartWishlist } from "../cart-wishlist.js";
import { Toaster } from "../../ui/toaster.js";
import { populateWishlist } from "../../../js/shared/shared.js";



export const Cart = {
  add: (item) => addToCartStore(item),
  remove: (item, arr) => removeFromCartStore(item, arr),
  displayCart: (item) => displayCartItems(item),
  displayWishlist: (item) => displayWishlistItems(item),
  populateCart: (dataArr) => populateCartItems(dataArr),
  clear : () => clearCart()
};

const addToCartStore = (item) => {
let cartStore = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
let myCart = cartStore ? cartStore : [];
  const existingItem = checkUnique(myCart, item);
  if (!existingItem) {
    Cart.displayCart(item);
    item.quantity = item.quantity ? item.quantity : 1;
    myCart = [...myCart, item];
    const warningIcon = document.querySelector(".warning-icon");
    const successIcon = document.querySelector(".fa-check");
    showElement(successIcon , "flex");
    hideElement(warningIcon , "flex")
    Toaster.show(
      APP_CONSTANTS.TOASTER.SUCCESS,
      MESSAGE_CONSTANTS.TOASTER.CART.CART_SUCCESS
    );
    setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART, myCart);
  } else {
    const currentElement = myCart.find((cartItem) => cartItem.id == item.id);
    QuantityCounter.increment(currentElement);
  }

  const messageContainer = document.querySelector(".cart-container .message-container");
  if(messageContainer)   messageContainer.remove()
  toggleCheckoutContainer(true)
  const wishListContainer = document.querySelector(".wishlist-container");
  const myWishlistArr = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST);
  if(!myWishlistArr.length){
    checkDataLength(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST , MESSAGE_CONSTANTS.EMPTY_LIST.WISH_LIST , wishListContainer);
  }
  // populateWishlist(myWishlistArr);
  Checkout.calculate(myCart);
};

const removeFromCartStore = (item) => {
  const myCartArr = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
  if(myCartArr) {
    const filteredArr = myCartArr.filter((cartItem) => cartItem.id !== item.id);
    setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART, filteredArr);
    Card.remove.cartList(item.id);
    if (!filteredArr.length) {
      const cartContainer = document.querySelector(".cart-container");
       checkDataLength(
        APP_CONSTANTS.STORAGE_KEYS.MY_CART,
        MESSAGE_CONSTANTS.EMPTY_LIST.MY_CART,
        cartContainer
      );
      const messageContainer = cartContainer.querySelector(".message-container")
      if(messageContainer) showElement(messageContainer) 
      toggleCheckoutContainer();
    }
  }
 
 
 
};

const displayCartItems = (item) => {
  const cardFragment = new DocumentFragment();
  Card.create.cartList(item, cardFragment);
};

const populateCartItems = (dataArr) => {
  const cardFragment = new DocumentFragment();
  dataArr.forEach((element) => Card.create.cartList(element, cardFragment));
};

const clearCart = () => {
const cartItems = document.querySelectorAll(".cart-container .card");
cartItems.forEach(cartItem => cartItem.remove());
}
export const toggleCheckoutContainer = (show) => {
  const containerElement = document.querySelector(".checkout-container");
  show ? showElement(containerElement) : hideElement(containerElement)
};

