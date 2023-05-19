import { Card } from "../../js/shared/cards.js";

export const Cart = {
    add : (item) => addToCart(item)
}


const addToCart = (item) => {
const cardFragment = new DocumentFragment();
Card.create.cartList(item , cardFragment);
}