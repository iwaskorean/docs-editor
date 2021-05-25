import Card from './Card';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

const Main = () => {
  const [docs, setDocs] = useState<firebase.firestore.DocumentData[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unmounted = false;

    !unmounted &&
      firebase
        .firestore()
        .collection('docs')
        .onSnapshot((serverUpdate) => {
          const docsFromDB = serverUpdate.docs.map((doc) => {
            const data = doc.data();
            data['id'] = doc.id;
            return data;
          });
          setDocs(docsFromDB);
          setLoading(false);
        });

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div className="main">
      <div className="menu--social icon--github">
        <a
          href="https://github.com/SewookHan/docs-editor"
          target="_blank"
          rel="noreferrer"
        >
          <img src="./icon--github.png" alt="" />
        </a>
      </div>
      <header className="main__heading">Document Editor</header>
      <p className="main__text">Select a document</p>
      {loading ? (
        <div className="main__loading">
          <p>Loading ...</p>
        </div>
      ) : (
        <div className="main__cards">
          {docs &&
            docs
              ?.sort((a, b) => b.timestamp - a.timestamp)
              .map((doc) => {
                return (
                  <Card key={doc.id} docs={docs} doc={doc} setDocs={setDocs} />
                );
              })}
        </div>
      )}
      <Link to="/create">
        <button className="main__button--create">Create New Document</button>
      </Link>
    </div>
  );
};

export default Main;
