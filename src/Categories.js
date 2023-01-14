import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { getDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Categories() {
  const [tagArr, setTagArr] = useState([]);

  useEffect(() => {
    const tagsDoc = doc(db, 'tags', 'categories');
    const getTagCategories = async () => {
      const tagDocSnap = await getDoc(tagsDoc);
      let allTagArr = [];
      Object.keys(tagDocSnap.data()).forEach((key) => {
        if (tagDocSnap.data()[key].length) {
          tagDocSnap.data()[key].forEach((elem) => {
            allTagArr.push(elem);
          });
        }
        allTagArr.push(key);
      });
      setTagArr(allTagArr);
    };
    getTagCategories();
  }, []);

  return (
    <div className="Categories">
      <div>
        <Link to="/">Return Home</Link>
      </div>
      <h1>Categories</h1>
      <ul>
        {tagArr.map((tag) => (
          <li key={tag}>
            <Link to={`/${tag}`}>{tag.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
