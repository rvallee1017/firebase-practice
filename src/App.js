import React from 'react';
import './App.css';
import { auth, db } from './firebase/init.js';
import { collection, addDoc, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  function createPost() {
    const post = {
      title: 'Finish Firebase Practice',
      description: 'This is the description of my first post.',
      uid: user.uid,
    };
    addDoc(collection(db, 'posts'), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, 'posts'));
    const posts = docs.map((elem ) => ({...elem.data(), id: elem.id}));
    console.log(posts);
  }

  async function getPostById(id) {
    const hardCodedId = "HDhAJBDI9ODoPlsuL5jY"; 
    const postRef = doc(db, 'posts', hardCodedId);
    const postSnap = await getDoc(postRef);
    const post = postSnap.data();
    console.log(post);
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    createUserWithEmailAndPassword(auth, 'user@example.com', 'password')
      .then((user) => {
        console.log('User registered:', user);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, 'user@example.com', 'password')
      .then(({user}) => {
        setUser(user);
      })
      .catch((error) => {
        console.error('This password is incorrect or the user does not exist:', error);
      });
  }

  function logout() {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? 'Loading...' : user ? <p>Welcome, {user.email}</p> : <p>Please log in.</p>}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By ID</button>
    </div>
  );
}



export default App;
