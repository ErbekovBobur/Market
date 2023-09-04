import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from './slices/productsSlice';
import { authSlice } from './slices/auth';
import { productApi } from './api/productApi';
import { weatherApi } from './api/weatherApi';
import { userApi } from './api/userApi';


export const store = configureStore({
  reducer: {
    [productSlice.name]: productSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      userApi.middleware,
      weatherApi.middleware
    ]),
});