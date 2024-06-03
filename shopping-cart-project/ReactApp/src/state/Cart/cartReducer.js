import * as actionTypes from "../actionTypes";

const initialState = {
  cart: {
    userId: null,
    items: [],
  },
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USER_CART: {
      // Get userId and cart items from payload
      const { userId, items } = action.payload;

      return {
        ...state,
        cart: {
          userId,
          items,
        },
      };
    }
    case actionTypes.ADD_TO_CART: {
      // Get productId and quantity from payload
      let { productId, quantity } = action.payload;
      quantity = Number(quantity);

      // Check if product already exists in cart
      const existingProduct = state.cart.items.find(
        (item) => item.product === productId
      );

      if (existingProduct) {
        // Product is already in the cart, increase quantity
        const updatedCartItems = state.cart.items.map((item) =>
          item.product === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return {
          ...state,
          cart: {
            ...state.cart,
            items: updatedCartItems,
          },
        };
      } else {
        // Product is not in the cart, add new product
        return {
          ...state,
          cart: {
            ...state.cart,
            items: [...state.cart.items, { product: productId, quantity }],
          },
        };
      }
    }
    case actionTypes.UPDATE_CART_QUANTITY: {
      // Get productId and new quantity from payload
      const { productId, quantity } = action.payload;

      // Update the quantity of the product in the cart
      const updatedCartItems = state.cart.items.map((item) =>
        item.product === productId ? { ...item, quantity } : item
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedCartItems,
        },
      };
    }
    case actionTypes.REMOVE_FROM_CART: {
      // Get product id of product to remove from cart
      const { productId } = action.payload;

      // Filter out the product from the cart items array
      const updatedCartItems = state.cart.items.filter(
        (item) => item.product !== productId
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedCartItems,
        },
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
