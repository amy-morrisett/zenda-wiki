import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function EmotionPainting() {
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('tags', 'array-contains', 'emotion painting user')
    );
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let emotionPaintingChars = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          emotionPaintingChars.push(docNameArr.join('-'));
        } else {
          emotionPaintingChars.push(doc.id);
        }
      });
      setCharArr(emotionPaintingChars);
    };
    getCharArr();
  }, []);

  return (
    <div className="Emotion Painting">
      <p>
        Emotion painting is a gift that allows its user to paint paintings that
        make viewers feel certain emotions.
      </p>
      <p>Characters who have emotion painting:</p>
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

export default EmotionPainting;
