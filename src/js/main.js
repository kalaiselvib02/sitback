import { SharedData } from "./shared/shared.js";
import { Header } from "../components/header/header.js";
import { Categories } from "../components/categories/categories.js";
import { Orders } from "../components/orders/orders.js";
import { Loader } from "../components/loader/loader.js";



SharedData.fetch.fetchCategories.getNames();
Header.navigation.create();
Categories.display();



