import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import EditArticle from '../../EditArticle';

function AuraSight() {
  const [articleText, setArticleText] = useState('');
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    const articleDoc = doc(db, 'articles', 'aura sight');
    const getArticleText = async () => {
      const articleDocSnap = await getDoc(articleDoc);
      if (articleDocSnap.data().text) {
        setArticleText(articleDocSnap.data().text);
      }
    };
    getArticleText();
  }, [articleText]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('tags', 'array-contains', 'aura sight user')
    );
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let auraSightChars = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          auraSightChars.push(docNameArr.join('-'));
        } else {
          auraSightChars.push(doc.id);
        }
      });
      setCharArr(auraSightChars);
    };
    getCharArr();
  }, []);

  return (
    <div className="AuraSight">
      <EditArticle article="aura sight" text={articleText} />
      <p>Characters who have aura sight:</p>
      <ul>
        {charArr.map((char) => (
          <li>
            <Link to={`/characters/${char}`}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuraSight;
