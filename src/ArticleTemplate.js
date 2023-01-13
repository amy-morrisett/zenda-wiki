import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import GiftUsers from './GiftUsers';

const ArticleTemplate = (props) => {
  const [articleName, setArticleName] = useState('');
  const [articleText, setArticleText] = useState('');
  const [articleTags, setArticleTags] = useState([]);

  useEffect(() => {
    const articleDoc = doc(db, 'articles', props.article);
    const getArticleNameAndText = async () => {
      const articleDocSnap = await getDoc(articleDoc);
      if (articleDocSnap.data().text) {
        setArticleText(articleDocSnap.data().text);
      }
      if (articleDocSnap.data().tags.length) {
        setArticleTags(articleDocSnap.data().tags);
      }
      const capitalizedName = props.article
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
      setArticleName(capitalizedName);
    };
    getArticleNameAndText();
  }, [props]);

  function handleArticleText(evt) {
    if (evt.target.value) {
      setArticleText(evt.target.value);
    }
  }
  function handleClick() {
    const articleDoc = doc(db, 'articles', props.article);
    updateDoc(articleDoc, { text: articleText });
  }
  function handleSubmit(evt) {
    evt.preventDefault();
  }
  return (
    <div>
      <h1>{articleName}</h1>
      <p>{articleText}</p>
      <p>Edit the article here!</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={articleText} onChange={handleArticleText} />
        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </form>
      <div>
        {articleTags.includes('gift') ? <GiftUsers gift={props.article} /> : ''}
      </div>
      <h4>Article Tags</h4>
      <ul>
        {articleTags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleTemplate;
