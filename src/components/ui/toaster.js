import { APP_CONSTANTS } from "../../constants/constants.js";

export const Toaster = {
    show : (status , message) => showToaster(status , message),
    hide : () => hideToaster()
}

const showToaster = (status , message) => {
const toast = document.querySelector(".toast");
toast.classList.add("active");
const statusText = document.querySelector(".status-text");
statusText.textContent = status;
const messageText = document.querySelector(".message-text");
messageText.textContent = message;
const progress = document.querySelector(".progress");
progress.classList.add("active");
Toaster.hide()
}

const hideToaster = () => {
    const toast = document.querySelector(".toast");
    const progress = toast.querySelector(".progress");
    setTimeout(() => {
        toast.classList.remove("active");
    }, APP_CONSTANTS.TOASTER.TIME_INTERVAL);

    setTimeout(() => {
      progress.classList.remove("active");
    }, APP_CONSTANTS.TOASTER.TIME_INTERVAL);
    setTimeout (() => {
        const statusText = document.querySelector(".status-text");
        statusText.textContent = "";
        const messageText = document.querySelector(".message-text");
        messageText.textContent = "";
    }, APP_CONSTANTS.TOASTER.TIME_INTERVAL)
}


