import { SharedData } from "./shared/shared.js";
import { Header } from "../components/header/header.js";
import { Categories } from "../components/categories/categories.js";
import { Products } from "../components/products/products.js";

SharedData.fetch.fetchCategories.getNames();
Header.navigation();
Categories.display();
Products.display();
