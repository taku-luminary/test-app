import { Outlet, Link } from 'react-router-dom';
import styles from "./App.module.css"; // 既存のスタイルを流用するなら

export default function Header() {
  return (
    <div>
      <header>
        <div className={styles.container}>
          <div className={styles.blog}>
            <Link to="/" className={styles.contact}>Blog</Link>
          </div>
          <Link to="contact" className={styles.contact}>お問い合わせ</Link>
        </div>
      </header>

      <main>
        {/* ← ここがページごとに入れ替わる */}
        <Outlet />
      </main>

      <footer />
    </div>
  );
}