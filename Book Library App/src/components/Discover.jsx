import { useEffect, useState } from 'react';
import Register from './Register';
import Autorization from './Autorization';

const BookLibrary = () => {
    const localLibrary = JSON.parse(localStorage.getItem("libraryList"));
    const localTitle = JSON.parse(localStorage.getItem("titleList"));
    const localprevSearch = JSON.parse(localStorage.getItem("prevSearch"));

    const [libraryList, setLibraryList] = useState(localLibrary ? localLibrary : [[], []]);
    const [titleList, setTitleList] = useState(localTitle ? localTitle : [[], []]);
    const [previousSearch, setPreviousSearch] = useState(localprevSearch ? localprevSearch : "");
    const [usersList, setUsersList] = useState([]);
    const [booksList, setBooksList] = useState([]);
    const [isDiscover, setIsDiscover] = useState(true);
    const [listIndex, setListIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(libraryList);
        console.log(titleList)
        localStorage.setItem("libraryList", JSON.stringify(libraryList));
        localStorage.setItem("titleList", JSON.stringify(titleList));
        
    }, [libraryList, titleList])

    useEffect(() => {
        console.log(previousSearch);
        localStorage.setItem("prevSearch", JSON.stringify(previousSearch));
    }, [previousSearch])

    useEffect(() => {
        const prevSearch = async () => {
            setIsLoading(true);
            const data = await fetchData(previousSearch);
            const books = [];
            let bookCount = 1;
            for (const book of data.items) {
                if (bookCount <= 10) {
                    const volumeInfo = book.volumeInfo;
                    const title = volumeInfo.title.length > 16 ? `${volumeInfo.title.slice(0, 16)}...` : volumeInfo.title;

                    const obj = {
                        title: title,
                        src: volumeInfo.imageLinks.thumbnail,
                        author: volumeInfo.authors !== undefined ? volumeInfo.authors[0] : "",
                        isSelected: ([...titleList[0], ...titleList[1]].includes(title)) ? true : false,
                        isRead: title in titleList[0] ? true : false
                    }
                    books.push(obj);
                }

                bookCount += 1;
            }

            setBooksList(books);
            setIsLoading(false);
        }

        if (previousSearch.length > 0) {
            prevSearch();
        }

    }, []);

    const fetchData = async (searchTerm) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
            const data = await response.json();

            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await fetchData(e.target.book.value);
        if(data.totalItems === 0) {
            return;
        }
        setPreviousSearch(e.target.book.value);
        e.target.reset();
        const books = [];
        let bookCount = 1;
        for(const book of data.items) {
            if(bookCount <= 10) {
                const volumeInfo = book.volumeInfo;
                const title = volumeInfo.title.length > 16 ? `${volumeInfo.title.slice(0, 16)}...` : volumeInfo.title;
    
                const obj = {
                    title: title,
                    src: volumeInfo.imageLinks.thumbnail,
                    author: volumeInfo.authors !== undefined ? volumeInfo.authors[0] : "",
                    isSelected: ([...titleList[0], ...titleList[1]].includes(title))? true : false,
                    isRead: title in titleList[0] ? true : false
                }
                books.push(obj);
            }

            bookCount += 1;
        }

        setBooksList(prev => books)
        
        console.log(booksList);
    }

    const pStyles = {
        width: "500%",
        height: "200%",
        fontSize: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    
    const handleClick = ({ target }) => {
        const title = target.parentElement.previousSibling.textContent;
        target.style.color = "red";
        console.log(title);
        if (![...titleList[0], ...titleList[1]].includes(title)) {
            setTitleList(prev => [[...prev[0], title], prev[1]]);
            let bookObj;
            for(const book of booksList) {
                if(book.title === title) {
                    bookObj = book;
                    bookObj.isSelected = true;
                }
            }
    
            setLibraryList(prev => [[...prev[0], bookObj], prev[1]]);
        }
    }

    const handleDelete = ({ target }) => {
        const delTitle = target.parentElement.previousSibling.textContent;
        if (titleList[0].includes(delTitle)) {
            const newList = libraryList[0].filter(curValue => {
                if(curValue.title === delTitle) {
                    curValue.isSelected = false;
                }
                return curValue.title !== delTitle;
            });

            const newTitleList = titleList[0].filter(curValue => curValue !== delTitle);

            setTitleList(prev => [newTitleList, prev[1]]);
            setLibraryList(prev => [newList, prev[1]]);
        } else {
            const newList = libraryList[1].filter(curValue => {
                if(curValue.title === delTitle) {
                    curValue.isSelected = false;
                }
                return curValue.title !== delTitle;
            });

            const newTitleList = titleList[1].filter(curValue => curValue !== delTitle);
            
            setTitleList(prev => [prev[0], newTitleList]);
            setLibraryList(prev => [prev[0], newList]);
        }
    }

    const handleHover = ({ target }) => {
        target.style.color = "white";
    }

    const handleLeave = ({ target }) => {
        target.style.color = "red";
    }

    // // Discover-ისთვის
    // const handleLeaveDiscover = ({ target }, bool) => {
    //     if(bool) {
    //         target.style.color = "red";
    //     } else {
    //         target.style.color = "black";
    //     }
    // }

    const discover = (
        <>
            <nav>
                <div className="nav-item">
                    <i className="fa-solid fa-house-chimney-user"></i>
                    <h1><span>Book</span>Base</h1>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-house"></i>
                    <p onClick={() => setIsDiscover(true)}>Discover</p>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-book"></i>
                    <p>Category</p>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-book-open"></i>
                    <p onClick={() => setIsDiscover(false)}>My Library</p>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-file-arrow-down"></i>
                    <p>Download</p>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-headphones"></i>
                    <p>Audio Books</p>
                </div>
                <div className="nav-item">
                    <i className="fa-regular fa-heart"></i>
                    <p>Favorite</p>
                </div>

                <div className="border-div"></div>

                <div className="nav-item">
                    <i className="fa-solid fa-gear"></i>
                    <p>Settings</p>
                </div>
                <div className="nav-item">
                    <i className="fa-regular fa-comments"></i>
                    <p>Suppot</p>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    <p>Logout</p>
                </div>
            </nav>
            <section className="search-section">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="book"><i className="fa-solid fa-magnifying-glass"></i></label>
                    <input type="text" name="book" id="book" placeholder="Search your favorite books" required />
                </form>
                <div className="profile-info">
                    <img src="src\images\profile.jpg" alt="profile" />
                    <p>Nikoloz <i className="fa-solid fa-chevron-down"></i></p>
                </div>
            </section>
            <section className="books">
                {   booksList.length > 0 ?
                    booksList.map((curValue, index) => {
                        return (
                            <div key={index} className="book-div">
                                <div className="img-div">
                                    <img src={curValue.src} alt={curValue.title} />
                                </div>
                                <h2>{curValue.title}</h2>
                                <div className="author-div">
                                    <p>{curValue.author}</p>
                                    <i className="fa-regular fa-heart" style={{color: (curValue.isSelected ? "red" : "black")}}
                                    onClick={handleClick}></i>
                                </div>
                            </div>
                        );
                    }) : <p style={pStyles}>{previousSearch.length > 0 && isLoading ? "Loading..." : "Nothing to recommend"}</p>
                }
            </section>
        </>
    );

    const handleChange = ({ target }) => {
        console.log(target.checked)
        const thisTitle = target.parentElement.previousSibling.previousSibling.textContent;
        console.log(thisTitle);
        let obj;
        if(target.checked) {
            const newList = libraryList[0].filter(curValue => {
                if(curValue.title === thisTitle) {
                    curValue.isRead = true;
                    obj = curValue;
                }

                return curValue.title !== thisTitle;
            })

            const newTitleList = titleList[0].filter(curValue => curValue !== thisTitle);

            setTitleList(prev => [newTitleList, [...prev[1], thisTitle]]);
            setLibraryList(prev => [newList, [...prev[1], obj]]);
        } else {
            const newList = libraryList[1].filter(curValue => {
                if(curValue.title === thisTitle) {
                    curValue.isRead = false;
                    obj = curValue;
                }

                return curValue.title !== thisTitle;
            })

            const newTitleList = titleList[1].filter(curValue => curValue !== thisTitle);

            setTitleList(prev => [[...prev[0], thisTitle], newTitleList]);
            setLibraryList(prev => [[...prev[0], obj], newList]);
        }
    }

    const myLibrary = (
        <>
            <nav>
                <div className="nav-item">
                    <i className="fa-solid fa-house-chimney-user"></i>
                    <h1><span>Book</span>Base</h1>
                </div>
                <div className="nav-item" style={{color: '#6e778a'}}>
                    <i className="fa-solid fa-house"></i>
                    <p onClick={() => setIsDiscover(true)}>Discover</p>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-book"></i>
                    <p>Category</p>
                </div>
                <div className="nav-item" style={{color: '#0055ff'}}>
                    <i className="fa-solid fa-book-open"></i>
                    <p onClick={() => setIsDiscover(false)}>My Library</p>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-file-arrow-down"></i>
                    <p>Download</p>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-headphones"></i>
                    <p>Audio Books</p>
                </div>
                <div className="nav-item">
                    <i className="fa-regular fa-heart"></i>
                    <p>Favorite</p>
                </div>

                <div className="border-div"></div>

                <div className="nav-item">
                    <i className="fa-solid fa-gear"></i>
                    <p>Settings</p>
                </div>
                <div className="nav-item">
                    <i className="fa-regular fa-comments"></i>
                    <p>Suppot</p>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    <p>Logout</p>
                </div>
            </nav>
            <section className="search-section">
                <div className="btn-div">
                    <button onClick={() => setListIndex(null)}>All</button>
                    <button onClick={() => setListIndex(1)}>Readed</button>
                    <button onClick={() => setListIndex(0)}>Unreaded</button>
                </div>
                <div className="profile-info">
                    <img src="src\images\profile.jpg" alt="profile" />
                    <p>Nikoloz <i className="fa-solid fa-chevron-down"></i></p>
                </div>
            </section>
            <section className="books" style={{ height: "585px", overflowY: "auto" }}>
                {
                    [...libraryList[0], ...libraryList[1]].length > 0 ? 
                    ((listIndex === null ? [...libraryList[0], ...libraryList[1]] : libraryList[listIndex]).map((curValue, index) => {
                        return (
                            <div key={index} className="book-div">
                                <div className="img-div">
                                    <img src={curValue.src} alt={curValue.title} />
                                </div>
                                <h2>{curValue.title}</h2>
                                <div className="author-div">
                                    <p>{curValue.author}</p>
                                    <i className="fa-regular fa-heart" style={{color: "red"}} 
                                    onClick={handleDelete}
                                    onMouseOver={handleHover}
                                    onMouseLeave={handleLeave}></i>
                                </div>
                                <div className="checkbox-div">
                                    <label htmlFor="isread">Read:</label>
                                    {curValue.isRead ? <input type="checkbox" id="isread" checked={true} onChange={handleChange}  /> :
                                    <input type="checkbox" id="isread" checked={false} onChange={handleChange}  />}
                                </div>
                            </div>
                        );
                    }))
                    : <p style={pStyles}>Your library is empty</p>
                }
            </section>
        </>
    );
    
    return (
        <main>
            {
                isDiscover ? discover : myLibrary
            }

            {/* <Register useRegister={[usersList, setUsersList]} />
            <Autorization usersList={usersList} /> */}
        </main>
    );
}

export default BookLibrary;