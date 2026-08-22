import { useState } from "react";
import styles from "./TaskItem.module.css";

export default function TaskItem({
  task,
  toggleComplete,
  deleteTask,
  editTask,
  recentlyAddedId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const [isHovered, setIsHovered] = useState(false);

  const isNew = recentlyAddedId === task.id;

  // Gestion de la priorité
  const priorityConfig = {
    high: { label: "Urgent", color: "#ef4444", bg: "rgba(239, 68, 68, 0.12)" },
    medium: { label: "Moyenne", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.12)" },
    low: { label: "Basse", color: "#10b981", bg: "rgba(16, 185, 129, 0.12)" }
  };

  const priority = task.priority || "medium";
  const priorityInfo = priorityConfig[priority];

  // Formatage de la date
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Aujourd'hui";
    if (date.toDateString() === tomorrow.toDateString()) return "Demain";
    
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined
    });
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today && !task.completed;
  };

  const handleEditSubmit = () => {
    if (editValue.trim() && editValue.trim() !== task.title) {
      editTask(task.id, { title: editValue.trim() });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditSubmit();
    } else if (e.key === "Escape") {
      setEditValue(task.title);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={`
        ${styles.container} 
        ${task.completed ? styles.completed : styles.active}
        ${isNew ? styles.enter : ""}
        ${isHovered ? styles.hovered : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.content}>
        {/* Checkbox */}
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={task.completed}
            onChange={(e) => {
              e.stopPropagation();
              toggleComplete(task.id);
            }}
            aria-label={`Marquer la tâche "${task.title}" comme ${task.completed ? "non" : ""} complétée`}
          />
          <span className={styles.checkmark}></span>
        </div>

        {/* Informations */}
        <div className={styles.info}>
          {/* Titre (éditable) */}
          {isEditing ? (
            <input
              type="text"
              className={styles.editInput}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleEditSubmit}
              onKeyDown={handleKeyDown}
              autoFocus
              aria-label="Modifier le titre de la tâche"
            />
          ) : (
            <span
              className={`
                ${styles.title} 
                ${task.completed ? styles.titleCompleted : ""}
              `}
              onDoubleClick={() => !task.completed && setIsEditing(true)}
            >
              {task.title}
            </span>
          )}

          {/* Métadonnées */}
          <div className={styles.metadata}>
            {/* Priorité */}
            <span
              className={styles.priorityBadge}
              style={{
                background: priorityInfo.bg,
                color: priorityInfo.color
              }}
            >
              <span className={styles.priorityDot} style={{ background: priorityInfo.color }}></span>
              {priorityInfo.label}
            </span>

            {/* Date d'échéance */}
            {task.dueDate && (
              <span
                className={`
                  ${styles.dueDate}
                  ${isOverdue(task.dueDate) ? styles.overdue : ""}
                `}
              >
                <i className="fa-regular fa-calendar"></i>
                {formatDate(task.dueDate)}
                {isOverdue(task.dueDate) && (
                  <span className={styles.overdueBadge}>⚠️ En retard</span>
                )}
              </span>
            )}

            {/* Date de création */}
            <span className={styles.createdAt}>
              <i className="fa-regular fa-clock"></i>
              {new Date(task.createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short"
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={`${styles.actions} ${isHovered ? styles.actionsVisible : ""}`}>
        {!task.completed && (
          <button
            className={styles.actionBtn}
            onClick={() => setIsEditing(true)}
            aria-label="Modifier la tâche"
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        )}
        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={() => deleteTask(task.id)}
          aria-label={`Supprimer la tâche "${task.title}"`}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </li>
  );
}