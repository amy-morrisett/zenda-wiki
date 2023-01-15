import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import SubCategory from './SubCategory';

const CategoryTemplate = (props) => {
  const [articleArr, setArticleArr] = useState([]);
  const [subCategoryArr, setSubCategoryArr] = useState([]);
  const [isSubCategory, setIsSubCategory] = useState(true);
  const [largerCategory, setLargerCategory] = useState('');
  const [articleName, setArticleName] = useState('');
  const [articleText, setArticleText] = useState('');
  const [otherTags, setOtherTags] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('tags', 'array-contains', props.category)
    );
    const getArticleArr = async () => {
      const querySnap = await getDocs(q);
      let allArticles = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          allArticles.push(docNameArr.join('-'));
        } else {
          allArticles.push(doc.id);
        }
      });
      setArticleArr(allArticles);
    };
    getArticleArr();
  }, [props.category]);

  useEffect(() => {
    const tagsDoc = doc(db, 'tags', 'categories');
    const getSubCategories = async () => {
      const tagDocSnap = await getDoc(tagsDoc);
      console.log(props.category, 'props.category');
      if (tagDocSnap.data()[props.category]) {
        setIsSubCategory(false);
        if (tagDocSnap.data()[props.category].length) {
          setSubCategoryArr(tagDocSnap.data()[props.category]);
        }
      } else {
        setIsSubCategory(true);
        for (let key in tagDocSnap.data()) {
          if (tagDocSnap.data()[key].includes(props.category)) {
            setLargerCategory(key);
          }
        }
      }
    };
    getSubCategories();
  }, [props.category]);

  function handleArticleName(evt) {
    if (evt.target.value) {
      setArticleName(evt.target.value);
    }
  }
  function handleArticleText(evt) {
    if (evt.target.value) {
      setArticleText(evt.target.value);
    }
  }
  function handleNewArticleClick() {
    let allArticleTags = otherTags;
    if (isSubCategory) {
      allArticleTags += `-${largerCategory}`;
    }
    allArticleTags += `-${props.category}`;
    allArticleTags = allArticleTags.split('-');
    if (allArticleTags[0] === '') {
      allArticleTags.shift();
    }
    const articleDoc = doc(db, 'articles', articleName);
    setDoc(articleDoc, { text: articleText, tags: allArticleTags });
  }
  function handleNewSubCategory(evt) {
    if (evt.target.value) {
      setNewSubCategory(evt.target.value);
    }
  }
  async function handleNewSubCategoryClick() {
    const tagsDoc = doc(db, 'tags', 'categories');
    const tagsDocSnap = await getDoc(tagsDoc);
    let categoriesObj = tagsDocSnap.data();
    let currentCategoryArr = tagsDocSnap
      .data()
      [props.category].concat([newSubCategory]);
    await updateDoc(tagsDoc, {
      ...categoriesObj,
      [props.category]: currentCategoryArr,
    });
  }
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <div>
      <div>
        <Link to="/">Return Home</Link>
      </div>
      <div>
        <Link to="/categories">Return to Categories</Link>
      </div>
      <h1>Articles with tag '{props.category}':</h1>
      <ul>
        {articleArr.map((article) => (
          <li key={article}>
            <Link to={`/${article}`}>{article.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
      {!isSubCategory ? (
        <div>
          <h2>Subcategories:</h2>
          {subCategoryArr.map((subcategory) => (
            <SubCategory key={subcategory} category={subcategory} />
          ))}
          <p>Add a new subcategory for this tag here!</p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="subcategory"
                value={newSubCategory}
                onChange={handleNewSubCategory}
              />
            </div>
            <button type="submit" onClick={handleNewSubCategoryClick}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        ''
      )}
      <p>Add a new article with this tag here!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="title"
            value={articleName}
            onChange={handleArticleName}
          />
        </div>
        <div>
          <input
            type="textarea"
            placeholder="text"
            value={articleText}
            onChange={handleArticleText}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="other tags -- separate with a dash"
            value={otherTags}
            onChange={(e) => setOtherTags(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleNewArticleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryTemplate;
