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
        <li>
          <Link to="/locations">Locations</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/plants">Plants</Link>
        </li>
        <li>
          <Link to="/animals-and-insects">Animals and Insects</Link>
        </li>
      </ul>
    </div>
  );
}

export default Categories;
