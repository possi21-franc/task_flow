import { useState } from "react";
import styles from "./Taskinput.module.css";

export default function TaskInput({ addTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const handleInputChange = (e) => {
    // Gérer le changement de valeur de l'input ici
    setTaskTitle(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      addTask(taskTitle);
      setTaskTitle("");
    }
  };
  return (
    <div className={`box ${styles.element}`}>
      <h2 className={styles.title}>Ajoute ta prochaine tâche</h2>

      <form className={styles.form} onSubmit={handleAddTask}>
        <input
          type="text"
          className={styles.input}
          placeholder="Indiquer un titre de tâche explicite."
          onChange={handleInputChange}
          value={taskTitle}
        />
        <button className="button-primary" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
}
