import { APP_CONSTANTS } from "../../constants/constants.js";
import { createElement } from "../../js/utils/utils.js"

export const Footer = {
    create : () => createFooter(),
}


const createFooter = () => {
    const footer = createElement("footer" , "");
    const footerContainer = createElement("div" , "container");
    const footerText = createElement("p" , "footer-text");
    footerText.textContent = APP_CONSTANTS.COPYRIGHTS;
    footerContainer.appendChild(footerText);
    footer.appendChild(footerContainer);
    return footer;
}

