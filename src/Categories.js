//TODO: add option for user to create a new tag (make sure to account for sub-categories)
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { getDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Categories() {
  const [tagObj, setTagObj] = useState({});

  useEffect(() => {
    const tagsDoc = doc(db, 'tags', 'categories');
    const getTagCategories = async () => {
      const tagDocSnap = await getDoc(tagsDoc);
      let allTagObj = {};
      Object.keys(tagDocSnap.data()).forEach((key) => {
        allTagObj[key] = [];
        if (tagDocSnap.data()[key].length) {
          tagDocSnap.data()[key].forEach((elem) => {
            allTagObj[key].push(elem);
          });
        }
      });
      setTagObj(allTagObj);
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
        {Object.keys(tagObj).map((tag) => (
          <li key={tag}>
            <Link to={`/${tag}`}>{tag.split('-').join(' ')}</Link>
            {tagObj[tag].length ? (
              <div>
                <ul>
                  {tagObj[tag].map((subcategory) => (
                    <li key={subcategory}>
                      <Link to={`/${subcategory}`}>
                        {subcategory.split('-').join(' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
