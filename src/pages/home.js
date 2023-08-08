import React from "react";
import styles from '../styles/home.module.css';
import navStyles from '../styles/nav.module.css';

function App() {
    return (
        <>
        <header>
            <nav className={navStyles.nav}>
                <div className={navStyles["nav-icon"]}>
                    <a href="/home">
                        <img className={navStyles["nav-icon-img"]} src="img/bookmark.png" alt="Bookmark" />
                        <h1 className={navStyles["nav-icon-title"]}>Mark Up</h1>
                    </a>
                </div>
                <div className={navStyles["nav-menu"]}>
                    <ul className={navStyles["nav-list"]}>
                        <li className={navStyles["nav-item"]}>
                            <a href="/bookmark" className={navStyles["nav-link"]}>Bookmark</a>
                        </li>
                        <li className={navStyles["nav-item"]}>
                            <a href="/note" className={navStyles["nav-link"]}>Note</a>
                        </li>
                        <li className={navStyles["nav-item"]}>
                            <a href="/myPage" className={navStyles["nav-link"]}>My Page</a>
                        </li>
                    </ul>
                </div>
            </nav> 
        </header>

        <div className={styles["main-container"]}>
            <div className={styles["recent-container"]}>
                <div className={styles["recent-note-container"]}>
                    <h1 className={styles["title"]}>최근 노트</h1>
                    <div className={styles["recent-note"]}>
                        <div className={styles["recent-card"]}>
                            <h1 className={styles["recent-card-content"]}>figma</h1>
                            <h1 className={styles["recent-card-title"]}>피그마</h1>
                        </div>
                        <div className={styles["recent-card"]}>
                            <h1 className={styles["recent-card-content"]}>figma</h1>
                            <h1 className={styles["recent-card-title"]}>피그마</h1>
                        </div>
                        <div className={styles["recent-card"]}>
                            <h1 className={styles["recent-card-content"]}>figma</h1>
                            <h1 className={styles["recent-card-title"]}>피그마</h1>
                        </div>
                    </div>
                </div>

                <div className={styles["recent-bookmark-container"]}>
                    <h1 className={styles["title"]}>최근 북마크</h1>
                    <div className={styles["recent-bookmark"]}>
                        <div className={styles["recent-card"]}>
                            <h1 className={styles["recent-card-content"]}>figma</h1>
                            <h1 className={styles["recent-card-title"]}>피그마</h1>
                        </div>
                        <div className={styles["recent-card"]}>
                            <h1 className={styles["recent-card-content"]}>figma</h1>
                            <h1 className={styles["recent-card-title"]}>피그마</h1>
                        </div>
                        <div className={styles["recent-card"]}>
                            <h1 className={styles["recent-card-content"]}>figma</h1>
                            <h1 className={styles["recent-card-title"]}>피그마</h1>
                        </div>
                    </div>
                </div>          
            </div>
        </div>
        </>
    );
}

export default App;
