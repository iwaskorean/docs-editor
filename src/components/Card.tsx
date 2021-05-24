import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

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

  const timestampToDate = (timestamp: {
    seconds: number;
    nanoseconds: number;
  }) => {
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDay()}일`;
  };

  doc.timestamp && timestampToDate(doc.timestamp);

  const capitalize = (word: string) => {
    return word && word[0].toUpperCase() + word.slice(1);
  };

  return (
    <div className="card">
      <div className="card__contents">
        <p className="card__contents__title">{doc.title}</p>
        <p className="card__contents__size">Size : {capitalize(doc.size)}</p>
        {doc.timestamp && (
          <p className="card__contents__time">
            {timestampToDate(doc.timestamp)}
          </p>
        )}
      </div>
      <div className="card__buttons">
        <Link to={`/document?id=${doc.id}`}>
          <button className="card__button card__button--select">Select</button>
        </Link>
        <button
          className="card__button card__button--delete"
          onClick={() => handleDelete(doc.id)}
        >
          <img src="./icon-delete.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Card;
