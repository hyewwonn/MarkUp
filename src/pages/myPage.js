import React, { useState, useEffect } from "react";
import styles from '../styles/myPage.module.css';
import navStyles from '../styles/nav.module.css';

function App() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/getUsername")
            .then(response => response.json())
            .then(data => {
                setUsername(data.username);
            })
            .catch(error => {
                console.error("Error fetching username:", error);
            });
    }, []);

    const logoutOnClick = () => {
        // 로그아웃 처리 및 페이지 이동
        fetch("http://localhost:3000/logout", {
            method: "POST",
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "/login";
            } else {
                console.error("Error logging out");
            }
        })
        .catch(error => {
            console.error("Error logging out:", error);
        });
    }

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
            <div className={styles["mypage-container"]}>
                <div className={styles["mypage-title"]}>
                    <img className={styles["mypage-img"]} src="img/mypage.png" alt="My Page" />
                    <h1 className={styles["title"]}>마이페이지</h1>
                </div>
                <div className={styles["mypage-content-container"]}>
                    <div className={styles["mypage-content-title-container"]}>
                        <div className={styles["mypage-user-info-container"]}>
                            <h1 className={`${styles["mypage-content-title"]} ${styles["mypage-content-name"]}`}>
                                {username}
                            </h1>
                            <h2 className={styles["mypage-content-title"]}>님의 기록</h2>
                        </div>
                        <div className={styles["mypage-logout-btn-container"]}>
                            <button className={styles["mypage-logout-btn"]} onClick={logoutOnClick}>로그아웃</button>
                        </div>
                    </div>
                    <div className={styles["mypage-card-container"]}>
                        <div className={`${styles["mypage-card"]} ${styles["mypage-bookmark"]}`}>
                            <h1 className={styles["mypage-card-content"]}>63</h1>
                            <h1 className={styles["mypage-card-record"]}>북마크 수</h1>
                        </div>
                        <div className={`${styles["mypage-card"]} ${styles["mypage-note"]}`}>
                            <h1 className={styles["mypage-card-content"]}>40</h1>
                            <h1 className={styles["mypage-card-record"]}>노트 수</h1>
                        </div>
                        <div className={`${styles["mypage-card"]} ${styles["mypage-join-date"]}`}>
                            <h1 className={styles["mypage-card-content"]}>50</h1>
                            <h1 className={styles["mypage-card-record"]}>일째</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default App;
