import { APP_CONSTANTS } from "../../../constants/constants.js";
import { checkUnique , getLocalStorage, setLocalStorage} from "../../../js/utils/utils.js";
import { Cart } from "../cart/cart.js";
import { Card } from "../../../js/shared/cards.js";
import { CartWishlist } from "../cart-wishlist.js";

export const Wishlist = {
    add : (item) => addToWishlist(item),
    display : (item) => displayWishlist(item),
    remove:() => removeWishlist(),
    populateWishlist: (dataArr) => populateWishListItems(dataArr)
}

let wishListStore = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST);
let wishList =  wishListStore ? wishListStore : [];

const addToWishlist = (item) => {
    const existingItem = checkUnique(wishList, item);
    if(!existingItem) {
      Wishlist.display(item);
      wishList = [...wishList, item];
    }
    else {
        alert("display error")
    }
    CartWishlist.setActive("wishListContainer")
    setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST, wishList);
}

const displayWishlist = (item) => {
    console.log("called")
    const cardFragment = new DocumentFragment();
    Card.create.wishList(item, cardFragment);
}
const populateWishListItems = (dataArr) => {
    const cardFragment = new DocumentFragment();
    dataArr.forEach(element => Card.create.wishList(element , cardFragment));
  }
  