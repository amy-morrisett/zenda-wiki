import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function PsychicPowers() {
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('tags', 'array-contains', 'psychic powers user')
    );
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let psychicPowersChars = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          psychicPowersChars.push(docNameArr.join('-'));
        } else {
          psychicPowersChars.push(doc.id);
        }
      });
      setCharArr(psychicPowersChars);
    };
    getCharArr();
  }, []);

  return (
    <div className="PsychicPowers">
      <p>
        Psychic powers are a gift that allows their user to see the future/stuff
        happening far away from them/other super cool stuff!!
      </p>
      <p>Characters who have psychic powers:</p>
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

export default PsychicPowers;
