
import { SharedData } from "../../js/shared/shared.js";
import { Card } from "../../js/shared/cards.js";
import { appendGroup, createElement } from "../../js/utils/utils.js";
import { CartWishlist } from "../cart-wishlist/cart-wishlist.js";


export const Products = {
   create : () => createProductsContainer(),
   display: (data) => displayProductsList(data),
}


const createProductsContainer = () => {
    const wrapper = document.querySelector(".wrapper");
    const productsScreen = createElement("div" , "container products-screen");
    const productsContainer = createElement("div" , "products-container");
    const productsList = createElement("div" , "products-list");
    productsContainer.appendChild(productsList);
    productsScreen.appendChild(productsContainer);
    const checkExistingProdScreen = document.querySelector(".products-screen");
    if(!checkExistingProdScreen) wrapper.appendChild(productsScreen)
}

const displayProductsList =   (data) => {
    const dataList = data;
    const productsListContainer = document.querySelector(".products-container .products-list");
    productsListContainer.innerHTML = "";
    dataList.forEach(element => createProductItem(element , productsListContainer));
}
const createProductItem = (item , wrapper) => {
    const productFragment = new DocumentFragment();
    Card.create.productsList(item , productFragment);
    wrapper.appendChild(productFragment);
   
}





