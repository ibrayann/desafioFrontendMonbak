import { expect, describe, it } from "vitest";
import tasksReducer from "../redux/actions/actionsTasks";

describe("tasks reducer", () => {
  it("deberia ser el initialState", () => {
    expect(tasksReducer(undefined, {})).toEqual([
      {
        id: expect.any(String),
        name: "Task 1",
        priority: "High",
        completed: false,
      },
      {
        id: expect.any(String),
        name: "Task 2",
        priority: "Medium",
        completed: false,
      },
      {
        id: expect.any(String),
        name: "Task 3",
        priority: "Low",
        completed: false,
      },
    ]);
  });
  it("deberia ser una task nueva", () => {
    const initialState = [
      {
        id: "1",
        name: "Task 1",
        priority: "High",
        completed: false,
      },
    ];
    const newTask = {
      name: "Task 2",
      priority: "Medium",
    };
    const action = { type: "tasks/addTask", payload: newTask };
    const newState = tasksReducer(initialState, action);

    expect(newState).toHaveLength(2);
    expect(newState[1]).toMatchObject({
      ...newTask,
      id: expect.any(String),
      completed: false,
    });
  });
  it("deberia eliminar una task", () => {
    const initialState = [
      {
        id: "1",
        name: "Task 1",
        priority: "High",
        completed: false,
      },
      {
        id: "2",
        name: "Task 2",
        priority: "Medium",
        completed: false,
      },
    ];
    const action = { type: "tasks/deleteTask", payload: "1" };
    const newState = tasksReducer(initialState, action);

    expect(newState).toHaveLength(1);
    expect(newState.some((task) => task.id === "1")).toBe(false);
  });
  it("deberia actualizar una task", () => {
    const initialState = [
      {
        id: "1",
        name: "Task 1",
        priority: "High",
        completed: false,
      },
      {
        id: "2",
        name: "Task 2",
        priority: "Medium",
        completed: false,
      },
    ];
    const updatedTask = {
      id: "2",
      name: "Updated Task",
      priority: "Low",
    };
    const action = { type: "tasks/updateTask", payload: updatedTask };
    const newState = tasksReducer(initialState, action);

    expect(newState).toHaveLength(2);
    expect(newState.find((task) => task.id === "2")).toMatchObject(updatedTask);
  });
  it("deberia cambiar el estado de la task", () => {
    const initialState = [
      {
        id: "1",
        name: "Task 1",
        priority: "High",
        completed: false,
      },
      {
        id: "2",
        name: "Task 2",
        priority: "Medium",
        completed: false,
      },
    ];
    const action = { type: "tasks/toggleTask", payload: "1" };
    const newState = tasksReducer(initialState, action);

    expect(newState).toHaveLength(2);
    expect(newState.find((task) => task.id === "1").completed).toBe(true);
    expect(newState.find((task) => task.id === "2").completed).toBe(false);

    const toggledAction = { type: "tasks/toggleTask", payload: "1" };
    const toggledState = tasksReducer(newState, toggledAction);

    expect(toggledState.find((task) => task.id === "1").completed).toBe(false);
  });
});
