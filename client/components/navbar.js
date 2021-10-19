import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function NavBar() {

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <Link href="/">
          <a className={styles.logoLink}>
            <div className={styles.circle} />
            <h1 className={styles.logo}>Productivity App</h1>
          </a>
        </Link>
      </div>
      <div className={styles.middle}>
        <Link href="/blog">
          <a className={styles.link}>
            <div>Blog</div>
          </a>
        </Link>
      </div>
      <div className={styles.rightSide}>
          <>
            <Link href="/login">
              <a>
                <button className={styles.signIn}>Sign In</button>
              </a>
            </Link>
            <Link href="/signup">
              <a>
                <button className={styles.signUp}>Sign Up</button>
              </a>
            </Link>
          </>
      </div>
    </div>
  );
}
