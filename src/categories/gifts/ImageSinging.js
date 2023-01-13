import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function ImageSinging() {
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('tags', 'array-contains', 'image singing user')
    );
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let imageSingingChars = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          imageSingingChars.push(docNameArr.join('-'));
        } else {
          imageSingingChars.push(doc.id);
        }
      });
      setCharArr(imageSingingChars);
    };
    getCharArr();
  }, []);

  return (
    <div className="Image Singing">
      <p>
        Image singing is a gift that allows its user to project images into the
        air of whatever they're singing about.
      </p>
      <p>Characters who have image singing:</p>
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

export default ImageSinging;
