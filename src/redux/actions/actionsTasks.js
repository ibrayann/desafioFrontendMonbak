import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: [
    {
      id: uuidv4(),
      name: "Task 1",
      priority: "High",
      completed: false,
    },
    {
      id: uuidv4(),
      name: "Task 2",
      priority: "Medium",
      completed: false,
    },
    {
      id: uuidv4(),
      name: "Task 3",
      priority: "Low",
      completed: false,
    },
  ],

  reducers: {
    addTask: (state, action) => {
      const newTask = { ...action.payload, id: uuidv4(), completed: false };
      state.push(newTask);
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updateTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.name = action.payload.name;
        task.priority = action.payload.priority;
      }
    },
  },
});

export const { addTask, deleteTask, toggleTask, updateTask, toggleModal } =
  tasksSlice.actions;

export default tasksSlice.reducer;
