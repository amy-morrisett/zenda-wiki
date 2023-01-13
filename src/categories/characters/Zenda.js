import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import EditArticle from '../../EditArticle';

function Zenda() {
  const [charArr, setCharArr] = useState([]);
  const [articleText, setArticleText] = useState('');

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('tags', 'array-contains', "Zenda's family")
    );
    const getCharArr = async () => {
      const querySnap = await getDocs(q);
      let zendasFam = [];
      querySnap.forEach((doc) => {
        zendasFam.push(doc.id);
      });
      setCharArr(zendasFam);
    };
    getCharArr();
  }, []);

  useEffect(() => {
    const articleDoc = doc(db, 'articles', 'Zenda');
    const getArticleText = async () => {
      const articleDocSnap = await getDoc(articleDoc);
      if (articleDocSnap.data().text) {
        setArticleText(articleDocSnap.data().text);
      }
    };
    getArticleText();
  }, [articleText]);

  return (
    <div className="Zenda">
      <EditArticle article="Zenda" text={articleText} />
      <p>
        Zenda's gifts are <Link to="/gifts/kani">kani</Link> and{' '}
        <Link to="/gifts/aura-sight">aura sight</Link>.
      </p>
      <p>Zenda's family members:</p>
      <ul>
        {charArr
          .filter((char) => char !== 'Zenda')
          .map((char) => (
            <li>
              <Link to={`/characters/${char}`}>{char}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Zenda;
