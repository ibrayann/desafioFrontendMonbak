// src/app/store.js
import tasksReducer from "../actions/actionsTasks";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
};

// Combinación de reducers
const rootReducer = combineReducers({
  tasks: tasksReducer,
});

// Reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración del store con middleware personalizado
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
