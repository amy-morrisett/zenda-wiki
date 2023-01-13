import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Koah() {
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where('tags', 'array-contains', 'koah user'));
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let koahChars = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          koahChars.push(docNameArr.join('-'));
        } else {
          koahChars.push(doc.id);
        }
      });
      setCharArr(koahChars);
    };
    getCharArr();
  }, []);

  return (
    <div className="Koah">
      <p>Koah is a gift that allows its user to communicate with animals.</p>
      <p>Characters who have koah:</p>
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

export default Koah;
