export const APP_CONSTANTS = {
    CATEGORIES:{
      HERO_TEXT : "Your Home, With Love", 
      SUB_TEXT : "Come Choose from millions of products"
    },
    FETCH_URL: {
      CATEGORIES : "https://jsonmockserver.vercel.app/api/shopping/furniture/categories",
      PRODUCT:"https://jsonmockserver.vercel.app/api/shopping/furniture/products?category="
    },
    ON_ERROR_URL:"this.onerror=null;this.src='https://placehold.jp/200x200.png';",
    CHECKOUT:{
        MENU_NAV : [
          {
          NAME: "MY CART",
          ATTR : "cartContainer"
         },
         {
          NAME: "WISHLIST",
          ATTR : "wishlistContainer"
         }
      ],
        TOTAL:"TOTAL AMOUNT",
        PLACE_ORDER:"PLACE ORDER",
    },
    ORDER_CONFIRMATION:{
        QUANTITY:"Quantity"
    },
    ADD_TO_WISHLIST:"ADD TO WISHLIST",
    ADD_TO_CART : "ADD TO CART",
    YEARS_GAURANTEE:{
        MULTIPLE : "YEARS GAURANTEE",
        SINGLE : "YEAR GAURANTEE"
    },
    SHOP_NOW:"SHOP NOW",
    COPYRIGHTS:"COPYRIGHTS 2020",
    STORAGE_KEYS:{
      MY_CART:"myCart",
      WISH_LIST:"wishList",
      TOTAL_PRICE : "totalPrice",

    },
    TOASTER:{
      TIME_INTERVAL : 2500,
      SUCCESS:"Success",
      ERROR:"Error",
    },
   CLASS_NAMES:{
    CART_CONTAINER:"cartContainer",
    WISH_LIST : "wishlistContainer"
   }
  };
  