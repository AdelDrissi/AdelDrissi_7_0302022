import React, { useState } from 'react';
import axios from 'axios';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/sign/signin`,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          sessionStorage.setItem('JWToken', res.data.token);
          sessionStorage.setItem('userId', res.data.id);
          window.location = '/home';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleLogin} className="sign-in-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        placeholder="Votre adresse mail"
        type="text"
        required="Veuillez rensiegner ce champs"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        placeholder="Votre mot de passe"
        type="password"
        required="Veuillez renseigner ce champs"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
}

export default SignIn;
