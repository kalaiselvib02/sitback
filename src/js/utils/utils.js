
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
export const appendGroup = (arr , selector) => {
  arr.forEach(item => selector.appendChild(item))
}

