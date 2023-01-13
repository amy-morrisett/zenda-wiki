import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Characters() {
  const [charArr, setCharArr] = useState([]);

  const [azureblueResArr, setAzureblueResArr] = useState([]);
  const [crystallinResArr, setCrystallinResArr] = useState([]);

  const [cobaltGirlsStudentArr, setCobaltGirlsStudentArr] = useState([]);
  const [cobaltGirlsTeacherArr, setCobaltGirlsTeacherArr] = useState([]);
  const [cobaltBoysStudentArr, setCobaltBoysStudentArr] = useState([]);
  const [cobaltBoysTeacherArr, setCobaltBoysTeacherArr] = useState([]);
  const [auroraStudentArr, setAuroraStudentArr] = useState([]);
  const [auroraTeacherArr, setAuroraTeacherArr] = useState([]);

  const [zendasFamArr, setZendasFamArr] = useState([]);

  function renameArticles(
    initialArticleArr,
    finalArticleArr,
    stateSettingFunc
  ) {
    initialArticleArr.forEach((doc) => {
      let docNameArr = doc.id.split(' ');
      if (docNameArr.length > 1) {
        finalArticleArr.push(docNameArr.join('-'));
      } else {
        finalArticleArr.push(doc.id);
      }
    });
    stateSettingFunc(finalArticleArr);
  }

  useEffect(() => {
    const articlesRef = collection(db, 'articles');

    const q = query(articlesRef, where('tags', 'array-contains', 'character'));

    const azureblueResQ = query(
      articlesRef,
      where('tags', 'array-contains', 'Azureblue resident')
    );
    const crystallinResQ = query(
      articlesRef,
      where('tags', 'array-contains', 'Crystallin resident')
    );

    const cobaltGirlsStudentQ = query(
      articlesRef,
      where('tags', 'array-contains', 'Cobalt School for Girls student')
    );
    const cobaltGirlsTeacherQ = query(
      articlesRef,
      where('tags', 'array-contains', 'Cobalt School for Girls teacher')
    );
    const cobaltBoysStudentQ = query(
      articlesRef,
      where('tags', 'array-contains', 'Cobalt School for Boys student')
    );
    const cobaltBoysTeacherQ = query(
      articlesRef,
      where('tags', 'array-contains', 'Cobalt School for Boys teacher')
    );
    const auroraStudentQ = query(
      articlesRef,
      where('tags', 'array-contains', 'Aurora Academy student')
    );
    const auroraTeacherQ = query(
      articlesRef,
      where('tags', 'array-contains', 'Aurora Academy teacher')
    );

    const zendasFamQ = query(
      articlesRef,
      where('tags', 'array-contains', "Zenda's family")
    );

    const getCharArrs = async () => {
      const querySnap = await getDocs(q);

      const azureblueResSnap = await getDocs(azureblueResQ);
      const crystallinResSnap = await getDocs(crystallinResQ);

      const cobaltGirlsStudentSnap = await getDocs(cobaltGirlsStudentQ);
      const cobaltGirlsTeacherSnap = await getDocs(cobaltGirlsTeacherQ);
      const cobaltBoysStudentSnap = await getDocs(cobaltBoysStudentQ);
      const cobaltBoysTeacherSnap = await getDocs(cobaltBoysTeacherQ);
      const auroraStudentSnap = await getDocs(auroraStudentQ);
      const auroraTeacherSnap = await getDocs(auroraTeacherQ);

      const zendasFamSnap = await getDocs(zendasFamQ);

      let allChars = [];

      let azureblueRes = [];
      let crystallinRes = [];

      let cobaltGirlsStudents = [];
      let cobaltGirlsTeachers = [];
      let cobaltBoysStudents = [];
      let cobaltBoysTeachers = [];
      let auroraStudents = [];
      let auroraTeachers = [];

      let zendasFam = [];

      renameArticles(querySnap, allChars, setCharArr);

      renameArticles(azureblueResSnap, azureblueRes, setAzureblueResArr);
      renameArticles(crystallinResSnap, crystallinRes, setCrystallinResArr);

      renameArticles(
        cobaltGirlsStudentSnap,
        cobaltGirlsStudents,
        setCobaltGirlsStudentArr
      );
      renameArticles(
        cobaltGirlsTeacherSnap,
        cobaltGirlsTeachers,
        setCobaltGirlsTeacherArr
      );
      renameArticles(
        cobaltBoysStudentSnap,
        cobaltBoysStudents,
        setCobaltBoysStudentArr
      );
      renameArticles(
        cobaltBoysTeacherSnap,
        cobaltBoysTeachers,
        setCobaltBoysTeacherArr
      );
      renameArticles(auroraStudentSnap, auroraStudents, setAuroraStudentArr);
      renameArticles(auroraTeacherSnap, auroraTeachers, setAuroraTeacherArr);

      renameArticles(zendasFamSnap, zendasFam, setZendasFamArr);

      // querySnap.forEach((doc) => {
      //   let docNameArr = doc.id.split(' ');
      //   if (docNameArr.length > 1) {
      //     allChars.push(docNameArr.join('-'));
      //   } else {
      //     allChars.push(doc.id);
      //   }
      // });
      // setCharArr(allChars);
    };
    getCharArrs();
  }, []);

  return (
    <div className="Characters">
      <h1>Characters</h1>
      <h3>All Characters</h3>
      <ul>
        {charArr.map((char) => (
          <li key={char}>
            <Link to={`/${char}`}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
      <h3>Azureblue Residents</h3>
      <ul>
        {azureblueResArr.map((char) => (
          <li key={char}>
            <Link to={`/${char}`}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
      <h3>Crystallin Residents</h3>
      <ul>
        {crystallinResArr.map((char) => (
          <li key={char}>
            <Link to={`/${char}`}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
      <h3>Cobalt School for Girls Students</h3>
      <ul>
        {cobaltGirlsStudentArr.map((char) => (
          <li key={char}>
            <Link to={`/${char}`}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
      <h3>Cobalt School for Girls Teachers</h3>
      <ul>
        {cobaltGirlsTeacherArr.map((char) => (
          <li key={char}>
            <Link to={`/${char}`}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
      <h3>Cobalt School for Boys Students</h3>
      <ul>
        {cobaltBoysStudentArr.map((char) => (
          <li key={char}>
            <Link to={`/${char}`}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
      <h3>Cobalt School for Boys Teachers</h3>
      <ul>
        {cobaltBoysTeacherArr.map((char) => (
          <li key={char}>
            <Link to={`/${char}`}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
      <h3>Aurora Academy Students</h3>
      <ul>
        {auroraStudentArr.map((char) => (
          <li key={char}>
            <Link to={`/${char}`}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
      <h3>Aurora Academy Teachers</h3>
      <ul>
        {auroraTeacherArr.map((char) => (
          <li key={char}>
            <Link to={`/${char}`}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
      <h3>Zenda's Family</h3>
      <ul>
        {zendasFamArr.map((char) => (
          <li key={char}>
            <Link to={`/${char}`}>{char.split('-').join(' ')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Characters;
