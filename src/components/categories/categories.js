
import { SharedData } from "../../js/shared/shared.js";
import { Card } from "../../js/shared/cards.js";

export const Categories = {
    get : () => getCategoriesList(),
    display: () => displayCategoryList()
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
    categoriesListContainer.appendChild(categoryFragment)
}






