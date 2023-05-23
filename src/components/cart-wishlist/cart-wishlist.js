import { removeActiveClass } from "../../js/utils/utils.js";

export const CartWishlist = {
    setActive : (dataAttr) => setActiveLinkTab(dataAttr),
}

const setActiveLinkTab = (dataAttr) => {
    console.log(dataAttr)
        const navLinkNodes = document.querySelectorAll(".tabs li a");
        if(navLinkNodes){
            test(dataAttr , navLinkNodes)
            navLinkNodes.forEach((tabLink) => {
                tabLink.addEventListener('click', () => test( dataAttr, navLinkNodes))
            });
        }
        
}

const test = (dataAttr , arrNodes) => {
    let nodes = Array.from(arrNodes);
    removeActiveClass(nodes)
    let testfed = nodes.find(item => item.getAttribute("data-tab") == dataAttr);
    testfed.classList.add("active");
    const allTabs = document.querySelectorAll(".tab-content");
    removeActiveClass(allTabs)
    const findCurrentTabContent = document.getElementById(dataAttr);
    findCurrentTabContent.classList.add("active")
}



const setActiveTab = () => {
  const allTabs = document.querySelectorAll(".tab-content");
  removeActiveClass(allTabs)
 
}