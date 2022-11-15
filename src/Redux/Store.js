
import rootReducer from './Reducers/RootReducer';
// store state on local storage
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";


const persistConfig = {
  key: 'root',
  whiteList: ["counter"],
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(
//   reducers,
//   {},
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  
// );

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
  })

export const persist = persistStore(store);
