import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Kani() {
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where('tags', 'array-contains', 'kani user'));
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let kaniChars = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          kaniChars.push(docNameArr.join('-'));
        } else {
          kaniChars.push(doc.id);
        }
      });
      setCharArr(kaniChars);
    };
    getCharArr();
  }, []);

  return (
    <div className="Kani">
      <p>
        Kani is a gift that allows its user to communicate with and manipulate
        plants.
      </p>
      <p>Characters who have kani:</p>
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

export default Kani;
