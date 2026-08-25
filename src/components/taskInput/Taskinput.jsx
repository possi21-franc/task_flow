import { useState, useRef, useEffect } from "react";
import styles from "./Taskinput.module.css";

export default function TaskInput({ addTask, isLoading = false }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus sur l'input au montage
  useEffect(() => {
    if (inputRef.current && !isLoading) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleInputChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      addTask(taskTitle.trim(), priority, dueDate || null);
      setTaskTitle("");
      setPriority("medium");
      setDueDate("");
      setIsExpanded(false);
      
      // Refocus après ajout
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setTaskTitle("");
      setIsExpanded(false);
      inputRef.current?.blur();
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Raccourci clavier: Ctrl+Shift+N pour nouvelle tâche
  useEffect(() => {
    const handleGlobalShortcut = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "N") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleGlobalShortcut);
    return () => window.removeEventListener("keydown", handleGlobalShortcut);
  }, []);

  const priorityOptions = [
    { value: "high", label: "Urgent", color: "#ef4444", icon: "🔴" },
    { value: "medium", label: "Moyenne", color: "#f59e0b", icon: "🟡" },
    { value: "low", label: "Basse", color: "#10b981", icon: "🟢" }
  ];

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className={`${styles.taskInputWrapper} ${isFocused ? styles.focused : ""}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>
              <i className="fa-solid fa-plus"></i>
            </span>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder="Ajouter une nouvelle tâche..."
              value={taskTitle}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              aria-label="Titre de la tâche"
            />
            {taskTitle && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => setTaskTitle("")}
                aria-label="Effacer le texte"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <button
            type="button"
            className={`${styles.expandBtn} ${isExpanded ? styles.expanded : ""}`}
            onClick={toggleExpand}
            aria-label="Options avancées"
          >
            <i className={`fa-solid fa-chevron-${isExpanded ? "up" : "down"}`}></i>
          </button>
        </div>

        {/* Options avancées */}
        <div className={`${styles.options} ${isExpanded ? styles.optionsVisible : ""}`}>
          <div className={styles.optionGroup}>
            <label className={styles.optionLabel}>
              <i className="fa-solid fa-flag"></i>
              Priorité
            </label>
            <div className={styles.priorityButtons}>
              {priorityOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.priorityBtn} ${
                    priority === opt.value ? styles.priorityActive : ""
                  }`}
                  style={{
                    borderColor: priority === opt.value ? opt.color : "transparent",
                    background: priority === opt.value ? `${opt.color}20` : "transparent"
                  }}
                  onClick={() => setPriority(opt.value)}
                >
                  <span className={styles.priorityDot} style={{ background: opt.color }}></span>
                  <span className={styles.priorityLabel}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.optionGroup}>
            <label className={styles.optionLabel}>
              <i className="fa-regular fa-calendar"></i>
              Échéance
            </label>
            <input
              type="date"
              className={styles.dateInput}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={getMinDate()}
            />
          </div>
        </div>

        {/* Bouton d'ajout */}
        <button
          type="submit"
          className={`${styles.submitBtn} ${taskTitle.trim() ? styles.submitActive : ""}`}
          disabled={!taskTitle.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <span className={styles.spinner}></span>
              Ajout...
            </>
          ) : (
            <>
              <i className="fa-solid fa-plus"></i>
              Ajouter
            </>
          )}
        </button>
      </form>
    </div>
  );
}