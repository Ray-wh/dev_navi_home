import Image from "next/image";
import SearchBox from "@/lib/components/SearchBox";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SearchBox />
      </main>
      <footer className={styles.footer}>
 
      </footer>
    </div>
  );
}
