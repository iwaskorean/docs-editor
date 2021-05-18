import Card from './Card';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

const Main = () => {
  const [docs, setDocs] = useState<firebase.firestore.DocumentData[]>();

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
        });

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div>
      <h2>Main</h2>
      <br />
      {docs &&
        docs
          ?.sort((a, b) => b.timestamp - a.timestamp)
          .map((doc) => {
            return (
              <Card key={doc.id} docs={docs} doc={doc} setDocs={setDocs} />
            );
          })}
      <Link to="/create">
        <button>Create</button>
      </Link>
      <br />
    </div>
  );
};

export default Main;
