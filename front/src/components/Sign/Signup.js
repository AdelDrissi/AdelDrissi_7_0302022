import React, { useState } from 'react';
import axios from 'axios';

function Signup()  {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ControlPassword, setControlPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const usernameError = document.querySelector('.username.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const passwordConfirmError = document.querySelector(
      '.password-confirm-error'
    );
    const termsError = document.querySelector('.terms.error');

    passwordConfirmError.innerHTML = '';
    termsError.innerHTML = '';

    if (password !== ControlPassword)
      if (password !== ControlPassword)
        passwordConfirmError.innerHTML =
          'les mots de passes ne correspondent pas';
      else {
        await axios({
          method: 'post',
          url: `${process.env.REACT_APP_API_URL}api/sign/signup`,
        })
          .then((res) => {
            console.log(res);
            if (res.data.errors) {
              usernameError.innerHTML = res.data.errors.username;
              emailError.innerHTML = res.data.errors.email;
              passwordError.innerHTML = res.data.errors.password;
            }
          })
          .catch((err) => console.log(err));
      }
  };



  return (
    <form action="" onSubmit={handleRegister} id="signup">
      <label htmlFor="username">Username</label>
      <br />
      <input
        type="text"
        name="username"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
    
      <div className="username error"></div>
      <br />
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="email"
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
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <label htmlFor="confirm-password">Confirmer votre mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password-conf"
        onChange={(e) => setControlPassword(e.target.value)}
        value={ControlPassword}
      />
      <div className="password-confirm-error"></div>
      <br />
      <label id="terms" htmlFor="terms">
        J'accepte les{' '}
        <a href="/" target="_blank" rel="noopener noreferrer">
          {' '}
          Conditions generales
        </a>
      </label>
      <div className="terms error"></div>
      <br />
      <input type="submit" value="Valider l'incriptions" />
    </form>
  );
};


export default Signup;
