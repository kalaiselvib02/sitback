import { APP_CONSTANTS } from "../../constants/constants.js";

/**
 * Query selector with optional scope
 */
export const select = (selector, scope) =>
  (scope || document).querySelector(selector);

/**
 * addEventListener wrapper
 */
export const listen = (target, event, callback, capture = false) => {
  target.addEventListener(event, callback, !!capture);
};

/**
 * create an element with  CSS class
 */
export const createElement = (tag, className) => {
  const el = document.createElement(tag);

  el.className = className;
  return el;
};

/**
 * create an text node element 
 */
export const createTextNode = (text) => {
  const el = document.createTextNode(text);
  return el;
};

/**
 * create a button element
 */
export const createButton = (buttonContent, className) => {
  const button = createElement("button", className);
  button.textContent = buttonContent;
  return button;
};

/**
 * append all items with same selector 
 */
export const appendGroup = (arr, selector) => {
  arr.forEach((item) => (selector ? selector.appendChild(item) : ""));
};


export const setLocalStorage = (keyName, value) => {
  localStorage.setItem(keyName, JSON.stringify(value));
};

export const getLocalStorage = (keyName) => {
  return localStorage.getItem(keyName)
    ? JSON.parse(localStorage.getItem(keyName))
    : "";
};

export const clearLocalStorage = (keyName) => {
  localStorage.getItem(keyName) ? localStorage.removeItem(keyName) : "";
};

/**
 * check unique entrie before pushing
 */
export const checkUnique = (arr, findMatch) =>
  arr.find((item) => item.id === findMatch.id);

/**
 * set formatting conventions
 */
export const convertToRupee = (price) =>
  parseInt(price).toLocaleString(APP_CONSTANTS.CURRENCY_STANDARDS.IN , { maximumSignificantDigits: 3 });

export const removeActiveClass = (arr) => {
  arr.forEach((item) => item.classList.remove("active"));
};

export const checkDataLength = (key, text, wrapper) => {
  const dataArr = getLocalStorage(key);
  if (!dataArr.length) {
    emptyListMessage(text, wrapper);
  }
};

export const emptyListMessage = (text, wrapper) => {
  const messageContainer = createElement("div", "message-container");
  const messageElement = document.createElement("p", "empty-list");
  messageElement.textContent = text;
  messageContainer.appendChild(messageElement);
  const checkExisting = wrapper.querySelector(".message-container");
  if (!checkExisting) wrapper.appendChild(messageContainer);
};

export const hideElement = (selector, flexClass) => {
  if (selector) {
    if (flexClass) {
      selector.style.display = "none";
    } else {
      selector.classList.add("d-none");
    }
  }
};

export const showElement = (selector, flexClass) => {
  if (selector) {
    if (flexClass) {
      selector.style.display = flexClass
    } else {
      selector.classList.remove("d-none");
    }
  }
};
