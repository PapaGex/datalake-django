import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer';


export const store = configureStore({
  reducer: rootReducer,
  // Redux-thunk for async operations
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

