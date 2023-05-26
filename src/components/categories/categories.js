
import { SharedData } from "../../js/shared/shared.js";
import { Card } from "../../js/shared/cards.js";
import { Header } from "../header/header.js";
import { appendGroup, createElement, createTextNode } from "../../js/utils/utils.js";
import { Footer } from "../footer/footer.js";
import { APP_CONSTANTS } from "../../constants/constants.js";

export const Categories = {
    get : () => getCategoriesList(),
    display: () => displayCategoryList(),
    navigate : () => navigateToProduct()
}

const createHeroText = () => {
    const categoriesContainer = createElement("div" , "categories-container");
    const heroTextContainer = createElement("div" , "hero-text-container");
    const headingText = createElement("h1" , "heading-text");
    const headingTextVal = createTextNode(APP_CONSTANTS.CATEGORIES.HERO_TEXT)
    headingText.appendChild(headingTextVal);
    const subText = createElement("p" , "sub-text");
    const subTextVal = createTextNode(APP_CONSTANTS.CATEGORIES.SUB_TEXT)
    subText.appendChild(subTextVal);
    appendGroup([headingText , subText] , heroTextContainer);
    categoriesContainer.appendChild(heroTextContainer);
    const categoriesListContainer = createElement("div" ,  "categories-list");
    categoriesContainer.appendChild(categoriesListContainer)
    const wrapper = document.querySelector(".wrapper");
    const checkExistingContainer = document.querySelector(".categories-container");
    if(!checkExistingContainer) wrapper.appendChild(categoriesContainer);
}

const getCategoriesList =  async () => {
    const responseData = await SharedData.fetch.fetchCategories.getList();
    return responseData
} 

const displayCategoryList =  async () => {
    createHeroText();
    const dataList = await Categories.get()
    dataList.forEach(element => createCategoryItem(element));
    const wrapper = document.querySelector(".wrapper");
    const footer = Footer.create();
    const checkExistingFooter = document.querySelector("footer");
    if(!checkExistingFooter) wrapper.appendChild(footer);
}
const createCategoryItem = (item) => {
    const categoriesContainer = document.querySelector(".categories-container");
    const categoriesListContainer =  document.querySelector(".categories-list");
    if(categoriesContainer){
        const categoryFragment = new DocumentFragment();
        Card.create.categoriesList(item , categoryFragment);
        categoriesListContainer.appendChild(categoryFragment);
        categoriesContainer.appendChild(categoriesListContainer);
        Categories.navigate();
    }
   
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



