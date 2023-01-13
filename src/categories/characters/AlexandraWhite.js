import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import EditArticle from '../../EditArticle';

function AlexandraWhite() {
  const [articleText, setArticleText] = useState('');

  useEffect(() => {
    const articleDoc = doc(db, 'articles', 'Alexandra White');
    const getArticleText = async () => {
      const articleDocSnap = await getDoc(articleDoc);
      if (articleDocSnap.data().text) {
        setArticleText(articleDocSnap.data().text);
      }
    };
    getArticleText();
  }, [articleText]);

  return (
    <div className="AlexandraWhite">
      <EditArticle article="Alexandra White" text={articleText} />
    </div>
  );
}

export default AlexandraWhite;
