import { useState, useEffect } from "react";
import styles from "./Footer.module.css";

export default function Footer({ 
  completedTasks = 0, 
  totalTasks = 0, 
  clearCompleted = null,
  hasCompleted = false 
}) {
  const [currentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  // Animation d'entrée
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Calcul du pourcentage de complétion
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  // Message motivant selon le taux de complétion
  const getMotivationalMessage = () => {
    if (totalTasks === 0) return "Commencez votre première tâche ! 🚀";
    if (completionRate === 100) return "🎉 Exceptionnel ! Toutes vos tâches sont terminées !";
    if (completionRate >= 75) return "🔥 Impressionnant ! Vous êtes sur la bonne voie !";
    if (completionRate >= 50) return "💪 Continuez comme ça, vous y êtes presque !";
    if (completionRate >= 25) return "🌟 Bon début ! Gardez le rythme !";
    return "📝 Chaque tâche accomplie vous rapproche de vos objectifs !";
  };

  return (
    <footer className={`${styles.footer} ${isVisible ? styles.visible : ""}`}>
      <div className={styles.footerContent}>
        {/* Partie gauche - Statistiques */}
        <div className={styles.footerLeft}>
          <div className={styles.stats}>
            <span className={styles.statItem}>
              <span className={styles.statIcon}>✅</span>
              <span className={styles.statValue}>{completedTasks}</span>
              <span className={styles.statLabel}>terminées</span>
            </span>
            <span className={styles.statDivider}>•</span>
            <span className={styles.statItem}>
              <span className={styles.statIcon}>📋</span>
              <span className={styles.statValue}>{totalTasks}</span>
              <span className={styles.statLabel}>total</span>
            </span>
            <span className={styles.statDivider}>•</span>
            <span className={styles.statItem}>
              <span className={styles.statIcon}>📊</span>
              <span className={styles.statValue}>{completionRate}%</span>
              <span className={styles.statLabel}>complétées</span>
            </span>
          </div>
        </div>

        {/* Partie centrale - Message motivant */}
        <div className={styles.footerCenter}>
          <p className={styles.message}>
            {totalTasks > 0 ? (
              <>
                <span className={styles.messageIcon}></span>
                {getMotivationalMessage()}
              </>
            ) : (
              <>
                <span className={styles.messageIcon}>👋</span>
                Commencez votre première tâche !
              </>
            )}
          </p>
        </div>

        {/* Partie droite - Actions */}
        <div className={styles.footerRight}>
          {hasCompleted && clearCompleted && (
            <button
              className={styles.clearBtn}
              onClick={clearCompleted}
              aria-label="Supprimer les tâches terminées"
            >
              <i className="fa-regular fa-trash-can"></i>
              <span>Nettoyer</span>
            </button>
          )}
          <span className={styles.copyright}>
            © {currentYear} TaskFlow
          </span>
        </div>
      </div>

      {/* Barre de progression */}
      {totalTasks > 0 && (
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ 
              width: `${completionRate}%`,
              background: completionRate === 100 
                ? 'linear-gradient(90deg, #10b981, #34d399)'
                : completionRate >= 50
                ? 'linear-gradient(90deg, #06b6d4, #22d3ee)'
                : 'linear-gradient(90deg, #f59e0b, #fbbf24)'
            }}
          >
            <span className={styles.progressLabel}>{completionRate}%</span>
          </div>
        </div>
      )}

      {/* Version et crédits */}
      <div className={styles.footerBottom}>
        <span className={styles.version}>
          <span className={styles.versionBadge}>v2.0</span>
        </span>
        <span className={styles.credits}>
          Construit avec <i className="fa-solid fa-heart" style={{ color: '#ef4444' }}></i> par 
          <span className={styles.author}> LoicDev</span>
        </span>
        <span className={styles.madeWith}>
          <i className="fa-brands fa-react" style={{ color: '#61dafb' }}></i>
          React
        </span>
      </div>
    </footer>
  );
}