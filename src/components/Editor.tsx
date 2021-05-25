import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
import firebase from 'firebase/app';

import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    ['image', 'blockquote', 'code-block'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const Document = ({ location }: RouteComponentProps) => {
  const [docId, setDocId] = useState<string | string[] | null>();
  const [doc, setDoc] = useState<firebase.firestore.DocumentData>();
  const [text, setText] = useState<string>();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const { id } = queryString.parse(location.search);
    setDocId(id);
  }, [location.search, docId]);

  useEffect(() => {
    if (docId) {
      firebase
        .firestore()
        .collection('docs')
        .doc(docId?.toString())
        .onSnapshot((doc) => {
          setDoc(doc.data());
        });
    }
  }, [docId]);

  useEffect(() => {
    setText(doc?.body);
  }, [doc]);

  const updateBody = () => {
    firebase.firestore().collection('docs').doc(docId?.toString()).update({
      body: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="editor">
      <div className="editor__button--menu button--menu" onClick={handleMenu}>
        <img className="icon--rightarrow" src="./icon--rightarrow.png" alt="" />
      </div>
      <div
        className={`editor__menu menu ${menu && 'active'}`}
        onClick={handleMenu}
      >
        <p>Current Document</p>
        <p>‣ Title : {doc?.title}</p>
        <p>‣ Size : {doc?.size}</p>
        <img
          className="icon--leftarrow"
          src="./icon--rightarrow.png"
          alt=""
          onClick={handleMenu}
        />
        <button
          className="button--save mg-top"
          onClick={() => {
            updateBody();
            handleMenu();
          }}
        >
          Save
        </button>
        <Link to="/">
          <button className="button--save">Return to main page</button>
        </Link>
      </div>
      {doc && (
        <>
          <ReactQuill
            className={`edtior__container container ${doc.size}`}
            theme="snow"
            modules={modules}
            formats={formats}
            value={text}
            onChange={(value) => setText(value)}
          />
        </>
      )}
    </div>
  );
};

export default Document;
