import React, { useState } from 'react';
import Signup from './Signup';
import Signin from './Signin';

const Sign = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === 'signup') {
      setSignUpModal(false);
      setSignInModal(true);
    } else if (e.target.id === 'signin') {
      setSignInModal(false);
      setSignUpModal(true);
    }
  };

  return (
    <div className="sign">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals} 
            id="signup"
            className={signUpModal ? 'active-btn' : null}
          >
            Se connecter 
          </li>
          <li
            onClick={handleModals}
            id="signin"
            className={signInModal ? 'active-btn' : null}
          >
            S'inscrire
          </li>
        </ul>
        {signUpModal && <Signup />}
        {signInModal && <Signin />}
      </div>
    </div>
  );
};

export default Sign;
