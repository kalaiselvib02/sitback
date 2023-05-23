import { APP_CONSTANTS } from "../../../constants/constants.js";
import { checkUnique , setLocalStorage} from "../../../js/utils/utils.js";
import { Cart } from "../cart/cart.js";
import { Card } from "../../../js/shared/cards.js";

export const Wishlist = {
    add : (item) => addToWishlist(item),
    display : (item) => displayWishlist(item),
    remove:() => removeWishlist()
}

let wishList = [];

const addToWishlist = (item) => {
    const existingItem = checkUnique(wishList, item);
    if(!existingItem) {
      Wishlist.display(item);
      wishList = [...wishList, item];
      Cart.display(item)
      console.log(wishList)
    }
    else {
        alert("display error")
    }
    setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST, wishList);
}

const displayWishlist = (item) => {
    const cardFragment = new DocumentFragment();
    Card.create.wishList(item, cardFragment);
}