import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "../App";
import { toggleModal } from "../../redux/actions/actionsTasks";
import { Button } from "react-bootstrap";
const TaskItem = ({ task, onDelete, onToggle, toggleModal }) => {
  const { id, name, completed, priority } = task;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const onHandleDelete = () => {
    if (confirmDelete) {
      onDelete(id);
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

  const toggleModalfunction = () => {
    return <Modal task={task} setCreateVisible={toggleModal} />;
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
          onChange={() => onToggle(id)}
        />
        <div
          className={`d-flex flex-column flex-grow-1 ms-3 ps-3 ${
            completed ? "completed-border" : "incomplete-border"
          }`}
          style={{ maxWidth: "calc(100% - 46px)" }}
          onClick={() => setConfirmDelete(false)}
        >
          {confirmDelete ? (
            <p className="mb-0" style={{ zIndex: 100 }}>
              ¿Estás seguro que quieres eliminar esta Task?
            </p>
          ) : (
            <>
              <label
                className={`${
                  completed ? "completed" : ""
                } fw-bold task-content`}
              >
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
              </label>
              <span style={{ color: "#A2A3B9" }}>{priority} Priority</span>
            </>
          )}
        </div>
        <Button onClick={toggleModalfunction} />

        <button
          type="button"
          className="btn btn-link ms-2 p-0"
          style={{ zIndex: 100, color: confirmDelete ? "#ff006f" : "#A2A3B9" }}
          onClick={onHandleDelete}
        >
          <FaTimes />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
