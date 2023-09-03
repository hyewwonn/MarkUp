import React, { useState, useEffect } from "react";
import styles from '../styles/note.module.css';
import navStyles from '../styles/nav.module.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState([]);
    const [username, setUsername] = useState("");
    const [sortBy, setSortBy] = useState("newest"); // 기본 정렬 순서를 "newest"로 설정

    useEffect(() => {
        fetch("http://localhost:3000/getUsername")
            .then(response => response.json())
            .then(data => {
                setUsername(data.username);
            })
            .catch(error => {
                console.error("Error fetching username:", error);
            });
        
        fetch(`http://localhost:3000/getNotes?sortBy=${sortBy}`)
            .then(response => response.json())
            .then(data => {
                setNotes(data.notes);
            })
            .catch(error => {
                console.error("Error fetching notes:", error);
            });
    }, [sortBy]);

    const writingOnClick = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setTitle("");
        setContent("");
    }

    const overlayClickHandler = (event) => {
        if (event.target.classList.contains(styles["modal-overlay"])) {
            closeModal();
        }
    }

    const handleSortChange = (event) => {
        const selectedSort = event.target.value;
        setSortBy(selectedSort);
    }

    // 노트 저장
    const saveNote = () => {
        const newNote = {
            N_TITLE: title,
            N_CONTENT: content,
            N_WRITER: username,
        };

        fetch("http://localhost:3000/saveNote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setNotes(prevNotes => [...prevNotes, newNote]);
                closeModal();
            } else {
                console.error("Error saving note:", data.message);
            }
        })
        .catch(error => {
            console.error("Error saving note:", error);
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
            <div className={styles["note-container"]}>
                <div className={styles["note-title-container"]}>
                    <div className={styles["note-title"]}>
                        <img className={styles["note-img"]} src="img/note.png" alt="Note" />
                        <h1 className={styles["title"]}>노트</h1>
                    </div>
                    <div className={styles["note-menu-right"]}>
                        <div className={styles["note-sort-dropdown"]}>
                            <label htmlFor="sortBy">정렬 순서: </label>
                            <select id="sortBy" value={sortBy} onChange={handleSortChange}>
                                <option value="newest">최신순</option>
                                <option value="oldest">오래된 순</option>
                                <option value="name">이름순</option>
                            </select>
                        </div>
                        <div className={styles["note-writing-btn-container"]}>
                            <button className={styles["note-writing-btn"]} onClick={writingOnClick}>노트 추가</button>
                        </div>
                    </div>
                </div>

                <div className={styles["note-list-container"]}>
                    <div className={styles["note-list"]}>
                        {notes && notes.length > 0 ? (
                            notes.map((note, index) => (
                                <div className={styles["note-card"]} key={index}>
                                    <p className={styles["note-card-text"]}>{note.N_CONTENT}</p>
                                    <h1 className={styles["note-card-title"]}>{note.N_TITLE}</h1>
                                    <p className={styles["note-card-date"]}>{note.N_DATE}</p>
                                </div>
                            ))
                        ) : (
                            <p>노트를 추가하세요</p>
                        )}
                    </div>
                </div>
            </div>
            
            {/* modal */}
            {isModalOpen && (
                <div className={styles["modal-overlay"]} onClick={overlayClickHandler}>
                    <div className={styles["modal"]}>
                        <h1>새 노트 추가</h1>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목"
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용"
                        />
                        <button onClick={saveNote}>저장</button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}

export default App;
