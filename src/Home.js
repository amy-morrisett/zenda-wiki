import React from 'react';
import { Link } from 'react-router-dom';
// import { db } from './firebase';
// import { getDoc, updateDoc, doc } from 'firebase/firestore';

function Home() {
  return (
    <div className="Home">
      <p>Welcome to the first ever Zenda Wiki!</p>
      <Link to="/categories">Categories</Link>
    </div>
  );
}

export default Home;
