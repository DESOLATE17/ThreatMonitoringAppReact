import filterReducer from './filterSlice';
import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from "./authSlice"
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    filter: filterReducer,
    user: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)