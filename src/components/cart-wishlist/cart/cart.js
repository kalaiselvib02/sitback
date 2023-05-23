import { APP_CONSTANTS } from "../../../constants/constants.js";
import { Card } from "../../../js/shared/cards.js";
import { checkUnique, setLocalStorage } from "../../../js/utils/utils.js";
import { Checkout } from "../checkout/checkout.js";
import { QuantityCounter } from "../../quantity-counter/quantity-counter.js";

let myCart = [];


export const Cart = {
  add: (item) => addToCartStore(item),
  remove : (item) => removeFromCartStore(item),
  display: (item) => displayCartItems(item),
  update: (item) => updateCartStore(item),
};

const addToCartStore = (item)  => {

  const existingItem = checkUnique(myCart, item);
  if(!existingItem) {
    Cart.display(item);
    item.quantity = 1;
    myCart = [...myCart, item];
  }
  else {
   QuantityCounter.increment(item , myCart);
   QuantityCounter.update(item)
  }
  setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART, myCart);
  Checkout.calculate(myCart);
};

const removeFromCartStore = (item) => {
//    const index = item.cardId;
//    const findCartItem = myCart.find(item => item.id == index);
//    QuantityCounter.decrement(findCartItem , myCart);
//    QuantityCounter.update(item)
};

const displayCartItems = (item) => {
  const cardFragment = new DocumentFragment();
  Card.create.cartList(item, cardFragment);
};

const updateCartStore = () => {
  
};

const updateCartCounter = () => {

}
