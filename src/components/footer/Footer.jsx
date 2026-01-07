import styles from "./Footer.module.css";
export default function Footer({ completedTasks }) {
  if (completedTasks) {
    return (
      <footer className={styles.footer}>
        <code>
          Avec TaskFlow, tu as accompli {completedTasks} tâche
          {completedTasks > 1 ? "s" : ""} !
        </code>
      </footer>
    );
  }

  return (
    <div className={styles.footer2}>
      &copy; 2026 - TaskFlow build by LoicDev
    </div>
  );
}
