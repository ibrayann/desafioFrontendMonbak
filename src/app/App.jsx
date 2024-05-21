import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";

const App = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setToggleModal(true);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center w-100 vh-100"
      style={{ backgroundColor: "#D7DBE6" }}
    >
      <section
        style={{
          width: 450,
          height: 700,
          backgroundColor: "#E8EBF3",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        className="rounded-5 shadow-sm"
      >
        <section className="p-4">
          <div>
            <Toaster />
          </div>
          <Header />
          <TaskList onTaskClick={handleTaskClick} />
        </section>
        {toggleModal && (
          <Modal setCreateVisible={setToggleModal} task={selectedTask} />
        )}
        <button
          type="button"
          className="btn rounded-4 box-shadow mb-5 px-4 py-3 mx-auto"
          style={{
            backgroundColor: "#2F58E2",
            color: "#fff",
            boxShadow: "0 0 10px #2F58E2",
          }}
          onClick={() => {
            setSelectedTask(null);
            setToggleModal(!toggleModal);
          }}
        >
          + Create Task
        </button>
      </section>
    </div>
  );
};

export default App;
