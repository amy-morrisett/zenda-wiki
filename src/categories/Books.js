import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Books() {
  const [bookArr, setBookArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where('tags', 'array-contains', 'book'));
    const getBookArr = async () => {
      const querySnap = await getDocs(q);
      let allBooks = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          allBooks.push(docNameArr.join('-'));
        } else {
          allBooks.push(doc.id);
        }
      });
      setBookArr(allBooks);
    };
    getBookArr();
  }, []);

  return (
    <div className="Books">
      <h1>Books</h1>
      <ul>
        {bookArr.map((book) => (
          <li key={book}>
            <Link to={`/${book}`}>
              {book[0].toUpperCase() + book.slice(1).split('-').join(' ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
