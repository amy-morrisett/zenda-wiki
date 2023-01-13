import React from 'react';
// import { db } from './firebase';
// import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Categories() {
  return (
    <div className="Categories">
      <ul>
        <li>
          <Link to="/gifts">Gifts</Link>
        </li>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
      </ul>
    </div>
  );
}

export default Categories;
