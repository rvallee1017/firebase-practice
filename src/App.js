import React from 'react';
import './App.css';
import { auth } from './firebase/init.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

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
    </div>
  );
}



export default App;
