import { removeActiveClass , checkDataLength , hideElement} from "../../js/utils/utils.js";
import { APP_CONSTANTS } from "../../constants/constants.js";
import { MESSAGE_CONSTANTS } from "../../constants/messages.js";

export const CartWishlist = {
    setActive : (dataAttr) => setActiveLinkTab(dataAttr),
    close : () => closeCartWishListContainer() ,
    onLoad : () => checkEmptyListOnLoad()
}

const setActiveLinkTab = (dataAttr) => {
        const navLinkNodes = document.querySelectorAll(".tabs li a");
        if(navLinkNodes){
            activeTabLink(dataAttr , navLinkNodes)
        } 
}

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

const clickTab = () => {
    const navLinkNodes = document.querySelectorAll(".tabs li a");
    navLinkNodes.forEach((tabLink) => {
        tabLink.addEventListener('click', () => {
            const dataAttr = tabLink.getAttribute("data-tab");
            activeTabLink( dataAttr, navLinkNodes)
        })
    });
}

const closeCartWishListContainer = () => {
    const closeButton = document.querySelector(".cart-wishlist-container .btn-close");
    closeButton.addEventListener("click" , () => {
        const parentSelector = closeButton.parentElement.parentElement;
        parentSelector.classList.add("d-none")
    })
}




clickTab()
