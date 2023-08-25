import React, { useState, useEffect } from "react";
import styles from '../styles/bookmark.module.css';
import navStyles from '../styles/nav.module.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [username, setUsername] = useState("");
    const [bookmarks, setBookmarks] = useState([]);
    const bnum = 1;

    useEffect(() => {
        fetch("http://localhost:3000/getUsername")
            .then(response => response.json())
            .then(data => {
                setUsername(data.username);
            })
            .catch(error => {
                console.error("Error fetching username:", error);
            });

        fetch("http://localhost:3000/getBookmarks")
            .then(response => response.json())
            .then(data => {
              setBookmarks(data.bookmarks); // 서버에서 받아온 북마크 목록을 상태에 저장
            })
            .catch(error => {
              console.error("Error fetching bookmarks:", error);
            });
    }, []);

    const writingOnClick = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setTitle("");
        setLink("");
    }

    const overlayClickHandler = (event) => {
        if (event.target.classList.contains(styles["modal-overlay"])) {
            closeModal();
        }
    }

    const saveBookmark = () => {
        const newBookmark = {
            B_TITLE: title,
            B_LINK: link,
            B_WRITER: username,
        };
    
        fetch("http://localhost:3000/saveBookmark", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBookmark),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 성공적으로 저장된 경우에만 화면 갱신
                const updatedBookmarks = [...bookmarks, {
                    B_TITLE: newBookmark.B_TITLE,
                    B_LINK: newBookmark.B_LINK
                }];
                setBookmarks(updatedBookmarks);
                closeModal();
            } else {
                console.error("Error saving bookmark:", data.message);
            }
        })
        .catch(error => {
            console.error("Error saving bookmark:", error);
        });
    };

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
                <div className={styles["bookmark-title-container"]}>
                    <div className={styles["bookmark-title"]}>
                        <img className={styles["bookmark-img"]} src="img/bookmark.png" alt="Bookmark" />
                        <h1 className={styles["title"]}>북마크</h1>
                    </div>
                    <div className={styles["bookmark-writing-btn-container"]}>
                        <button className={styles["bookmark-writing-btn"]} onClick={writingOnClick}>북마크 추가</button>
                    </div>
                </div>

                <div className={styles["bookmark-list-container"]}>
                    <div className={styles["bookmark-list"]}>
                        {bookmarks.map((bookmark) => (
                            <div key={bookmark.B_NUM} className={styles["bookmark-list-item"]}>
                                <p className={styles["bookmark-list-order"]}>{bnum}</p>
                                <p className={styles["bookmark-list-title"]}>{bookmark.B_TITLE}</p>
                                <a className={styles["bookmark-list-link"]} href={bookmark.B_LINK}>{bookmark.B_LINK}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* modal */}
            {isModalOpen && (
                <div className={styles["modal-overlay"]} onClick={overlayClickHandler}>
                    <div className={styles["modal"]}>
                        <h1>새 북마크 추가</h1>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목"
                        />
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="링크"
                        />
                        <button onClick={saveBookmark}>저장</button>
                    </div>
                </div>
            )}
        </div>
        </>

    );
}

export default App;
