import { APP_CONSTANTS } from "../../../constants/constants.js";
import { Card } from "../../../js/shared/cards.js";
import { checkUnique, getLocalStorage, removeActiveClass, setLocalStorage } from "../../../js/utils/utils.js";
import { Checkout } from "../checkout/checkout.js";
import { QuantityCounter } from "../../quantity-counter/quantity-counter.js";
import { CartWishlist } from "../cart-wishlist.js";


let cartStore = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
let myCart =  cartStore ? cartStore : [];


export const Cart = {
  add: (item) => addToCartStore(item),
  remove : (item , arr) => removeFromCartStore(item , arr),
  displayCart: (item) => displayCartItems(item),
  displayWishlist: (item) => displayWishlistItems(item),
  populateCart : (dataArr) => populateCartItems(dataArr)
 
};

const addToCartStore = (item)  => {
  const existingItem = checkUnique(myCart, item);
  if(!existingItem) {
    Cart.displayCart(item);
    item.quantity = 1;
    myCart = [...myCart, item];
  }
  else {
   QuantityCounter.increment(item , myCart);
   QuantityCounter.update(item)
  }
  CartWishlist.setActive("cartContainer")
  setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART, myCart);
  Checkout.calculate(myCart);
};

const removeFromCartStore = (item , arr) => {
  myCart = arr.filter(cartItem => cartItem.id !== item.id);
  setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART , myCart);
  Card.remove.cartList(item.id)
};

const displayCartItems = (item) => {
  const cardFragment = new DocumentFragment();
  Card.create.cartList(item, cardFragment);
};


const populateCartItems = (dataArr) => {
  const cardFragment = new DocumentFragment();
  dataArr.forEach(element => Card.create.cartList(element , cardFragment));
}

