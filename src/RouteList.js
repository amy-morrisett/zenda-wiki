import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

import Home from './Home';

import Categories from './Categories';

import Gifts from './categories/Gifts';
import Characters from './categories/Characters';

// import Kani from './categories/gifts/Kani';
// import Enti from './categories/gifts/Enti';
// import AuraSight from './categories/gifts/AuraSight';
// import EmotionPainting from './categories/gifts/EmotionPainting';
// import IcePowers from './categories/gifts/IcePowers';
// import ImageSinging from './categories/gifts/ImageSinging';
// import Koah from './categories/gifts/Koah';
// import Levitation from './categories/gifts/Levitation';
// import PsychicPowers from './categories/gifts/PsychicPowers';
// import SoundPainting from './categories/gifts/SoundPainting';
// import Teaching from './categories/gifts/Teaching';

import Zenda from './categories/characters/Zenda';
import AlexandraWhite from './categories/characters/AlexandraWhite';

import ArticleTemplate from './ArticleTemplate';

function RouteList() {
  //const kani = 'kani';
  const [articleArr, setArticleArr] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    // const giftQuery = query(
    //   articlesRef,
    //   where('tags', 'array-contains', 'gift')
    // );
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

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/gifts" element={<Gifts />} />
        <Route path="/characters" element={<Characters />} />
        {/* <Route path="/gifts/kani" element={<Kani />} /> */}
        {/* <Route path="/gifts/enti" element={<Enti />} />
        <Route path="/gifts/aura-sight" element={<AuraSight />} />
        <Route path="/gifts/emotion-painting" element={<EmotionPainting />} />
        <Route path="/gifts/ice-powers" element={<IcePowers />} />
        <Route path="/gifts/image-singing" element={<ImageSinging />} />
        <Route path="/gifts/koah" element={<Koah />} />
        <Route path="/gifts/levitation" element={<Levitation />} />
        <Route path="/gifts/psychic-powers" element={<PsychicPowers />} />
        <Route path="/gifts/sound-painting" element={<SoundPainting />} />
        <Route path="/gifts/teaching" element={<Teaching />} /> */}

        {articleArr.map((articleName) => (
          <Route
            path={`${articleName}`}
            element={
              <ArticleTemplate article={articleName.split('-').join(' ')} />
            }
          />
        ))}

        {/* <Route path="/gifts/test" element={<ArticleTemplate article={kani} />} /> */}

        <Route path="/characters/zenda" element={<Zenda />} />
        <Route
          path="/characters/alexandra-white"
          element={<AlexandraWhite />}
        />
      </Routes>
    </div>
  );
}

export default RouteList;
