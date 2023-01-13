import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

import Home from './Home';

import Categories from './Categories';

import Gifts from './categories/Gifts';
import Characters from './categories/Characters';

import ArticleTemplate from './ArticleTemplate';

function RouteList() {
  const [articleArr, setArticleArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const getArticleArr = async () => {
      const articleRefSnap = await getDocs(articlesRef);
      let allArticles = [];
      articleRefSnap.forEach((doc) => {
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
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/gifts" element={<Gifts />} />
        <Route path="/characters" element={<Characters />} />

        {articleArr.map((articleName) => (
          <Route
            path={`${articleName}`}
            element={
              <ArticleTemplate article={articleName.split('-').join(' ')} />
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default RouteList;
