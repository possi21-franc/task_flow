import React, { useState } from "react";
import styles from "./header.module.css";
import reactLogo from "../../assets/react.svg";
import ThemeToggle from "../theme/ThemeToggle";

export default function Header({ 
  searchQuery = "", 
  setSearchQuery = () => {}, 
  totalTasks = 0 
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo et titre */}
        <div className={styles.brand}>
          <img src={reactLogo} alt="TaskFlow" className={styles.logo} />
          <div className={styles.brandInfo}>
            <h1 className={styles.title}>
              Task<span className={styles.titleAccent}>Flow</span>
            </h1>
            <p className={styles.subtitle}>
              <code>Eliminez le chaos, suivez le flux.</code>
            </p>
          </div>
        </div>

        {/* Actions : Recherche + Thème */}
        <div className={styles.actions}>
          {/* Barre de recherche */}
          <div className={`${styles.searchWrapper} ${isSearchOpen ? styles.searchOpen : ""}`}>
            <button 
              className={styles.searchToggle}
              onClick={toggleSearch}
              aria-label="Rechercher"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="text"
              placeholder="Rechercher une tâche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              autoFocus={isSearchOpen}
            />
            {searchQuery && (
              <button 
                className={styles.searchClear}
                onClick={() => setSearchQuery("")}
                aria-label="Effacer la recherche"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          {/* Compteur de tâches */}
          <div className={styles.taskCounter}>
            <span className={styles.counterNumber}>{totalTasks}</span>
            <span className={styles.counterLabel}>tâches</span>
          </div>

          {/* Thème */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}