import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { getDocs, collection, doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const AllArticles = () => {
  const [articleArr, setArticleArr] = useState([]);
  const [articleName, setArticleName] = useState('');
  const [articleText, setArticleText] = useState('');
  const [articleTags, setArticleTags] = useState('');

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
    <div>
      <div>
        <Link to="/">Return Home</Link>
      </div>
      <div>
        <Link to="/categories">Return to Categories</Link>
      </div>
      <h1>All Articles:</h1>
      <ul>
        {articleArr.map((article) => (
          <li key={article}>
            <Link to={`/${article}`}>{article.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
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
};

export default AllArticles;
