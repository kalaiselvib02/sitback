import { SharedData } from "../../js/shared/shared.js"
import { createElement, removeActiveClass, select } from "../../js/utils/utils.js"




export const Header = {
    apiData : async () => await SharedData.fetch.fetchCategories.getNames(),
    navigation : {
        create : () => createNavigation(),
        navigate : (catdId) => navigateToCategoryProducts(catdId)
    },
    setActive : (id) => setActiveNavItem(id),
}


const getNavigationList =  async () => {
    const  navListItems =  await Header.apiData();
    return navListItems;
}

const createNavigation =  async  () => {
   const navigationList = document.querySelector("header nav .navigation-list");
   const navigationFragment = new DocumentFragment();
   const navListItemNames = await getNavigationList()
   navListItemNames.forEach(navListItem => createNavigationItem(navListItem , navigationFragment));
   navigationList.appendChild(navigationFragment);
}

const createNavigationItem = (listItem , fragment) => {
    const navItem = createElement("li" , "nav-item");
    const navLink = createElement("a" , "nav-link");
    navLink.textContent = listItem;
    navItem.appendChild(navLink);
    navItem.addEventListener("click" , () => Header.navigation.navigate(listItem));
    fragment.appendChild(navItem);
}

const setActiveNavItem = (id) => {
let navLinkNodes = document.querySelectorAll(".nav-link");
if(navLinkNodes) {
    let arr  = Array.from(navLinkNodes);
    const currentNavLink = arr.find( navLink => navLink.textContent.toLowerCase() == id.toLowerCase());
    currentNavLink.classList.add("active")   
}
}


const navigateToCategoryProducts = (catId) => {
const ordersContainer = document.querySelector(".orders-list-container");
ordersContainer.classList.add("d-none");
const categoriesContainer = document.querySelector(".categories-container");
categoriesContainer.classList.add("d-none");
const productsScreen = document.querySelector(".products-screen ");
productsScreen.classList.remove("d-none");
SharedData.fetch.fetchProducts.getList(catId.toLowerCase());
let navLinkNodes = document.querySelectorAll(".nav-link");
navLinkNodes = Array.from(navLinkNodes);
removeActiveClass(navLinkNodes)
setActiveNavItem(catId)
}
