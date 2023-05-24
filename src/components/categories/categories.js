
import { SharedData } from "../../js/shared/shared.js";
import { Card } from "../../js/shared/cards.js";
import { Header } from "../header/header.js";

export const Categories = {
    get : () => getCategoriesList(),
    display: () => displayCategoryList(),
    navigate : () => navigateToProduct()
}


const getCategoriesList =  async () => {
    const responseData = await SharedData.fetch.fetchCategories.getList();
    return responseData
} 

const displayCategoryList =  async () => {
    const dataList = await Categories.get()
    dataList.forEach(element => createCategoryItem(element));
}
const createCategoryItem = (item) => {
    const categoriesListContainer = document.querySelector(".categories-container .categories-list");
    const categoryFragment = new DocumentFragment();
    Card.create.categoriesList(item , categoryFragment);
    categoriesListContainer.appendChild(categoryFragment);
    Categories.navigate();
}

const navigateToProduct = () => {
    const navigationBtns = document.querySelectorAll(".btn-shop-now");
    navigationBtns.forEach((button) => {
        button.addEventListener('click', () => getProductId(button))
    });
}

const getProductId = (button) => {
const id = button.getAttribute("id");
Header.setActive(id);
SharedData.fetch.fetchProducts.getList(id);
}



