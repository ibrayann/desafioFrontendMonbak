import TaskForm from "./TaskForm";

const Modal = ({ task, setCreateVisible }) => {
  return (
    <div
      className="rounded-5"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 200,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(1px)",
        WebkitBackdropFilter: "blur(1px)",
      }}
    >
      <div
        className="rounded-5 p-3 "
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "50%",
          backgroundColor: "#2F58E2",
          zIndex: 500,
        }}
      >
        <TaskForm task={task} setVisible={setCreateVisible} />
      </div>
    </div>
  );
};

export default Modal;
