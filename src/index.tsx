import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { dateSlice } from "./app/dateSlice";
import { taskSlice } from "./app/taskSlice";

const rootReducer = combineReducers({
  date: dateSlice.reducer,
  task: taskSlice.reducer,
});

export const store = configureStore({ reducer: rootReducer });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

export type RootState = ReturnType<typeof rootReducer>;
