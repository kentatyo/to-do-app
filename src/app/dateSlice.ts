import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DateState = { date: Date };
const today = new Date();
const initialState: DateState = { date: today };

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    decremented: (state) => ({
      ...state,
      date: new Date(state.date.setDate(state.date.getDate() - 1)),
    }),
    incremented: (state) => ({
      ...state,
      date: new Date(state.date.setDate(state.date.getDate() + 1)),
    }),
  },
});
