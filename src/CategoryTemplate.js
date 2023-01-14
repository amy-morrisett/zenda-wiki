//TODO: finish category template, move all current category pages here
//TODO: add option for user to create a new page with this tag
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
// import SubCategory from './SubCategory';

const CategoryTemplate = (props) => {
  const [articleArr, setArticleArr] = useState([]);
  const [subCategoryArr, setSubCategoryArr] = useState([]);

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
  }, [props]);

  useEffect(() => {
    const tagsDoc = doc(db, 'tags', 'categories');
    const getSubCategories = async () => {
      const tagDocSnap = await getDoc(tagsDoc);
      setSubCategoryArr(tagDocSnap.data()[props.category]);
    };
    getSubCategories();
  }, [props.category]);

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
      {/* <div>
        <h4>Subcategories:</h4>
        {subCategoryArr.length
          ? subCategoryArr.map((subcategory) => (
              <SubCategory category={subcategory} />
            ))
          : ''}
      </div> */}
    </div>
  );
};

export default CategoryTemplate;
