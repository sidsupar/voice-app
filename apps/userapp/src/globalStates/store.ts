import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userDataSlice";
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { blogReducer } from "./blogsSlice";

const persistConfig = {
    key: 'user',
    storage,
}

const rootReducer = combineReducers({
    userDetails:userReducer,
    blogs:blogReducer
})
 
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck:false
        }),
    }
)
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch