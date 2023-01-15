import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Categories() {
  const [tagObj, setTagObj] = useState({});
  const [newTagLargerCategory, setNewTagLargerCategory] = useState('');
  const [newTagName, setNewTagName] = useState('');

  useEffect(() => {
    const tagsDoc = doc(db, 'tags', 'categories');
    const getTagCategories = async () => {
      const tagDocSnap = await getDoc(tagsDoc);
      let allTagObj = {};
      for (let key in tagDocSnap.data()) {
        allTagObj[key] = [];
        tagDocSnap.data()[key].forEach((elem) => {
          allTagObj[key].push(elem);
        });
      }
      setTagObj(allTagObj);
    };
    getTagCategories();
  }, []);

  async function handleClick() {
    const tagsDoc = doc(db, 'tags', 'categories');
    if (newTagLargerCategory === 'none') {
      updateDoc(tagsDoc, { [newTagName]: [] });
    } else {
      const tagDocSnap = await getDoc(tagsDoc);
      //console.log(tagDocSnap.data()[newTagLargerCategory]);
      let subcategoryArr = tagDocSnap
        .data()
        [newTagLargerCategory].concat([newTagName]);
      updateDoc(tagsDoc, { [newTagLargerCategory]: subcategoryArr });
    }
  }
  function handleSubmit(evt) {
    evt.preventDefault();
  }

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
      <p>Add a new tag!</p>
      <form onSubmit={handleSubmit}>
        <label>Larger category:</label>
        <select
          value={newTagLargerCategory}
          onChange={(e) => setNewTagLargerCategory(e.target.value)}
        >
          <option value="" disabled hidden></option>
          {Object.keys(tagObj).map((largerCat) => (
            <option key={largerCat} value={largerCat}>
              {largerCat}
            </option>
          ))}
          <option value="none">none; create a new larger category</option>
        </select>
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
        />
        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Categories;
