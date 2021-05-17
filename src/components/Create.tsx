import { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

const Create = () => {
  const [title, setTitle] = useState('');
  const [size, setSize] = useState('');

  const createDoc = async (title: string) => {
    await firebase.firestore().collection('docs').add({
      title: title,
      body: '',
      size: size.toLowerCase(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <div className="create">
      <header className="create__heading">Create a document</header>
      <div className="create__form">
        <div className="create__form__input">
          <p>Title : </p>
          <input
            placeholder="document title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="create__form__input">
          <p>Size : </p>
          <label>
            <input
              placeholder="paper size"
              type="radio"
              name="size"
              value="A4"
              onChange={(e) => setSize(e.target.value)}
            />
            A4
          </label>
          <label>
            <input
              placeholder="paper size"
              type="radio"
              name="size"
              value="Letter"
              onChange={(e) => setSize(e.target.value)}
            />
            Letter
          </label>
        </div>
        <Link to={`/`}>
          <button
            className="create__form__button button"
            onClick={() => createDoc(title)}
          >
            Create
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Create;
