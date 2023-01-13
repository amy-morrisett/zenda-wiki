import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function SoundPainting() {
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('tags', 'array-contains', 'sound painting user')
    );
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let soundPaintingChars = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          soundPaintingChars.push(docNameArr.join('-'));
        } else {
          soundPaintingChars.push(doc.id);
        }
      });
      setCharArr(soundPaintingChars);
    };
    getCharArr();
  }, []);

  return (
    <div className="SoundPainting">
      <p>
        Sound painting is a gift that allows its user to paint paintings that
        make sounds.
      </p>
      <p>Characters who have sound painting:</p>
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

export default SoundPainting;
