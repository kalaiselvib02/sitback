
import { SharedData } from "../../js/shared/shared.js";
import { Card } from "../../js/shared/cards.js";


export const Products = {
    display: () => displayProductsList()
}


const getProductsList =  async () => {
    const responseData = await SharedData.fetch.fetchProducts.getList();
    return responseData
} 

const displayProductsList =  async () => {
    const dataList = await getProductsList()
    dataList.forEach(element => createProductItem(element));
}
const createProductItem = (item) => {
    const productsListContainer = document.querySelector(".products-container .products-list");
    const productFragment = new DocumentFragment();
    Card.create.productsList(item , productFragment);
    productsListContainer.appendChild(productFragment);
  
}





