import styles from "./header.module.css";
import reactLogo from "../../assets/react.svg";
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
      <code className={`${styles.version} color-primary`}>v.1.0</code>
    </div>
  );
}
