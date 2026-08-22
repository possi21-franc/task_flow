import { useState, useEffect, useCallback, useMemo } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import TaskInput from "./taskInput/Taskinput";
import TaskList from "./taskList/TaskList";
import Stats from "./stats/Stats";
import Filters from "./filters/Filters";
import "./TaskContainer.css";

export default function TaskContainer() {
  // ===== ÉTAT =====
  const [tasksList, setTasksList] = useState(() => {
    try {
      const stored = localStorage.getItem("tasks");
      const parsed = stored ? JSON.parse(stored) : [];
      return parsed.sort((a, b) => b.id - a.id);
    } catch (e) {
      return [];
    }
  });
  
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest"); // "newest" | "oldest" | "title"

  // ===== EFFET DE CHARGEMENT =====
  useEffect(() => {
    // Simuler un chargement pour l'effet visuel
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // ===== SAUVEGARDE =====
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasksList));
    } catch (e) {
      // ignore
    }
  }, [tasksList]);

  // ===== GESTION DES TÂCHES =====
  const addTask = useCallback((title, priority = "medium", dueDate = null) => {
    if (!title.trim()) return;
    
    const nextId = tasksList.length
      ? Math.max(...tasksList.map((t) => t.id)) + 1
      : 1;
    
    const newTask = {
      id: nextId,
      title: title.trim(),
      completed: false,
      priority: priority, // "high" | "medium" | "low"
      dueDate: dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTasksList((prev) => {
      const next = [newTask, ...prev];
      next.sort((a, b) => b.id - a.id);
      return next;
    });
    
    setRecentlyAddedId(newTask.id);
    setTimeout(() => setRecentlyAddedId(null), 800);
  }, [tasksList]);

  const editTask = useCallback((id, updates) => {
    setTasksList((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasksList((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleComplete = useCallback((id) => {
    setTasksList((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTasksList((prev) => prev.filter((task) => !task.completed));
  }, []);

  // ===== TÂCHES FILTRÉES =====
  const filteredTasks = useMemo(() => {
    let result = [...tasksList];
    
    // Filtre par statut
    if (filter === "active") {
      result = result.filter((task) => !task.completed);
    } else if (filter === "completed") {
      result = result.filter((task) => task.completed);
    }
    
    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((task) =>
        task.title.toLowerCase().includes(query)
      );
    }
    
    // Tri
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        result.sort((a, b) => a.id - b.id);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    
    return result;
  }, [tasksList, filter, searchQuery, sortBy]);

  // ===== STATISTIQUES =====
  const stats = useMemo(() => {
    const total = tasksList.length;
    const completed = tasksList.filter((t) => t.completed).length;
    const active = total - completed;
    const urgent = tasksList.filter(
      (t) => !t.completed && t.priority === "high"
    ).length;
    
    return {
      total,
      completed,
      active,
      urgent,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [tasksList]);

  // ===== RENDU =====
  return (
    <div className="task-container-modern">
      {/* Header avec recherche et thème */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalTasks={stats.total}
      />
      
      {/* Statistiques */}
      <Stats stats={stats} />
      
      {/* Filtres et actions */}
      <Filters
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        clearCompleted={clearCompleted}
        hasCompleted={stats.completed > 0}
      />
      
      {/* Input d'ajout */}
      <TaskInput addTask={addTask} isLoading={isLoading} />
      
      {/* Liste des tâches */}
      <TaskList
        tasksList={filteredTasks}
        toggleComplete={toggleComplete}
        editTask={editTask}
        deleteTask={deleteTask}
        recentlyAddedId={recentlyAddedId}
        isLoading={isLoading}
        filter={filter}
      />
      
      {/* Footer */}
      <Footer
        completedTasks={stats.completed}
        totalTasks={stats.total}
        clearCompleted={clearCompleted}
        hasCompleted={stats.completed > 0}
      />
    </div>
  );
}