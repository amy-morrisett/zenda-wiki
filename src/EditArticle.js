import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { updateDoc, doc } from 'firebase/firestore';

const EditArticle = (props) => {
  const [articleName, setArticleName] = useState('');
  const [articleText, setArticleText] = useState('');

  useEffect(() => {
    const getArticleNameAndText = async () => {
      setArticleText(props.text);
      const capitalizedName = props.article
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
      setArticleName(capitalizedName);
    };
    getArticleNameAndText();
  }, [props.text, props.article]);

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
    </div>
  );
};

export default EditArticle;
