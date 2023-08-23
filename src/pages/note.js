import React, { useState } from "react";
import styles from '../styles/note.module.css';
import navStyles from '../styles/nav.module.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 열림 여부
    const [title, setTitle] = useState(""); // 입력된 타이틀
    const [link, setLink] = useState(""); // 입력된 링크

    const writingOnClick = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setTitle("");
        setLink("");
    }

    const saveBookmark = () => {
        // 여기에 북마크 저장 로직을 추가하고, 필요하면 서버로 데이터 전송 등의 작업을 수행합니다.
        closeModal();
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
            <div className={styles["note-container"]}>
                <div className={styles["note-title-container"]}>
                    <div className={styles["note-title"]}>
                        <img className={styles["note-img"]} src="img/note.png" alt="Note" />
                        <h1 className={styles["title"]}>노트</h1>
                    </div>
                    <div className={styles["note-writing-btn-container"]}>
                        <button className={styles["note-writing-btn"]} onClick={writingOnClick}>노트 추가</button>
                    </div>
                </div>

                {/* modal */}
                {isModalOpen && (
                    <div className={styles["modal-overlay"]}>
                        <div className={styles["modal"]}>
                            <button className={styles["modal-close-btn"]} onClick={closeModal}>닫기</button>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="타이틀"
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

                <div className={styles["note-list-container"]}>
                    <div className={styles["note-list"]}>
                        <div className={styles["note-card"]}>
                            <p className={styles["note-card-text"]}>본문 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                            <h1 className={styles["note-card-title"]}>이름</h1>
                            <p className={styles["note-card-date"]}>2005.05.24</p>
                        </div>
                        <div className={styles["note-card"]}>
                            <p className={styles["note-card-text"]}>본문 sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                            <h1 className={styles["note-card-title"]}>이름</h1>
                            <p className={styles["note-card-date"]}>2005.05.24</p>
                        </div>
                        <div className={styles["note-card"]}>
                            <p className={styles["note-card-text"]}>본문 ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                            <h1 className={styles["note-card-title"]}>이름</h1>
                            <p className={styles["note-card-date"]}>2005.05.24</p>
                        </div>
                        <div className={styles["note-card"]}>
                            <p className={styles["note-card-text"]}>본문</p>
                            <h1 className={styles["note-card-title"]}>이름</h1>
                            <p className={styles["note-card-date"]}>2005.05.24</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default App;
