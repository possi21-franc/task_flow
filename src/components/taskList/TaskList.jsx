import { useState, useMemo } from "react";
import Styles from "./TaskList.module.css";
import TaskItem from "../taskItem/TaskItem";

export default function TaskList({
  tasksList,
  toggleComplete,
  editTask,
  deleteTask,
  incompleteTasks,
  recentlyAddedId,
  filter = "all",
  isLoading = false
}) {
  const [viewMode, setViewMode] = useState("list"); // "list" | "grid"

  // Calcul des statistiques
  const stats = useMemo(() => {
    const total = tasksList.length;
    const completed = tasksList.filter(t => t.completed).length;
    const active = total - completed;
    const urgent = tasksList.filter(t => !t.completed && t.priority === "high").length;
    return { total, completed, active, urgent };
  }, [tasksList]);

  // Message dynamique
  const getMessage = () => {
    if (isLoading) return "⏳ Chargement des tâches...";
    if (tasksList.length === 0) return "👋 Aucune tâche pour le moment";
    if (incompleteTasks === 0) return "🥳 Bravo ! Toutes vos tâches sont terminées !";
    if (incompleteTasks === 1) return "📝 Il vous reste 1 tâche à faire";
    return `📝 Il vous reste ${incompleteTasks} tâches à faire`;
  };

  // Rendu des tâches
  const taskItems = tasksList.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      toggleComplete={toggleComplete}
      editTask={editTask}
      deleteTask={deleteTask}
      recentlyAddedId={recentlyAddedId}
    />
  ));

  // État vide
  if (tasksList.length === 0 && !isLoading) {
    return (
      <div className={Styles.emptyContainer}>
        <div className={Styles.emptyIcon}>📋</div>
        <h3 className={Styles.emptyTitle}>Aucune tâche</h3>
        <p className={Styles.emptyDescription}>
          Commencez par ajouter une nouvelle tâche ci-dessus.
        </p>
        <div className={Styles.emptyHint}>
          <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd>
          <span>pour ajouter rapidement</span>
        </div>
      </div>
    );
  }

  return (
    <div className={Styles.taskListWrapper}>
      {/* En-tête avec statistiques */}
      <div className={Styles.header}>
        <div className={Styles.headerLeft}>
          <h2 className={Styles.title}>{getMessage()}</h2>
          <span className={Styles.taskCount}>
            {tasksList.length} tâche{tasksList.length > 1 ? "s" : ""}
            {filter !== "all" && (
              <span className={Styles.filterBadge}>
                {filter === "active" ? "• En cours" : "• Terminées"}
              </span>
            )}
          </span>
        </div>

        <div className={Styles.headerRight}>
          {/* Vue grille/liste */}
          <div className={Styles.viewToggle}>
            <button
              className={`${Styles.viewBtn} ${viewMode === "list" ? Styles.viewActive : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="Vue liste"
            >
              <i className="fa-solid fa-list"></i>
            </button>
            <button
              className={`${Styles.viewBtn} ${viewMode === "grid" ? Styles.viewActive : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Vue grille"
            >
              <i className="fa-solid fa-grip"></i>
            </button>
          </div>

          {/* Statistiques rapides */}
          <div className={Styles.stats}>
            <span className={Styles.statItem}>
              <span className={Styles.statDot} style={{ background: "#06b6d4" }}></span>
              {stats.active} en cours
            </span>
            <span className={Styles.statItem}>
              <span className={Styles.statDot} style={{ background: "#10b981" }}></span>
              {stats.completed} terminées
            </span>
            {stats.urgent > 0 && (
              <span className={`${Styles.statItem} ${Styles.statUrgent}`}>
                <span className={Styles.statDot} style={{ background: "#ef4444" }}></span>
                {stats.urgent} urgentes
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Liste des tâches */}
      <div className={Styles.listContainer}>
        {isLoading ? (
          <div className={Styles.skeletonContainer}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={Styles.skeletonItem}>
                <div className={Styles.skeletonCheckbox}></div>
                <div className={Styles.skeletonContent}>
                  <div className={Styles.skeletonTitle}></div>
                  <div className={Styles.skeletonMeta}></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className={`${Styles.taskList} ${viewMode === "grid" ? Styles.gridView : ""}`}>
            {taskItems}
          </ul>
        )}

        {/* Indicateur de fin */}
        {tasksList.length > 0 && !isLoading && (
          <div className={Styles.endIndicator}>
            <span className={Styles.endLine}></span>
            <span className={Styles.endText}>
              {incompleteTasks === 0 ? "🎉 Toutes terminées !" : "Fin de la liste"}
            </span>
            <span className={Styles.endLine}></span>
          </div>
        )}
      </div>
    </div>
  );
}