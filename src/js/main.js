
import { Header } from "../components/header/header.js";
import { Categories } from "../components/categories/categories.js";


const initApp = () => {
    Header.navigation.create();
    Categories.display();
}
initApp()