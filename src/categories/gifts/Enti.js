import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Enti() {
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where('tags', 'array-contains', 'enti user'));
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let entiChars = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          entiChars.push(docNameArr.join('-'));
        } else {
          entiChars.push(doc.id);
        }
      });
      setCharArr(entiChars);
    };
    getCharArr();
  }, []);

  return (
    <div className="Enti">
      <p>Enti is a gift that allows its user to communicate with insects.</p>
      <p>Characters who have enti:</p>
      <ul>
        {charArr.map((char) => (
          <li>
            <Link to={`/characters/${char}`}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Enti;
