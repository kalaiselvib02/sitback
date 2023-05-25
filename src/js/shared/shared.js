import { APP_CONSTANTS } from "../../constants/constants.js";
import { fetchData } from "../services/fetchService.js";
import { Products } from "../../components/products/products.js";
import { Cart , toggleCheckoutContainer, toggleMessageContainer } from "../../components/cart-wishlist/cart/cart.js";
import { checkDataLength, emptyListMessage, getLocalStorage } from "../utils/utils.js";
import { hideCheckout, Wishlist } from "../../components/cart-wishlist/wishlist/wishlist.js";
import { CartWishlist } from "../../components/cart-wishlist/cart-wishlist.js";
import { Checkout } from "../../components/cart-wishlist/checkout/checkout.js";
import { MESSAGE_CONSTANTS } from "../../constants/messages.js";
export const SharedData = {
    fetch : {
        fetchCategories : {
            getList : () => getCategoryList(),
            getNames : () => getCategoryNames() 
        },
        fetchProducts : {
            getList : (catId) => getProductsList(catId)
        }
    },
}


const createDataForFetch = (url) => {
    const apiUrl = url;
    const searchObject = {
        url : apiUrl
    }
    return searchObject;
} 

const getDataFromService = async (url) => {
    const searchParams = createDataForFetch(url);
    const responseData = await fetchData(searchParams);
    return responseData
}


const getCategoryList = async () => {
    const dataList = await getDataFromService(APP_CONSTANTS.FETCH_URL.CATEGORIES);
    return dataList;
}

const getCategoryNames = async () => {
    const dataList = await getCategoryList();
    let categoryNames = [];
    dataList.forEach(dataElement => categoryNames.push(dataElement.category));
    return categoryNames
}

const getProductsList = async (catId) => {
    const productUrl = APP_CONSTANTS.FETCH_URL.PRODUCT + catId
    const dataList = await getDataFromService(productUrl);
    Products.display(dataList);
    populateCart()
    populateWishlist();
    Checkout.populate()
    CartWishlist.close();
    const footer = document.querySelector("footer");
    footer.classList.add("d-none");
}

export const populateCart = () => {
const myCartArr = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
CartWishlist.setActive("cartContainer");
const parentSelector = document.querySelector(".cart-container");
parentSelector.innerHTML = "";
if(myCartArr.length) {
    Cart.populateCart(myCartArr);
}
else{
    toggleMessageContainer(true , parentSelector)
}


}

export const populateWishlist = () => {
    const wishListArr = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST);
    const parentSelector = document.querySelector(".wishlist-container");
    parentSelector.innerHTML = "";
    if(wishListArr.length) {
        Wishlist.populateWishlist(wishListArr);
    }
    else{
        checkDataLength(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST , MESSAGE_CONSTANTS.EMPTY_LIST.WISH_LIST , parentSelector)
        toggleMessageContainer(true , parentSelector)
    }
    
}

