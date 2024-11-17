import { createSlice } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../utils/toastNotification/toastNotification';

// Lấy state từ localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('markList');
    if (serializedState) {
      return JSON.parse(serializedState);
    }
    return { MarkArr: [] }; // Trạng thái mặc định nếu không có trong localStorage
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return { MarkArr: [] };
  }
};

// Lưu state vào localStorage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('markList', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const initialState = loadStateFromLocalStorage();

export const JobItem = createSlice({
  name: 'Jobs Mark',
  initialState: initialState, // Dùng trạng thái đã lưu từ localStorage
  reducers: {
    addToMarkList: (state, action) => {
      const jobItems = state.MarkArr.findIndex((j) => j.id === action.payload.id);

      if (jobItems === -1) {
        state.MarkArr.push({ ...action.payload, quantity: 1 });
        notifySuccess("Marked Job!!");
      } else {
        notifyError("Job already exists in your mark!!");
      }
      saveStateToLocalStorage(state); // Lưu lại state vào localStorage sau mỗi thay đổi
    },
    removeMarkList: (state, action) => {
      const removeItem = action.payload.id;
      const newMarkList = state.MarkArr.filter((job) => job.id !== removeItem);
      state.MarkArr = newMarkList;
      saveStateToLocalStorage(state); 
      notifySuccess("UnMark job list successfully!!");
    },
  },
});

export const { addToMarkList, removeMarkList } = JobItem.actions;

export default JobItem.reducer;
