import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import Undraw from "../../../public/undraw_no_data_re_kwbl.svg";
import Modal from "./Modal";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const [statusTask, setStatusTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const priorityMap = {
    VeryLow: 4,
    Low: 3,
    Medium: 2,
    High: 1,
  };

  const filteredTasks =
    statusTask === null
      ? tasks
      : tasks.filter((t) => t.completed === statusTask);

  const sortedTasks = [...filteredTasks].sort(
    (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
  );

  return (
    <div>
      <div>
        {tasks.length === 0 ? (
          <div className="d-flex flex-column mt-5 justify-content-center align-items-center">
            <img
              src={Undraw}
              className="mt-5"
              alt="undraw"
              width={200}
              height={200}
            />
            <h4 className="text-center mt-3">No tasks available</h4>
          </div>
        ) : (
          <ul className="list-group p-3">
            <section className="mb-4 d-flex justify-content-start gap-3">
              <span
                onClick={() => setStatusTask(null)}
                style={{ color: statusTask === null ? "" : "grey" }}
              >
                All
              </span>
              <span
                onClick={() => setStatusTask(true)}
                style={{ color: statusTask === true ? "" : "grey" }}
              >
                Completed
              </span>
              <span
                onClick={() => setStatusTask(false)}
                style={{ color: statusTask === false ? "" : "grey" }}
              >
                Uncomplete
              </span>
            </section>
            <section
              className="task-list"
              style={{
                maxHeight: "410px",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {sortedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onTaskClick={handleTaskClick}
                />
              ))}
            </section>
          </ul>
        )}
      </div>
      {showModal && (
        <Modal task={selectedTask} setCreateVisible={handleModalClose} />
      )}
    </div>
  );
};

export default TaskList;
