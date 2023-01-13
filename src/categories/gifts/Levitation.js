import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Levitation() {
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('tags', 'array-contains', 'levitation user')
    );
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let levitationChars = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          levitationChars.push(docNameArr.join('-'));
        } else {
          levitationChars.push(doc.id);
        }
      });
      setCharArr(levitationChars);
    };
    getCharArr();
  }, []);

  return (
    <div className="Levitation">
      <p>
        Levitation is a gift that allows people to...well...levitate stuff lol
      </p>
      <p>Characters who have levitation:</p>
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

export default Levitation;
