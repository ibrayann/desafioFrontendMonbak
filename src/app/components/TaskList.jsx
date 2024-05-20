import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../../redux/actions/actionsTasks";
import TaskItem from "./TaskItem";

const TaskList = ({ toggleModal }) => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [statusTask, setStatusTask] = useState(null);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggle = (taskId) => {
    dispatch(toggleTask(taskId));
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
      {tasks.length === 0 ? (
        <p>No hay tareas.</p>
      ) : (
        <ul className="list-group p-3">
          <section className="mb-4 d-flex justify-content-start gap-3">
            <span
              onClick={() => setStatusTask(null)}
              style={{ color: statusTask === null ? "black" : "grey" }}
            >
              All
            </span>
            <span
              onClick={() => setStatusTask(true)}
              style={{ color: statusTask === true ? "black" : "grey" }}
            >
              Completed
            </span>
            <span
              onClick={() => setStatusTask(false)}
              style={{ color: statusTask === false ? "black" : "grey" }}
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
                onDelete={handleDelete}
                onToggle={handleToggle}
                toggleModal={toggleModal}
              />
            ))}
          </section>
        </ul>
      )}
    </div>
  );
};

export default TaskList;
