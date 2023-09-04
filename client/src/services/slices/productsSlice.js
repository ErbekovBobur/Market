import { createSlice } from '@reduxjs/toolkit';
import { getItem, removeItem, setItem } from './funcs';

// const category = [
//   {
//     id: 1, categoryName: 'Электроника'
//   },
//   {
//     id: 2, categoryName: 'Бытовая техника'
//   },
//   {
//     id: 3, categoryName: 'Продукты питания'
//   },
//   {
//     id: 4, categoryName: 'Аксессуары'
//   },
//   {
//     id: 5, categoryName: 'Мебель'
//   },
//   {
//     id: 6, categoryName: 'Товары для дома'
//   },
//   {
//     id: 7, categoryName: 'Одежда'
//   },
// ]

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    basket: [],
    productList: [],
    favoriteList: [],
    temp: [],
    modal: false,
    foundList: [],
  },
  reducers: {
    toBasket: (state, { payload }) => {
      state.basket.push({ ...payload, count: 1, basketId: new Date().toISOString() })
      const obj = state.basket;
      for (const key in obj) {
        for (const prop in obj) {
          if (obj[key].product_id === obj[prop].product_id) {
            if (obj[key].basketId !== obj[prop].basketId) {
              state.basket.splice(prop, 1)
              obj[key].count++;
            }
          }
        }
      }
      setItem('basket', JSON.stringify(state.basket));
    },
    recoverBasketFromLocal: (state, { payload }) => {
      state.basket = payload;
    },
    increment: (state, { payload }) => {
      state.basket.filter((el) => {
        if (el.product_id === payload) {
          el.count++;
          setItem('basket', JSON.stringify(state.basket))
          return false;
        }
        return false;
      })
    },
    decrement: (state, { payload }) => {
      state.basket.filter((el) => {
        if (el.product_id === payload) {
          if (el.count) {
            el.count--;
            setItem('basket', JSON.stringify(state.basket))
          }
          else return false;
        }
        return false;
      })
    },
    emptyBasket: (state) => {
      state.basket.splice(0);
      removeItem('basket');
    },
    delProduct: (state, { payload }) => {
      state.basket.filter((el, index) => {
        if (el.product_id === payload) {
          state.basket.splice(index, 1);
          setItem('basket', JSON.stringify(state.basket))
          return false;
        } return false;
      })
    },
    toProductList: (state, { payload }) => {
      state.productList = payload;
    },
    toFavoriteList: (state, { payload }) => {
      state.productList.filter((item) => {
        if (item.product_id === payload.id) {
          state.favoriteList.push(item);
          if (payload.loggedIn) {
            setItem('favoriteList', JSON.stringify(state.favoriteList));
            return false;
          }
          return false;
        };
        return false;
      })
    },
    checkSaveFavoriteList: state => {
      if (getItem('favoriteList') && getItem('favoriteList').length) {
        state.favoriteList = getItem('favoriteList');
      }
    },
    delFromFavoriteList: (state, { payload }) => {
      state.favoriteList = state.favoriteList.filter((item) => item.product_id !== payload);
      setItem('favoriteList', JSON.stringify(state.favoriteList));
    },
    emptyFavoriteList: (state) => {
      state.favoriteList = [];
      removeItem('favoriteList');
    },
    setModal: (state, { payload }) => {
      state.modal = payload;
    },
    searchProduct: (state, { payload }) => {
      if (state.productList && state.productList.length)
        state.foundList = state.productList.filter((item) => {
          return item.name.toLowerCase().includes(payload.toLowerCase());
        });
    },
    viewByCategory: (state, { payload }) => {
      state.foundList = payload;
    },
  },
})

export const { viewByCategory, recoverBasketFromLocal, searchProduct, emptyFavoriteList, checkSaveFavoriteList, setModal, delFromFavoriteList, toFavoriteList, toProductList, delProduct, toBasket, increment, decrement, emptyBasket } = productSlice.actions

export default productSlice;