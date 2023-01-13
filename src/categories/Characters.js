import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Characters() {
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where('tags', 'array-contains', 'character'));
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let allChars = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          allChars.push(docNameArr.join('-'));
        } else {
          allChars.push(doc.id);
        }
      });
      setCharArr(allChars);
    };
    getCharArr();
  }, []);

  return (
    <div className="Characters">
      <ul>
        {charArr.map((char) => (
          <li>
            <Link to={char}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Characters;
