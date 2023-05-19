import { APP_CONSTANTS } from "../../constants/constants.js";
import { fetchData } from "../services/fetchService.js";
export const SharedData = {
    fetch : {
        fetchCategories : {
            getList : () => getCategoryList(),
            getNames : () => getCategoryNames() 
        },
        fetchProducts : {
            getList : () => getProductsList()
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

const getProductsList = async () => {
    const dataList = await getDataFromService(APP_CONSTANTS.FETCH_URL.PRODUCT);
    return dataList;
}