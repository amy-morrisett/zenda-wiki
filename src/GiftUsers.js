import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const GiftUsers = (props) => {
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('tags', 'array-contains', `${props.gift} user`)
    );
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let giftChars = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          giftChars.push(docNameArr.join('-'));
        } else {
          giftChars.push(doc.id);
        }
      });
      setCharArr(giftChars);
    };
    getCharArr();
  }, [props.gift]);
  return (
    <div>
      <p>Characters who have {props.gift}:</p>
      <ul>
        {charArr.map((char) => (
          <li key={char}>
            <Link to={`/${char}`}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GiftUsers;
