import { Link } from 'react-router-dom';
import firebase from 'firebase';

interface CardProps {
  docs: firebase.firestore.DocumentData[];
  doc: firebase.firestore.DocumentData;
  setDocs: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData[] | undefined>
  >;
}

const Card: React.FC<CardProps> = ({ docs, doc, setDocs }) => {
  const handleDelete = (id: string) => {
    setDocs(docs?.filter((doc) => doc.id !== id));
    firebase.firestore().collection('docs').doc(id).delete();
  };

  return (
    <div>
      <Link to={`/document?id=${doc.id}`}>
        <div>
          <h2>{doc.title}</h2>
          <h4>{doc.size}</h4>
        </div>
      </Link>
      <button onClick={() => handleDelete(doc.id)}>Delete</button>
    </div>
  );
};

export default Card;
