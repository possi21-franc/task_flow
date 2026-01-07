import { useState, useEffect } from "react";
import Footer from "./footer/Footer";
import Header from "./header/header";
import TaskInput from "./taskInput/Taskinput";
import TaskList from "./taskList/TaskList";

export default function TaskContainer() {
  const [tasksList, setTasksList] = useState(() => {
    try {
      const stored = localStorage.getItem("tasks");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  // fonction pour ajouter une tâche
  const addTask = (title) => {
    const newTask = {
      id: tasksList.length ? tasksList[tasksList.length - 1].id + 1 : 1,
      title: title,
      completed: false,
    };
    setTasksList([...tasksList, newTask]);
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
        />
        <Footer completedTasks={completedTasks} />
      </div>
    </main>
  );
}
