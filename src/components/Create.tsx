import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

const Create = () => {
  const [title, setTitle] = useState('');
  const [size, setSize] = useState('');
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    return () => {
      setAlert(false);
    };
  }, []);

  const createDoc = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!title || !size) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1500);
      e.preventDefault();
    } else {
      await firebase.firestore().collection('docs').add({
        title: title,
        body: '',
        size: size.toLowerCase(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return (
    <div className="wrapper--create">
      <div className="create">
        <header className="create__heading">Create a document</header>
        <div className="create__form">
          <div className="create__form__input">
            <p>Title : </p>
            <input
              className="input--text"
              placeholder="document title ..."
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="create__form__input">
            <p>Size : </p>
            <label>
              <input
                placeholder="paper size"
                className="input--radio"
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
                className="input--radio"
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
              onClick={(e) => createDoc(e)}
            >
              Create
            </button>
          </Link>
          <Link to={`/`}>
            <button className="create__form__button button">Cancel</button>
          </Link>
        </div>
        <p className={`alert alert--${alert}`}>
          Title and Size are required ...
        </p>
      </div>
      <div className="paper">
        {!size && <p className="paper__text">Choose the paper size...</p>}
        <div className={`paper__content a4 ${size === 'A4' && 'active'}`}>
          <p>A4</p>
          <p>210mm x 297mm</p>
          <p>8.27in x 1169in</p>
        </div>
        <div
          className={`paper__content letter ${size === 'Letter' && 'active'}`}
        >
          <p>Letter</p>
          <p>215.9mm x 279.4mm</p>
          <p>8.5in x 11in</p>
        </div>
      </div>
    </div>
  );
};

export default Create;
