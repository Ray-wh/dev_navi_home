import { Space } from "antd";
import SearchBox from "@/lib/components/SearchBox";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SearchBox />
      </main>
      <footer className={styles.footer}>
        <Space direction="vertical" size={16}>
          <p>&copy; {new Date().getFullYear()} Navi. All rights reserved.</p>
          <p>
            联系我们：<a href="mailto:contact@navi.com">contact@navi.com</a>
          </p>
        </Space>
      </footer>
    </div>
  );
}
