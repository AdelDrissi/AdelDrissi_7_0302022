import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const User = () => {
  const [username, setUsername] = useState('');
  let { id } = useParams();

  useEffect(() => {
    if (!sessionStorage.getItem('JWToken')) {
      window.location.replace(`/`);
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${id}`, {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        })
        .then((res) => {
          setUsername(res.data.username);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Virtual DOM //

  return (
    <div className="user">
      <div className="user_profile">
        <div className="user_leftside">
          <div className="user_image"></div>
        </div>
        <div className="user_rightside">
          <h1>Profil de {username}</h1>

          <div className="user_email_password"></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

// Exportation of the User page //

export default User;
