import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: {
      prepare(id, ingredients, name, quantity, unitPrice) {
        return {
          payload: {
            id,
            name,
            quantity,
            unitPrice,
            ingredients,
            totalPrice: quantity * unitPrice,
          },
        };
      },
      reducer(state, action) {
        const { id, quantity } = action.payload;

        const item = state.cart.find(
          (item) => item.id === id,
        );

        if (item) {
          item.quantity += quantity;
          item.totalPrice = item.unitPrice * item.quantity;
        }

        if (!item) state.cart.push(action.payload);
      },
    },

    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload,
      );
    },

    increaseItemQuantity(state, action) {
      const item = state.cart.find(
        (item) => item.id === action.payload,
      );

      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    decreaseItemQuantity(state, action) {
      const item = state.cart.find(
        (item) => item.id === action.payload,
      );

      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQuantity = function (store) {
  return store.cart.cart.reduce(
    (qte, item) => qte + item.quantity,
    0,
  );
};

export const getTotalCartPrice = function (store) {
  return store.cart.cart.reduce(
    (total, item) => total + item.totalPrice,
    0,
  );
};

export const getCart = function (store) {
  return store.cart.cart;
};

export const getCartItemQuantityById = function (
  state,
  id,
) {
  return state.cart.cart.find((item) => item.id === id)
    ?.quantity;
};

export const checkIsCardEmpty = function (store) {
  return store.cart.cart.length <= 0;
};
