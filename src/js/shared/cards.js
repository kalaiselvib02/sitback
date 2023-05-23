import { Cart } from "../../components/cart-wishlist/cart/cart.js";
import { QuantityCounter } from "../../components/quantity-counter/quantity-counter.js";
import { Wishlist } from "../../components/cart-wishlist/wishlist/wishlist.js";
import { APP_CONSTANTS } from "../../constants/constants.js";
import {
  appendGroup,
  createElement,
  createTextNode,
  createButton,
  convertToRupee,
} from "../utils/utils.js";

export const Card = {
  create: {
    categoriesList: (item, fragment) => createCategoryCard(item, fragment),
    productsList: (item, fragment) => createProductCard(item, fragment),
    cartList: (item, fragment) => createCartCard(item, fragment),
    wishList : (item , fragment) => createWishListCard(item , fragment)
  },
};

const createCategoryCard = (item, fragment) => {
  const cardItemDetails = {
    cardImageUrl: item.photo,
    cardImageOnErrorUrl: item.onError,
    cardTitle: item.category,
    cardDescription: item.description,
    cardButtonDetails: [
      {
        className: "btn btn-sm btn-primary btn-shop-now",
        text: APP_CONSTANTS.SHOP_NOW,
      },
    ],
  };

  categoryCard(cardItemDetails, fragment);
};

const categoryCard = (itemDetails, fragment) => {
  const card = createElement("div", "card");
  const image = createImage(
    itemDetails.cardImageUrl,
    itemDetails.cardImageOnErrorUrl
  );
  const title = createCardTitle(itemDetails.cardTitle);
  const description = createDescription(itemDetails.cardDescription);
  const cardDetails = createElement("div", "card-details");
  const cardHeading = createElement("div", "card-heading");
  cardHeading.appendChild(title);
  const cardBody = createElement("div", "card-body");
  cardBody.appendChild(description);

  const buttonContainer = createElement("div", "button-container");
  const buttonFragment = new DocumentFragment();

  itemDetails.cardButtonDetails.forEach((element) => {
    const button = createButton(element.text, element.className);
    if (element.btnListener) {
      button.addEventListener("click", () => element.btnListener(itemDetails));
    }
    buttonFragment.appendChild(button);
  });

  buttonContainer.appendChild(buttonFragment);

  const cardFooter = createElement("div", "card-footer");
  cardFooter.appendChild(buttonContainer);

  appendGroup([image, cardHeading, cardBody, cardFooter], cardDetails);
  card.appendChild(cardDetails);
  fragment.appendChild(card);
  return fragment;
};

const createProductCard = (item, fragment) => {
  const cardItemDetails = {
    cardId: item.id,
    cardImageUrl: item.photo,
    cardImageOnErrorUrl: item.onError,
    cardTitle: item.name,
    cardPrice: item.price,
    cardDescription: item.description,
    cardButtonDetails: [
      {
        className: "btn btn-sm btn-muted btn-wishlist",
        text: APP_CONSTANTS.WISH_LIST.ADD_TO_WISHLIST,
        btnListener: () => Wishlist.add(item),
      },
      {
        className: "btn btn-sm btn-primary btn-cart",
        text: APP_CONSTANTS.MY_CART.ADD_TO_CART,
        btnListener: () => Cart.add(item),
      },
    ],
    cardGuarantee: item.guarantee,
  };
  productCard(cardItemDetails, fragment);
};

const productCard = (itemDetails, fragment) => {
  const card = createElement("div", "card");
  const image = createImage(
    itemDetails.cardImageUrl,
    itemDetails.cardImageOnErrorUrl
  );
  const title = createCardTitle(itemDetails.cardTitle);
  const price = createPrice(itemDetails.cardPrice);
  const description = createDescription(itemDetails.cardDescription);
  const gaunranteeInfo = createGauranteeText(itemDetails.cardGuarantee);
  const cardDetails = createElement("div", "card-details");
  const cardHeading = createElement("div", "card-heading");
  cardHeading.appendChild(title);
  cardHeading.appendChild(price);
  const cardBody = createElement("div", "card-body");
  cardBody.appendChild(description);
  cardBody.appendChild(gaunranteeInfo);

  const buttonContainer = createElement("div", "button-container");
  const buttonFragment = new DocumentFragment();

  itemDetails.cardButtonDetails.forEach((element) => {
    const button = createButton(element.text, element.className);
    if (element.btnListener) {
      button.addEventListener("click", () => element.btnListener(itemDetails));
    }
    buttonFragment.appendChild(button);
  });

  buttonContainer.appendChild(buttonFragment);

  const cardFooter = createElement("div", "card-footer");
  cardFooter.appendChild(buttonContainer);

  appendGroup([image, cardHeading, cardBody, cardFooter], cardDetails);
  card.appendChild(cardDetails);
  fragment.appendChild(card);
  return fragment;
};

