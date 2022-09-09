import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import React, { useEffect, useState, useContext } from 'react';
// import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../helpers/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BlocComments({ value }) {
  console.log(value);

  
  // const { authState } = useContext(AuthContext);
  // let navigate = useNavigate();

//   const clickedComments = () => {
//     GetCommment(1);
//     setShowInput(!showInput);
//   };

  // DELETE request //
  // const deleteComment = (id) => {
  //   axios
  //     .delete(`${process.env.REACT_APP_API_URL}api/comments/delete/${id}`, {
  //       headers: {
  //         authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
  //       },
  //     })
  //     .then(() => {
  //       navigate(`/home`);
  //     });
  // };

  return (
    <>
      
      


      <div className="comments_post_home">
      </div>
    </>
  );
}
export default BlocComments;
