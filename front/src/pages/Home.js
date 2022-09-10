// Imports the necessary dependencies //
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Create from '../components/Post/Create';
import BlocPosts from '../components/BlocPost';
import BlocComments from '../components/BlocComments';
// import { AuthContext } from '../helpers/authContext';

function Home() {
  // Declares useNavigate and useStates hooks //
  let navigate = useNavigate();

  const [listOfPosts, setListOfPosts] = useState([]);
  const [listOfComments, setListOfComments] = useState([]);
  console.log(listOfComments);

  // const [showInput, setShowInput] = useState(false);

  // console.log(showInput);

  // Executes this function immediately when the page the page is opened //
  useEffect(() => {
    // Checks if the user has a valid token before display the page          //
    // If the user do not have a valid token redirects him to the login page //
    // Else display the page                                                 //
    if (!sessionStorage.getItem('JWToken')) {
      navigate('/');
    } else {
      // Makes a GET request to grab all data in the posts table //
      // Checks if the user has a valid token                    //
      // Then returns the lists receveid from the API            //
      axios
        .get(`${process.env.REACT_APP_API_URL}api/posts/readpostall`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
          },
        })
        .then((res) => {
          // console.log(listOfPosts);
          setListOfPosts(res.data.listOfPosts);
        });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GetComment = (id) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/comments/read/commentsToPost/${id}`,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
          },
        }
      )

      .then((res) => {
        console.log(res.data.data);
        setListOfComments(res.data.data);
      });
  };

  // const deletePost = (id) => {
  //   axios
  //     .delete(`${process.env.REACT_APP_API_URL}api/posts/delete/${id}`, {
  //       headers: {
  //         authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
  //       },
  //     })

  //     .then(() => {
  //       navigate('/home');
  //     });
  // };

  // const GetCommment = (id) => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_API_URL}api/comments/read/commentsToPost/${id}`,
  //       {
  //         headers: {
  //           authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
  //         },
  //       }
  //     )

  //     .then((res) => {
  //       setListOfComments(res.data.data);
  //       setCommentsInput(res.data.data);
  //       console.log(res.data.data);
  //     });
  // };

  // const deleteComment = (id) => {
  //   axios.delete(`${process.env.REACT_APP_API_URL}api/comments/delete/${id}`, {
  //     headers: {
  //       authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
  //     },
  //   });
  // };

  //   // Checks if the user has a valid token                                //
  //   // Then returns the response                                           //
  //   // Grabs the post in the posts list                                    //
  //   // If the id of the post is equal to the PostId                        //
  //   // If the post do not have a Like, returns it with only the like added //
  //   // Else if the post has a like, returns it with only the like removed  //

  // Virtual DOM //
  return (
    <div className="page_container">
      <div className="home">
        <Create />
        {listOfPosts.map((value, index) => {
          return <BlocPosts value={value} key={index} />;
        })}
        {listOfComments.map((listOfComments) => {
          return <BlocComments value={listOfComments} />
          
        })}
      </div>
    </div>
  );
}

// Exportation of the Home page //
export default Home;
