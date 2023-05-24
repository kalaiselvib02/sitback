import { APP_CONSTANTS } from "../../../constants/constants.js";
import { checkUnique , getLocalStorage, setLocalStorage} from "../../../js/utils/utils.js";
import { Card } from "../../../js/shared/cards.js";
import { CartWishlist } from "../cart-wishlist.js";
import { Cart } from "../cart/cart.js";
import { Toaster } from "../../ui/toaster.js";
import { MESSAGE_CONSTANTS } from "../../../constants/messages.js";

export const Wishlist = {
    add : (item) => addToWishlistStore(item),
    display : (item) => displayWishlist(item),
    remove:(id) => removeFromWishlistStore(id),
    populateWishlist: (dataArr) => populateWishListItems(dataArr),
    move : (id) => moveToCart(id)
}

let wishListStore = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST);
let wishList =  wishListStore ? wishListStore : [];

const addToWishlistStore = (item) => {
    const existingItem = checkUnique(wishList, item);
    if(!existingItem) {
      Wishlist.display(item);
      wishList = [...wishList, item];
      Toaster.show(APP_CONSTANTS.TOASTER.SUCCESS , MESSAGE_CONSTANTS.TOASTER.WISH_LIST.WISH_LIST_SUCCESS);
    }
    else {
       Toaster.show(APP_CONSTANTS.TOASTER.ERROR , MESSAGE_CONSTANTS.TOASTER.WISH_LIST.WISH_LIST_ERROR);
    }
    CartWishlist.setActive("wishListContainer")
    setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST, wishList);
}

const displayWishlist = (item) => {
    const cardFragment = new DocumentFragment();
    Card.create.wishList(item, cardFragment);
}
const populateWishListItems = (dataArr) => {
    const cardFragment = new DocumentFragment();
    dataArr.forEach(element => Card.create.wishList(element , cardFragment));
}

const removeFromWishlistStore = (id) => {
const filteredArr = wishList.filter(wishlistItem => wishlistItem.id !== id);
setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST , filteredArr);
setTimeout(() => {
Card.remove.wishList(id);
}, APP_CONSTANTS.TOASTER.TIME_INTERVAL);
Toaster.show(APP_CONSTANTS.TOASTER.SUCCESS , MESSAGE_CONSTANTS.TOASTER.WISH_LIST.WISH_LIST_REMOVE);
}

const moveToCart = (id) => {
const currentItem = wishList.find(item => item.id == id);
Cart.add(currentItem);
Wishlist.remove(id);
}

  