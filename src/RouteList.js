import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { db } from './firebase';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

import Home from './Home';

import Categories from './Categories';
import AllArticles from './AllArticles';

import ArticleTemplate from './ArticleTemplate';
import CategoryTemplate from './CategoryTemplate';

function RouteList() {
  const [articleArr, setArticleArr] = useState([]);
  const [tagArr, setTagArr] = useState([]);

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

  useEffect(() => {
    const tagsDoc = doc(db, 'tags', 'categories');
    const getTagCategories = async () => {
      const tagDocSnap = await getDoc(tagsDoc);
      let allTagArr = [];
      for (let key in tagDocSnap.data()) {
        if (tagDocSnap.data()[key].length) {
          tagDocSnap.data()[key].forEach((elem) => {
            allTagArr.push(elem.split(' ').join('-'));
          });
        }
        allTagArr.push(key.split(' ').join('-'));
      }
      setTagArr(allTagArr);
    };
    getTagCategories();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/all-articles" element={<AllArticles />} />

        {articleArr.map((articleName) => (
          <Route
            path={`${articleName}`}
            element={
              <ArticleTemplate article={articleName.split('-').join(' ')} />
            }
            key={articleName}
          />
        ))}

        {tagArr.map((tag) => (
          <Route
            path={`${tag}`}
            element={<CategoryTemplate category={tag.split('-').join(' ')} />}
            key={tag}
          />
        ))}
      </Routes>
    </div>
  );
}

export default RouteList;
