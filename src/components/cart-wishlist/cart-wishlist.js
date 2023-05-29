import { removeActiveClass , checkDataLength , hideElement, createElement, appendGroup, createButton} from "../../js/utils/utils.js";
import { APP_CONSTANTS } from "../../constants/constants.js";
import { Checkout } from "./checkout/checkout.js";

export const CartWishlist = {
    create : () => createContainer(),
    navigate : () => navigateTab(),
    setActive : (dataAttr) => setActiveLinkTab(dataAttr),
    close : () => closeCartWishListContainer() ,
    onLoad : () => checkEmptyListOnLoad()
}


const createContainer = () => {
    createCartWishlistNavigation()
    userPreferedItems()
    Checkout.create()
}
// Create Nav
const createCartWishlistNavigation = () => {
    const cartWishlistContainer = createElement("div" , "cart-wishlist-container d-none");
    const closeBtnToggle = createElement("div" , "hide-cart-wishlist-container");
    const closeBtn = createButton("" , "btn btn-close");
    const closeIcon = createElement("i" , "fa-solid fa-xmark");
    closeBtn.appendChild(closeIcon);
    closeBtnToggle.appendChild(closeBtn);
    cartWishlistContainer.appendChild(closeBtnToggle);
    
    const navigationContainer = createElement("nav" , "cart-wishlist-nav");
    const listContainer = createElement("ul" , "tabs");
    const menuListArr = APP_CONSTANTS.CHECKOUT.MENU_NAV;
    const listFragment = new DocumentFragment();
    menuListArr.forEach(menuItem => {
        const navItem = createElement("li" , "tab");
        const navLink = createElement("a" , "nav-link-tab");
        navLink.setAttribute("data-tab" , menuItem.ATTR);
        navLink.textContent = menuItem.NAME;
        navItem.appendChild(navLink);
        listFragment.appendChild(navItem)
    });
    listContainer.appendChild(listFragment);
    navigationContainer.appendChild(listContainer);
    const checkExistingContainer = document.querySelector(".cart-wishlist-container");
    if(!checkExistingContainer) cartWishlistContainer.appendChild(navigationContainer);
    const checkExistingCartWishlistContainer = document.querySelector(".cart-wishlist-container");
    const productsScreen = document.querySelector(".products-screen");
    if(!checkExistingCartWishlistContainer) productsScreen.appendChild(cartWishlistContainer)
}

// Create Cart ,Wishlist containers
const userPreferedItems = () => {
    const cartWishlistContainer = document.querySelector(".cart-wishlist-container");
    const cartWishlistDetails = createElement("div" , "cart-wishlist-details");
    const userPreferedItemsContainer = createElement("div" , "user-prefered-items");
    const cartContainer = createElement("div" , "cart-container tab-content");
    cartContainer.setAttribute("id" , APP_CONSTANTS.CLASS_NAMES.CART_CONTAINER);
    const wishlistContainer = createElement("div" , "wishlist-container tab-content");
    wishlistContainer.setAttribute("id" , APP_CONSTANTS.CLASS_NAMES.WISH_LIST);
    appendGroup([cartContainer , wishlistContainer] , userPreferedItemsContainer);
    cartWishlistDetails.appendChild(userPreferedItemsContainer)
    const checkExistingContainer = document.querySelector(".cart-wishlist-details");
    if(!checkExistingContainer)  cartWishlistContainer.appendChild(cartWishlistDetails)
 
}

const setActiveLinkTab = (dataAttr) => {
        const navLinkNodes = document.querySelectorAll(".tabs li a");
        if(navLinkNodes){
            activeTabLink(dataAttr , navLinkNodes)
        } 
}

// Set active class for current item
const activeTabLink = (dataAttr , arrNodes) => {
    const navNodes = Array.from(arrNodes);
    removeActiveClass(navNodes)
    let currentNavItem = navNodes.find(item => item.getAttribute("data-tab") == dataAttr);
    currentNavItem.classList.add("active");
    const allTabs = document.querySelectorAll(".tab-content");
    removeActiveClass(allTabs)
    const findCurrentTabContent = document.getElementById(dataAttr);
    findCurrentTabContent.classList.add("active")
}
// On click nav item
const navigateTab = () => {
    const navLinkNodes = document.querySelectorAll(".tabs li a");
    navLinkNodes.forEach((tabLink) => {
        tabLink.addEventListener('click', () => {
            const dataAttr = tabLink.getAttribute("data-tab");
            activeTabLink( dataAttr, navLinkNodes)
        })
    });
}

// Mobile responsive close container
const closeCartWishListContainer = () => {
    const closeButton = document.querySelector(".cart-wishlist-container .btn-close");
    closeButton.addEventListener("click" , () => {
        const parentSelector = closeButton.parentElement.parentElement;
        parentSelector.classList.add("d-none")
    })
}





