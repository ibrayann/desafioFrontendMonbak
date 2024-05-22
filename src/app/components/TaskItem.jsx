import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../../redux/actions/actionsTasks";

const TaskItem = ({ task, onTaskClick }) => {
  const { id, name, completed, priority } = task;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggle = (taskId) => {
    dispatch(toggleTask(taskId));
  };

  const onHandleDelete = () => {
    if (confirmDelete) {
      handleDelete(id);
      setConfirmDelete(false);
      showToast();
    } else {
      setConfirmDelete(true);
    }
  };

  const showToast = () => {
    toast.success("Task eliminada correctamente", {
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
    });
  };

  return (
    <li
      className={`list-group-item shadow-sm p-3 mb-3 rounded-4 position-relative`}
      style={{ backgroundColor: confirmDelete ? "#ff006f1a" : "#fff" }}
    >
      {confirmDelete && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-white bg-opacity-75 rounded-4"
          style={{ zIndex: 50 }}
        ></div>
      )}
      <div
        className={`d-flex justify-content-between align-items-center py-2 ${
          confirmDelete ? "position-relative" : ""
        }`}
      >
        <input
          className="form-check-input"
          type="checkbox"
          id={`taskCheckbox-${id}`}
          checked={completed ?? false}
          onChange={() => handleToggle(id)}
        />
        <div
          className={`d-flex flex-column flex-grow-1 ms-3 ps-3 ${
            completed ? "completed-border" : "incomplete-border"
          }`}
          style={{ maxWidth: "calc(100% - 46px)" }}
          onClick={() => {
            if (!confirmDelete) {
              onTaskClick(task);
            }
          }}
        >
          {confirmDelete ? (
            <p className="mb-0" style={{ zIndex: 100 }}>
              ¿Estás seguro que quieres eliminar esta Task?
            </p>
          ) : (
            <>
              <span
                className="d-block"
                style={{
                  wordWrap: "break-word",
                  textDecoration: completed ? "line-through" : "",
                  fontWeight: "500",
                  color: "#0a0d47",
                }}
              >
                {name}
              </span>

              <span style={{ color: "#A2A3B9" }}>{priority} Priority</span>
            </>
          )}
        </div>
        <button
          type="button"
          className="btn btn-link ms-2 p-0 d-flex align-items-center gap-1 justify-content-center"
          style={{
            zIndex: 100,
            textDecoration: "none",
            color: confirmDelete ? "#ff006f" : "#A2A3B9",
          }}
          onClick={onHandleDelete}
        >
          {confirmDelete && "Eliminar"}
          <FaTimes />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
