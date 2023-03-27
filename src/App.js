import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAkmpKhps_dcyDU1j0X-ECco--viRr-MtE",
  authDomain: "wififorall-74647.firebaseapp.com",
  projectId: "wififorall-74647",
  storageBucket: "wififorall-74647.appspot.com",
  messagingSenderId: "707530479580",
  appId: "1:707530479580:web:11538bc7116b3fd2cb2119",
  measurementId: "G-W5T9PF3716"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); // inicializa o Firestore

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let userCredential;
      if (isNewUser) {
        userCredential = await auth.createUserWithEmailAndPassword(email, password);
      } else {
        userCredential = await auth.signInWithEmailAndPassword(email, password);
      }
      
      await userCredential.user.updateProfile({
        displayName: username
      });
      
      // adiciona os dados do usuário e e-mail no Firestore
      await db.collection('users').add({
        username: username,
        email: email
      });
      
      window.close();
    } catch (error) {
      console.error(error);
    }
  };

  const isNewUser = true;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        E-mail:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Senha:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {isNewUser && (
        <label>
          confirme a senha:
          <input type="password" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
      )}
      <button type="submit">{isNewUser ? 'Registrar' : 'Entrar'}</button>
    </form>
  );
};

export default Login;