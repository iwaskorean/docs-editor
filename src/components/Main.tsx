import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

const Main: React.FC = () => {
  const [docs, setDocs] = useState<firebase.firestore.DocumentData[]>();

  useEffect(() => {
    firebase
      .firestore()
      .collection('docs')
      .onSnapshot((serverUpdate) => {
        const docsFromDB = serverUpdate.docs.map((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });
        console.log(docsFromDB);
        setDocs(docsFromDB);
      });
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
              <Link to={`/document?id=${doc.id}`} key={doc.id}>
                <div>
                  <h2>{doc.title}</h2>
                  <h3>{doc.body}</h3>
                  <h4>{doc.size}</h4>
                </div>
              </Link>
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
