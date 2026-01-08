import { useState, useEffect } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import TaskInput from "./taskInput/Taskinput";
import TaskList from "./taskList/TaskList";

export default function TaskContainer() {
  const [tasksList, setTasksList] = useState(() => {
    try {
      const stored = localStorage.getItem("tasks");
      const parsed = stored ? JSON.parse(stored) : [];
      // ensure tasks are ordered by id desc (newest first)
      return parsed.sort((a, b) => b.id - a.id);
    } catch (e) {
      return [];
    }
  });
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);

  // fonction pour ajouter une tâche
  const addTask = (title) => {
    // compute next id safely (use current max id)
    const nextId = tasksList.length
      ? Math.max(...tasksList.map((t) => t.id)) + 1
      : 1;
    const newTask = { id: nextId, title: title, completed: false };
    setTasksList((prev) => {
      const next = [newTask, ...prev];
      // keep sorted by id desc
      next.sort((a, b) => b.id - a.id);
      return next;
    });
    setRecentlyAddedId(newTask.id);
    // clear the recent id after the animation duration
    setTimeout(() => setRecentlyAddedId(null), 800);
  };

  // sauvegarder dans localStorage quand la liste change
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasksList));
    } catch (e) {
      // ignore write errors (e.g., quota)
    }
  }, [tasksList]);

  const editTask = (id, completedValue) => {
    setTasksList(
      tasksList.map((task) =>
        task.id === id ? { ...task, completed: completedValue } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasksList(tasksList.filter((task) => task.id !== id));
  };

  const getTaskCounts = () => {
    const completedTasks = tasksList.filter((task) => task.completed).length;
    const incompleteTasks = tasksList.length - completedTasks;
    return { completedTasks, incompleteTasks };
  };

  const { completedTasks, incompleteTasks } = getTaskCounts();
  console.log(completedTasks, incompleteTasks);
  return (
    <main>
      <div className="task-container">
        <Header />
        <TaskInput addTask={addTask} />
        <TaskList
          tasksList={tasksList}
          editTask={editTask}
          deleteTask={deleteTask}
          incompleteTasks={incompleteTasks}
          recentlyAddedId={recentlyAddedId}
        />
        <Footer completedTasks={completedTasks} />
      </div>
    </main>
  );
}
