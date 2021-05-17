import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router';
import 'quill/dist/quill.snow.css';
import firebase from 'firebase';
import ReactQuill from 'react-quill';
import './styles.css';

// const TOOLBAR_OPTIONS = [
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],
//   [{ font: [] }],
//   [{ list: 'ordered' }, { list: 'bullet' }],
//   ['bold', 'italic', 'underline'],
//   [{ color: [] }, { background: [] }],
//   [{ script: 'sub' }, { script: 'super' }],
//   [{ align: [] }],
//   ['image', 'blockquote', 'code-block'],
//   ['clean'],
// ];

const Document = ({ location }: RouteComponentProps) => {
  const [docId, setDocId] = useState<string | string[] | null>();
  const [doc, setDoc] = useState<firebase.firestore.DocumentData>();
  const [text, setText] = useState<string>();

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
          console.log(doc.data());
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

  return (
    <div>
      {doc && (
        <>
          <ReactQuill
            className="container"
            theme="snow"
            // modules={TOOLBAR_OPTIONS}
            value={text}
            onChange={(value) => setText(value)}
          />
          <button onClick={() => updateBody()}>save</button>
        </>
      )}
    </div>
  );
};

export default Document;
