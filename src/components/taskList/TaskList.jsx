import Styles from "./TaskList.module.css";
import TaskItem from "../taskItem/TaskItem";
export default function TaskList({
  tasksList,
  editTask,
  deleteTask,
  incompleteTasks,
}) {
  const taskList = tasksList.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      editTask={editTask}
      deleteTask={deleteTask}
    />
  ));

  if (tasksList && tasksList.length > 0) {
    return (
      <div className={"box " + (tasksList.length > 5 ? "box--scroll" : "")}>
        <h2 className={Styles.title}>
          {incompleteTasks > 0 && (
            <>
              📝 Il te reste{" "}
              <span className="important">{incompleteTasks}</span> tâche
              {incompleteTasks > 1 ? "s" : ""} à faire !
            </>
          )}
          {incompleteTasks === 0 && (
            <h2> 🥳 Bravo ! Tu as tout fini tes tâches !</h2>
          )}
        </h2>
        {tasksList && tasksList.length > 0 && (
          <ul className={Styles.container}>{taskList}</ul>
        )}
      </div>
    );
  }
  return (
    <div className="box">
      <h2 className={Styles.emptyState}>
        👋 Salut, Tu n'as pas encore de tâches. Ajoute-en une pour commencer !
      </h2>
    </div>
  );
}
