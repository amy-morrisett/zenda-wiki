import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Locations() {
  const [locationArr, setLocationArr] = useState([]);
  const [planetArr, setPlanetArr] = useState([]);
  const [moonArr, setMoonArr] = useState([]);

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
    const q = query(articlesRef, where('tags', 'array-contains', 'location'));
    const planetQ = query(
      articlesRef,
      where('tags', 'array-contains', 'planet')
    );
    const moonQ = query(articlesRef, where('tags', 'array-contains', 'moon'));
    const getLocationArrs = async () => {
      const querySnap = await getDocs(q);
      const planetQuerySnap = await getDocs(planetQ);
      const moonQuerySnap = await getDocs(moonQ);
      let allLocations = [];
      let allPlanets = [];
      let allMoons = [];

      renameArticles(querySnap, allLocations, setLocationArr);
      renameArticles(planetQuerySnap, allPlanets, setPlanetArr);
      renameArticles(moonQuerySnap, allMoons, setMoonArr);
    };
    getLocationArrs();
  }, []);

  return (
    <div className="Locations">
      <h1>Locations</h1>
      <h3>All Locations</h3>
      <ul>
        {locationArr.map((location) => (
          <li key={location}>
            <Link to={`/${location}`}>
              {location[0].toUpperCase() +
                location.slice(1).split('-').join(' ')}
            </Link>
          </li>
        ))}
      </ul>
      <h3>Planets</h3>
      <ul>
        {planetArr.map((location) => (
          <li key={location}>
            <Link to={`/${location}`}>
              {location[0].toUpperCase() +
                location.slice(1).split('-').join(' ')}
            </Link>
          </li>
        ))}
      </ul>
      <h3>Moons</h3>
      <ul>
        {moonArr.map((location) => (
          <li key={location}>
            <Link to={`/${location}`}>
              {location[0].toUpperCase() +
                location.slice(1).split('-').join(' ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Locations;
