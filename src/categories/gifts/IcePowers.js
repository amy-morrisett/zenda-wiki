import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function IcePowers() {
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('tags', 'array-contains', 'ice powers user')
    );
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let icePowersChars = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          icePowersChars.push(docNameArr.join('-'));
        } else {
          icePowersChars.push(doc.id);
        }
      });
      setCharArr(icePowersChars);
    };
    getCharArr();
  }, []);

  return (
    <div className="IcePowers">
      <p>Ice powers a gift that allows their user to turn water to ice.</p>
      <p>Characters who have ice powers:</p>
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

export default IcePowers;
