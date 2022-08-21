// Importation of the necessary dependencies //
import React, { useContext } from 'react';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import PersonIcon from '@mui/icons-material/Person';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { NavLink } from 'react-router-dom';
import Signout from './Sign/Signout';
import { AuthContext } from '../helpers/authContext';
// Starting point of the Navbar component //
function Navbar() {
  // Declaration of the useState hook //
  const { authState } = useContext(AuthContext);
  const profil = () => {
    window.location = `/user/${authState.id}`;
  };
  const Post = () => {
    window.location.replace(`/post/${authState.id}`);
  };

  const CreatePost = () => {
    window.location.replace(`/post/create`);
  };

  // Virtual DOM //
  return (
    <nav>
      <div className="navbar">
        <div>
          <span className="navbar_welcome">
            Bienvenue {authState.username} !
          </span>
        </div>
        <NavLink to={'/home'} aria-label="retour accueil">
          <AddToHomeScreenIcon
            aria-label="bouton accueil"
            className="navbar_icon"
          />
        </NavLink>
        <PersonIcon
          onClick={profil}
          aria-label="bouton profil"
          className="navbar_icon"
        />
        <LocalPostOfficeIcon
          onClick={Post}
          aria-label="bouton post"
          className="navbar_icon"
        />
        <PostAddIcon
          onClick={CreatePost}
          aria-label="bouton post_create"
          className="navbar_icon"
        />
        <Signout />
      </div>
    </nav>
  );
}
// Exportation of the log Navbar component //
export default Navbar;
