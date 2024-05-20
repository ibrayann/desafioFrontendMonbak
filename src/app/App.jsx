import "bootstrap/dist/css/bootstrap.min.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Header from "./components/Header";

export const Modal = ({ setCreateVisible, task }) => {
  return (
    <div
      className="rounded-5 p-3"
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "45%",
        backgroundColor: "#2F58E2",
        zIndex: 500,
      }}
    >
      {task ? (
        <TaskForm task={task} setCreateVisible={setCreateVisible} />
      ) : (
        <TaskForm setVisible={setCreateVisible} />
      )}
    </div>
  );
};

function App() {
  const [toggleModal, setToggleModal] = useState(false);
  console.log("createVisible", toggleModal);
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100 vh-100"
      style={{
        backgroundColor: "#D7DBE6",
      }}
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
          <TaskList toggleModal={setToggleModal} />
        </section>
        {toggleModal && <Modal setCreateVisible={setToggleModal} />}
        <button
          type="submit"
          className="btn rounded-4 box-shadow mb-5 px-4 py-3 mx-auto"
          style={{
            backgroundColor: "#2F58E2",
            color: "#fff",
            boxShadow: "0 0 10px #2F58E2",
          }}
          onClick={() => setToggleModal(!toggleModal)}
        >
          + Create Task
        </button>
      </section>
    </div>
  );
}

export default App;
