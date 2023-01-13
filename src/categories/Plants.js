import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Plants() {
  const [plantArr, setPlantArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where('tags', 'array-contains', 'plant'));
    const getPlantArr = async () => {
      const querySnap = await getDocs(q);
      let allPlants = [];
      querySnap.forEach((doc) => {
        let docNameArr = doc.id.split(' ');
        if (docNameArr.length > 1) {
          allPlants.push(docNameArr.join('-'));
        } else {
          allPlants.push(doc.id);
        }
      });
      setPlantArr(allPlants);
    };
    getPlantArr();
  }, []);

  return (
    <div className="Plants">
      <h1>Plants</h1>
      <ul>
        {plantArr.map((plant) => (
          <li key={plant}>
            <Link to={`/${plant}`}>
              {plant[0].toUpperCase() + plant.slice(1).split('-').join(' ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Plants;
