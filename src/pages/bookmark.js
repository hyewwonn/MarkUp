import React from "react";
import styles from '../styles/bookmark.module.css';
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
            <div className={styles["bookmark-container"]}>
                <div className={styles["bookmark-title"]}>
                    <img className={styles["bookmark-img"]} src="img/bookmark.png" alt="Bookmark" />
                    <h1 className={styles["title"]}>북마크</h1>
                </div>
                <div className={styles["bookmark-list-container"]}>
                    <div className={styles["bookmark-list"]}>
                        <p className={styles["bookmark-list-title"]}>테스트용</p>
                        <a className={styles["bookmark-list-link"]} href="https://www.figma.com">figma.com</a>
                    </div>
                    <div className={styles["bookmark-list"]}>
                        <p className={styles["bookmark-list-title"]}>테스트용</p>
                        <a className={styles["bookmark-list-link"]} href="https://www.figma.com">figma.com</a>
                    </div>
                    <div className={styles["bookmark-list"]}>
                        <p className={styles["bookmark-list-title"]}>테스트용</p>
                        <a className={styles["bookmark-list-link"]} href="https://www.figma.com">figma.com</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default App;
