
import { SharedData } from "../../js/shared/shared.js";
import { Card } from "../../js/shared/cards.js";


export const Products = {
   display: (data) => displayProductsList(data),
}


const displayProductsList =   (data) => {
    const dataList = data;
    const categoriesListContainer = document.querySelector(".categories-container");
    categoriesListContainer.classList.add("d-none");
    const productsListContainer = document.querySelector(".products-container .products-list");
    productsListContainer.innerHTML = "";
    dataList.forEach(element => createProductItem(element , productsListContainer));
}
const createProductItem = (item , wrapper) => {
    const productFragment = new DocumentFragment();
    Card.create.productsList(item , productFragment);
    wrapper.appendChild(productFragment);
   
}





