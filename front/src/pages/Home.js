// Imports the necessary dependencies //
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment';
import Create from '../components/Post/Create';
import Navbar from '../components/Navbar';
function Home() {
  // Declares useNavigate and useStates hooks //
  let navigate = useNavigate();
  const [listOfPosts, setListOfPosts] = useState([]);
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
          setListOfPosts(res.data.listOfPosts);
        });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Checks if the user has a valid token                                //
  // Then returns the response                                           //
  // Grabs the post in the posts list                                    //
  // If the id of the post is equal to the PostId                        //
  // If the post do not have a Like, returns it with only the like added //
  // Else if the post has a like, returns it with only the like removed  //

  // Virtual DOM //
  return (
    <div className="page_container">
      <Navbar />
      <div className="home">
        <Create />
        <div className="home_posts">
          {listOfPosts.map((value, key) => {
            return (
              <div className="home_post" key={key}>
                <div className="home_post_content" onClick={() => {}}>
                  {value.content}
                </div>
                <div className="home_post_image" onClick={() => {}}>
                  {value.image && (
                    <>
                      <img src={value.image} alt="illustration du post" />
                    </>
                  )}
                </div>
                <div className="home_post_footer">
                  <div className="home_post_username">
                    <p>{value.User.username}</p>
                  </div>
                  <div
                    onClick={() => {
                      navigate(`/post/${value.id}`);
                    }}
                  >
                    <CommentIcon className="home_post_comment" />
                  </div>
                  <div className="home_post_buttons"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Exportation of the Home page //
export default Home;
