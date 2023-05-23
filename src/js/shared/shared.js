import { APP_CONSTANTS } from "../../constants/constants.js";
import { fetchData } from "../services/fetchService.js";
import { Products } from "../../components/products/products.js";
import { Header } from "../../components/header/header.js";
import { Cart } from "../../components/cart-wishlist/cart/cart.js";
import { getLocalStorage } from "../utils/utils.js";
import { Wishlist } from "../../components/cart-wishlist/wishlist/wishlist.js";
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
    Header.setActive(catId);
    Products.display(dataList);
    populateCart()
    populateWishlist()
    const footer = document.querySelector("footer");
    footer.classList.add("d-none");
}

const populateCart = () => {
const data = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.MY_CART);
const parentSelector = document.querySelector(".cart-container");
parentSelector.innerHTML = "";
if(data) Cart.populateCart(data);
}
const populateWishlist = () => {
    const data = getLocalStorage(APP_CONSTANTS.STORAGE_KEYS.WISH_LIST);
    const parentSelector = document.querySelector(".wishlist-container");
    parentSelector.innerHTML = "";
    if(data) Wishlist.populateWishlist(data);
}
