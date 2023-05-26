import {createElement} from "../../js/utils/utils.js"
export const Loader = {
    create : () => createLoader(),
    display: () => displayLoader(),
    hide: () =>  hideLoader()
   
}


const createLoader = () => {
    const loader = createElement("div" , "loader");
    loader.setAttribute("hidden" , "")
    loader.setAttribute("id" , "spinner")
    return loader
    
}

const displayLoader = () => {
  const wrapper = document.querySelector(".wrapper");
  const loaderIcon = Loader.create();
  const checkExisting = document.querySelector(".loader");
  if (!checkExisting) wrapper.appendChild(loaderIcon);
  const spinner = document.getElementById("spinner");
  if(spinner) spinner.removeAttribute('hidden');
}

const hideLoader = () => {
  const spinner = document.getElementById("spinner");
  if(spinner) spinner.setAttribute('hidden', '');
}