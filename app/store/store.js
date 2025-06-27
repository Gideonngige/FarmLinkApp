import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import productsReducer from './productsSlice';

const store = configureStore({
    reducer: {
        items: itemsReducer,
        products: productsReducer,
    },
});

export default store;
