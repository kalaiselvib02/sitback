import { APP_CONSTANTS } from "../../../constants/constants.js";
import { checkDataLength, checkUnique , getLocalStorage, setLocalStorage} from "../../../js/utils/utils.js";
import { Card } from "../../../js/shared/cards.js";
import { CartWishlist } from "../cart-wishlist.js";
import { Cart, toggleCheckoutContainer , toggleMessageContainer} from "../cart/cart.js";
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
    const wishListContainer = document.querySelector(".wishlist-container")
    toggleMessageContainer(false , wishListContainer)
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
const wishlistArr = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST);
if(wishlistArr) {
    const filteredArr = wishlistArr.filter(wishlistItem => wishlistItem.id !== id);
    Card.remove.wishList(id);
    setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST , filteredArr);
    setTimeout(() => {
    }, APP_CONSTANTS.TOASTER.TIME_INTERVAL);
    Toaster.show(APP_CONSTANTS.TOASTER.SUCCESS , MESSAGE_CONSTANTS.TOASTER.WISH_LIST.WISH_LIST_REMOVE);
    if(!filteredArr.length) {
        const wishListContainer = document.querySelector(".wishlist-container");
        checkDataLength(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST , MESSAGE_CONSTANTS.EMPTY_LIST.WISH_LIST , wishListContainer);
        toggleMessageContainer(true , wishListContainer) 
        toggleCheckoutContainer(false)
    }
    const myCartArr = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
    if(myCartArr.length) {
        toggleCheckoutContainer(true)
    }
}
}

const moveToCart = (id) => {
const currentItem = wishList.find(item => item.id == id);
Cart.add(currentItem);
Wishlist.remove(id);
}

export const hideCheckout = () => {
    const myCartArr = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
    if(!myCartArr.length) {
        const checkoutContainer = document.querySelector(".checkout-container");
        checkoutContainer.classList.add("d-none");
    }
}

