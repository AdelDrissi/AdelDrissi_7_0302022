// Import the necessary dependencies //
import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

// Starting point of the Sign index component //
function Sign(props) {
  // Declare the useState hooks //
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  // Modals toggle system //
  const handleModals = (event) => {
    if (event.target.id === 'signup') {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (event.target.id === 'signin') {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  // Virtual DOM //
  return (
    <div className="sign">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="signup"
            className={signUpModal ? 'active-btn' : null}
          >
            S'inscrire
          </li>
          <br />
          <li
            onClick={handleModals}
            id="signin"
            className={signInModal ? 'active-btn' : null}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <Signup />}
        {signInModal && <Signin />}
      </div>
    </div>
  );
}
// Exportation of the log index component //
export default Sign;
