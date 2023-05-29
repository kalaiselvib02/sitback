import { APP_CONSTANTS } from "../../../constants/constants.js";
import { checkDataLength, checkUnique , emptyListMessage, getLocalStorage, hideElement, setLocalStorage, showElement} from "../../../js/utils/utils.js";
import { Card } from "../../../js/shared/cards.js";
import { CartWishlist } from "../cart-wishlist.js";
import { Cart, toggleCheckoutContainer} from "../cart/cart.js";
import { Toaster } from "../../ui/toaster.js";
import { MESSAGE_CONSTANTS } from "../../../constants/messages.js";

export const Wishlist = {
    add : (item) => addToWishlistStore(item),
    display : (item) => displayWishlist(item),
    remove:(id) => removeFromWishlistStore(id),
    populateWishlist: (dataArr) => populateWishListItems(dataArr),
    move : (id) => moveToCart(id)
}



const addToWishlistStore = (item) => {
    let wishListStore = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST);
    let wishList =  wishListStore ? wishListStore : [];
    CartWishlist.create();
    CartWishlist.setActive(APP_CONSTANTS.CLASS_NAMES.WISH_LIST);
    CartWishlist.navigate()
    const existingItem = checkUnique(wishList, item);
    const warningIcon = document.querySelector(".warning-icon");
    const successIcon = document.querySelector(".fa-check")
    if(!existingItem) {
      Wishlist.display(item);
      wishList = [...wishList, item];
      showElement(successIcon , "flex");
      hideElement(warningIcon , "flex")
      Toaster.show(APP_CONSTANTS.TOASTER.SUCCESS , MESSAGE_CONSTANTS.TOASTER.WISH_LIST.WISH_LIST_SUCCESS);
    }
    else {
       showElement(warningIcon , "flex");
       hideElement(successIcon , "flex")
       Toaster.show(APP_CONSTANTS.TOASTER.ERROR , MESSAGE_CONSTANTS.TOASTER.WISH_LIST.WISH_LIST_ERROR);
    }
    const messageContainer = document.querySelector(".wishlist-container .message-container")
    if(messageContainer) messageContainer.remove();
    CartWishlist.setActive(APP_CONSTANTS.CLASS_NAMES.WISH_LIST);
    CartWishlist.navigate()
    setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST, wishList);
}

const displayWishlist = (item) => {

    const cardFragment = new DocumentFragment();
    const myCartArr = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
    if(!myCartArr.length){
        const cartContainer = document.querySelector(".cart-container")
        checkDataLength(APP_CONSTANTS.STORAGE_KEYS.MY_CART , MESSAGE_CONSTANTS.EMPTY_LIST.MY_CART , cartContainer)
        toggleCheckoutContainer()
    }
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
    
        const wishListContainer = document.querySelector(".wishlist-container");
        checkDataLength(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST , MESSAGE_CONSTANTS.EMPTY_LIST.WISH_LIST , wishListContainer);
        const messageContainer = wishListContainer.querySelector(".message-container");
        showElement(messageContainer)
        toggleCheckoutContainer()

    const myCartArr = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
    if(myCartArr.length) {
        toggleCheckoutContainer(true)
    }
}
}

const moveToCart = (id) => {
let wishListStore = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST);
let wishList =  wishListStore ? wishListStore : [];
const currentItem = wishList.find(item => item.id == id);
Cart.add(currentItem);
Wishlist.remove(id);
}


