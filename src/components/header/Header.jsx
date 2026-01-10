import styles from "./header.module.css";
import reactLogo from "../../assets/react.svg";
import ThemeToggle from "../theme/ThemeToggle";

export default function Header() {
  return (
    <div className={styles.taskContainer}>
      <div className={styles.titleContainer}>
        <img src={reactLogo} alt="logo" className={styles.logo} />
        <div>
          <h1 className={styles.title}>TaskFlow</h1>
          <div className={styles.subtitle}>
            <code>Eliminez le chaos, suivez le flux.</code>
          </div>
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
}
