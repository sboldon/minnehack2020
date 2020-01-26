import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import base from '../models/base';

export default function Login(props) {
  const blankFormContent = {
    email: '',
    password: ''
  }

  const [account, setAccount] = useState(blankFormContent);

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value })
  }

  const signIn = (e) => {
    e.preventDefault();
    base.auth().signInWithEmailAndPassword(account.email, account.password).then((u)=>{
      props.handleSuccess(true);
      setAccount(blankFormContent);
    }).catch((error) => {
        console.log(error);
      });
    console.log(account);
   
  }
  
  const signUp = (e) => {
    e.preventDefault();
    base.auth().createUserWithEmailAndPassword(account.email, account.password).then((u)=>{
      props.handleSuccess(true);
      setAccount(blankFormContent);
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
      })
  }

  return (
    <main>
      <section>
        <div>
            <header><h1>Sign In</h1></header>
            <form onSubmit={signIn}>
            <label htmlFor="email">
              Email address
              <input 
                value={account.email} 
                onChange={handleChange} 
                type="email" 
                name="email" 
                aria-describedby="emailHelp" 
                placeholder="example@gmail.com" 
              />
            </label>
            <label htmlFor="password" className="password-box">
              Password
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={account.password}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Sign In</button>
            <button onClick={signUp}>Sign Up</button>
            </form>
        </div>
      </section>
    </main>
  )
}


