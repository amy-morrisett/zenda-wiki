import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Gifts() {
  const [giftArr, setGiftArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where('tags', 'array-contains', 'gift'));
    const getGiftArr = async () => {
      const querySnap = await getDocs(q);
      let allGifts = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          allGifts.push(docNameArr.join('-'));
        } else {
          allGifts.push(doc.id);
        }
      });
      setGiftArr(allGifts);
    };
    getGiftArr();
  }, []);

  return (
    <div className="Gifts">
      <ul>
        {giftArr.map((gift) => (
          <li>
            <Link to={gift}>
              {gift[0].toUpperCase() + gift.slice(1).split('-').join(' ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gifts;
