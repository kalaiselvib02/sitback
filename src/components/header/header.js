import { SharedData } from "../../js/shared/shared.js"
import { createElement, select } from "../../js/utils/utils.js"




export const Header = {
    apiData : async () => await SharedData.fetch.fetchCategories.getNames(),
    navigation : () => createNavigation()
}


const getNavigationList =  async () => {
    const navListItems =  await Header.apiData();
    return navListItems;
}

const createNavigation =  async  () => {
   const scope = "header nav";
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
    fragment.appendChild(navItem);
}
