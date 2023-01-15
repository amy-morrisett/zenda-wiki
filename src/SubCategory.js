import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const SubCategory = (props) => {
  const [articleArr, setArticleArr] = useState([]);

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

  return (
    <div>
      <h4>
        <Link to={`/${props.category.split(' ').join('-')}`}>
          {props.category}
        </Link>
        :
      </h4>
      <ul>
        {articleArr.map((article) => (
          <li key={article}>
            <Link to={`/${article}`}>{article.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategory;
