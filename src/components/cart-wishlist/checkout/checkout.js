import { APP_CONSTANTS } from "../../../constants/constants.js";
import { convertToRupee, setLocalStorage , getLocalStorage} from "../../../js/utils/utils.js";

export const Checkout = {
    calculate : (ordersListArr) => calculatePrice(ordersListArr),
    display : (totalPrice) => displayPrice(totalPrice)
}

const calculatePrice = (ordersListArr) => {
    let totalPrice = 0;
    ordersListArr.forEach(element => {
        totalPrice +=  (element.quantity * parseInt(element.price))
    });
    totalPrice = convertToRupee(totalPrice)
  Checkout.display(totalPrice)
}

const displayPrice = (totalPrice) => {
    const priceContainer = document.querySelector(".total-amount");
    priceContainer.textContent = totalPrice;
    setLocalStorage(APP_CONSTANTS.STORAGE_KEYS.TOTAL_PRICE , totalPrice);
  
}
