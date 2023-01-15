import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';

function Home() {
  const [articleName, setArticleName] = useState('');
  const [articleText, setArticleText] = useState('');
  const [articleTags, setArticleTags] = useState('');

  function handleArticleName(evt) {
    if (evt.target.value) {
      setArticleName(evt.target.value);
    }
  }
  function handleArticleText(evt) {
    if (evt.target.value) {
      setArticleText(evt.target.value);
    }
  }
  function handleArticleTags(evt) {
    if (evt.target.value) {
      setArticleTags(evt.target.value);
    }
  }
  function handleClick() {
    const articleDoc = doc(db, 'articles', articleName);
    setDoc(articleDoc, { text: articleText, tags: articleTags.split('-') });
  }
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <div className="Home">
      <p>Welcome to the first ever Zenda Wiki!</p>
      <Link to="/categories">Categories</Link>
      <p>Add a new article here!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="title"
            value={articleName}
            onChange={handleArticleName}
          />
        </div>
        <div>
          <input
            type="textarea"
            placeholder="text"
            value={articleText}
            onChange={handleArticleText}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="tags -- separate with a dash"
            value={articleTags}
            onChange={handleArticleTags}
          />
        </div>
        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Home;