const createCartCard = (item, fragment) => {
  const cardItemDetails = {
    cardId: item.id,
    cardImageUrl: item.photo,
    cardImageOnErrorUrl: item.onError,
    cardTitle: item.name,
    cardPrice: item.price,
    cardQuantity: item.quantity ? item.quantity : 1,
  };
  cartCard(cardItemDetails, fragment);
};

const createWishListCard  = (item, fragment) => {
  const cardItemDetails = {
    cardId: item.id,
    cardImageUrl: item.photo,
    cardImageOnErrorUrl: item.onError,
    cardTitle: item.name,
    cardPrice: item.price,
    cardQuantity: item.quantity ? item.quantity : 1,
  };
  wishListCard(cardItemDetails , fragment)
}

const cartWishlistCard = (itemDetails) => {
  const card = createElement("div", "card");
  const image = createImage(
    itemDetails.cardImageUrl,
    itemDetails.cardImageOnErrorUrl
  );
  const title = createCardTitle(itemDetails.cardTitle);
  const price = createPrice(itemDetails.cardPrice);
  const cardDetails = createElement("div", "card-details");
  const cardHeading = createElement("div", "card-heading");
  cardHeading.appendChild(title);
  cardHeading.appendChild(price);
  appendGroup([image, cardHeading], cardDetails);
  card.append(cardDetails)
  return card
};

const cartCard = (itemDetails, fragment) => {
 const card = cartWishlistCard(itemDetails , fragment);
 const cardDetails = card.querySelector(".card-details")
  const quantityCounterFragment = new DocumentFragment();
  const cartQuantityCounter = QuantityCounter.create(itemDetails , quantityCounterFragment)
  appendGroup([cartQuantityCounter], cardDetails);
  card.appendChild(cardDetails);
  fragment.appendChild(card);
  const parentSelector = document.querySelector(".cart-container");
  parentSelector.append(fragment);
 
};

const wishListCard = (itemDetails , fragment) => {
  const card = cartWishlistCard(itemDetails , fragment);
  console.log(card)
  const cardDetails = card.querySelector(".card-details")
  console.log(cardDetails)
  const addToCartBtn = createButton(
    APP_CONSTANTS.MY_CART.ADD_TO_CART,
    "btn btn-xs btn-primary btn-addToCart item-right-section"
  );
  appendGroup([addToCartBtn], cardDetails);
  card.appendChild(cardDetails);
  fragment.appendChild(card);
  const wishListContainer = document.querySelector(".wishlist-container");
  wishListContainer.appendChild(fragment);
};
const createImage = (src, onError) => {
  const imageVal = createElement("img", "card-image");
  imageVal.setAttribute("src", src);
  imageVal.setAttribute("onerror", onError);
  return imageVal;
};

const createCardTitle = (name) => {
  const titleVal = createElement("h2", "card-title");
  const textNode = createTextNode(name);
  titleVal.appendChild(textNode);
  return titleVal;
};

const createPrice = (price) => {
  const priceVal = createElement("p", "card-price");
  const priceText = convertToRupee(price);
  priceVal.textContent = priceText;
  return priceVal;
};

const createDescription = (description) => {
  const descriptionVal = createElement("p", "card-description");
  const textNode = createTextNode(description);
  descriptionVal.appendChild(textNode);
  return descriptionVal;
};

const createGauranteeText = (gauranteeYears) => {
  const createShield = createElement("p", "");
  const gauranteeText = createElement("p", "card-gauranteeText");
  const gaurantYearsNum = parseInt(gauranteeYears);
  const gauranteeVal =
    gaurantYearsNum +
    " " +
    (gaurantYearsNum > 1
      ? APP_CONSTANTS.YEARS_GAURANTEE.MULTIPLE
      : APP_CONSTANTS.YEARS_GAURANTEE.SINGLE);
  const textNode = createTextNode(gauranteeVal);
  gauranteeText.appendChild(textNode);
  return gauranteeText;
};
