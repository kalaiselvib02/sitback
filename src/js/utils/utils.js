
/**
 * Query selector with optional scope
 */
export const select = (selector, scope) => (scope || document).querySelector(selector);

/**
 * addEventListener wrapper
 */
export const listen = (target, event, callback, capture = false) => {
  target.addEventListener(event, callback, !!capture);
};

/**
 * create an element with an optional CSS class
 */
export const createElement = (tag, className) => {
  const el = document.createElement(tag);

  el.className = className;
  return el;
};

export const createTextNode = (text) => {
  const el = document.createTextNode(text);
  return el;
};

export const createButton = (buttonContent, className) => {
  const button = createElement("button", className);
  button.textContent = buttonContent;
  return button;
};

export const appendGroup = (arr , selector) => {
  arr.forEach(item => selector.appendChild(item))
}

export const setLocalStorage = (keyName , value) => {
  localStorage.setItem(keyName , JSON.stringify(value))
}

export const getLocalStorage = (keyName) => {
 return localStorage.getItem(keyName) ? JSON.parse(localStorage.getItem(keyName)) : "" 
}

export const checkUnique = (arr , findMatch) => arr.find(item => item.id === findMatch.id);

export const convertToRupee = (price) =>  parseInt(price).toLocaleString('en-IN'); 

export const removeActiveClass = (arr) => {
  arr.forEach(item => item.classList.remove("active"))
}

export const checkDataLength = (key , text , wrapper) => {
  const dataArr = getLocalStorage(key);
  if(!dataArr.length) {
    emptyListMessage(text,wrapper)
  }
}

export const emptyListMessage = (text , wrapper) => {
  const messageContainer = createElement("div" , "message-container");
  const messageElement = document.createElement("p" , "empty-list");
  messageElement.textContent = text;
  messageContainer.appendChild(messageElement);
  const checkExisting = document.querySelector(".message-container");
  if(!checkExisting) wrapper.appendChild(messageContainer)
 
}

export const hideElement = (selector) => {
  selector.classList.add("d-none");
  }
  