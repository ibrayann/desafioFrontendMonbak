import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../redux/actions/actionsTasks";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const TaskForm = ({ setVisible, task }) => {
  const { id, name, priority } = task || {};
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState(name ? name : "");
  const [prioritySelect, setPrioritySelect] = useState(id ? priority : "Low");

  const handleVisible = () => {
    setVisible(false);
  };

  const handlePriorityChange = (selectedPriority) => {
    setPrioritySelect(selectedPriority);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) {
      toast.error("Task name is required");
      return;
    }

    if (id) {
      dispatch(updateTask({ id, name: taskName, priority: prioritySelect }));
    } else {
      dispatch(addTask({ name: taskName, priority: prioritySelect }));
    }
    setTaskName("");
    setPrioritySelect("Low");
    setVisible(false);
  };

  const priorities = ["High", "Medium", "Low", "Very Low"];

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="mb-3">
        <section className="d-flex justify-content-between align-items-center align-content-center mb-3">
          <h4 className="text-white" style={{ fontWeight: 600 }}>
            {id ? "Update" : "Create"} a new task
          </h4>
          <button
            type="button"
            className="btn btn-link ms-2 p-0"
            style={{
              zIndex: 100,
              color: "#A2A3B9",
            }}
            onClick={handleVisible}
          >
            <FaTimes />
          </button>
        </section>
        <input
          type="text"
          className="text-white border-0 bg-transparent border-bottom border-2 border-white mb-1"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task name"
          style={{ width: "100%", color: "white" }}
          autoComplete="off"
        />
      </div>
      <div className="my-3">
        <span className="text-white" style={{ fontWeight: 500 }}>
          Priority
        </span>
        <section className="d-flex justify-content-between gap-3 mt-2">
          {priorities.map((p) => (
            <span
              key={p}
              className={`border rounded-3 px-3 py-1 ${
                prioritySelect === p ? "bg-white" : ""
              }`}
              style={{
                color: prioritySelect === p ? "#2F58E2" : "white",
                borderColor: prioritySelect === p ? "#000" : "#fff",
                boxShadow: prioritySelect === p && "0 0 10px #fff",
              }}
              onClick={() => handlePriorityChange(p)}
            >
              {p}
            </span>
          ))}
        </section>
      </div>
      <section className="d-flex flex-column gap-3 mt-4 justify-content-center">
        <button
          type="submit"
          className="btn rounded-pill mx-auto mt-2"
          style={{
            color: "#2F58E2",
            borderColor: "#fff",
            boxShadow: "0 0 10px #fff",
            backgroundColor: "#fff",
          }}
        >
          + {id ? "Update" : "Create"} Task
        </button>
        <button
          type="button"
          className="underline text-white border-0 bg-transparent"
          onClick={() => setTaskName("")}
        >
          Limpiar
        </button>
      </section>
    </form>
  );
};

export default TaskForm;
