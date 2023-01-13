import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function AnimalsAndInsects() {
  const [animalArr, setAnimalArr] = useState([]);
  const [insectArr, setInsectArr] = useState([]);

  function renameArticles(
    initialArticleArr,
    finalArticleArr,
    stateSettingFunc
  ) {
    initialArticleArr.forEach((doc) => {
      let docNameArr = doc.id.split(' ');
      if (docNameArr.length > 1) {
        finalArticleArr.push(docNameArr.join('-'));
      } else {
        finalArticleArr.push(doc.id);
      }
    });
    stateSettingFunc(finalArticleArr);
  }

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const animalQ = query(
      articlesRef,
      where('tags', 'array-contains', 'animal')
    );
    const insectQ = query(
      articlesRef,
      where('tags', 'array-contains', 'insect')
    );
    const getCreatureArrs = async () => {
      const animalQuerySnap = await getDocs(animalQ);
      const insectQuerySnap = await getDocs(insectQ);
      let allAnimals = [];
      let allInsects = [];

      renameArticles(animalQuerySnap, allAnimals, setAnimalArr);
      renameArticles(insectQuerySnap, allInsects, setInsectArr);
    };
    getCreatureArrs();
  }, []);

  return (
    <div className="Animals and Insects">
      <h1>Animals and Insects</h1>
      <h3>Animals</h3>
      <ul>
        {animalArr.map((animal) => (
          <li key={animal}>
            <Link to={`/${animal}`}>
              {animal[0].toUpperCase() + animal.slice(1).split('-').join(' ')}
            </Link>
          </li>
        ))}
      </ul>
      <h3>Insects</h3>
      <ul>
        {insectArr.map((insect) => (
          <li key={insect}>
            <Link to={`/${insect}`}>
              {insect[0].toUpperCase() + insect.slice(1).split('-').join(' ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimalsAndInsects;
