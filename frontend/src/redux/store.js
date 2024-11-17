import { configureStore } from "@reduxjs/toolkit";
import JobItem from "./slice/jobItem";

export const mark = configureStore({
  reducer: {
    markList: JobItem,
  },
});
