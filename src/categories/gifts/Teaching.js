import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Teaching() {
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('tags', 'array-contains', 'teaching user')
    );
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let teachingChars = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          teachingChars.push(docNameArr.join('-'));
        } else {
          teachingChars.push(doc.id);
        }
      });
      setCharArr(teachingChars);
    };
    getCharArr();
  }, []);

  return (
    <div className="Teaching">
      <p>Teaching is a gift that allows its user to...teach. lol</p>
      <p>Characters who have teaching:</p>
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

export default Teaching;
