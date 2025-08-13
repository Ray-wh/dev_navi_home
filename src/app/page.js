import React from "react";
import styles from "./page.module.scss";

export default function Home() {

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>我的应用</h1>
        
      </header>
      <main className={styles.main}>
        
      </main>
      <footer className={styles.footer}>
        <p>© 2025 我的应用</p>
      </footer>
    </div>
  );
}
