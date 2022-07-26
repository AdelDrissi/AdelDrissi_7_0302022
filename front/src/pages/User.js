// Imports the necessary dependencies //
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Starting point of the User page //
function User() {
  // Declaration of the hook //

  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  let { id } = useParams();

  // Execute this function immediately when the page is opened //

  useEffect(() => {
    if (!sessionStorage.getItem('JWToken')) {
      window.location.replace(`/`);
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${id}`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
          },
        })
        .then((res) => {
          setUsername(res.data.username);
          setImage(res.data.image);
        });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Virtual DOM //

  return (
    <div className="user">
      <Navbar />
      <div className="user_profile">
        <div className="user_leftside">
          <div className="user_image">
            <img src={image} alt="profil"  />
          </div>
        </div>
        <div className="user_rightside">
          <h1>Profil de {username}</h1>
          <div className="user_email_password"></div>
        </div>
      </div>
    </div>
  );
}
// Exportation of the User page //

export default User;
