import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { db } from './firebase';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

import Home from './Home';

import Categories from './Categories';

import Gifts from './categories/Gifts';
import Characters from './categories/Characters';
import Locations from './categories/Locations';
import Books from './categories/Books';
import Plants from './categories/Plants';
import AnimalsAndInsects from './categories/AnimalsAndInsects';

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
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/categories" element={<Categories />} />

        {/* <Route path="/gifts" element={<Gifts />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/books" element={<Books />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/animals-and-insects" element={<AnimalsAndInsects />} /> */}

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
