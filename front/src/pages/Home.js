import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../helpers/authContext';
import { useNavigate } from 'react-router-dom';
import Create from '../components/Post/Create';
import axios from 'axios';

function Home() {
  const [showInput, setShowInput] = useState(false);
  // console.log(showInput);
  const [CommentsOne, setCommentsInput] = useState();
  const [listOfPosts, setListOfPosts] = useState([]);
  // console.log(listOfPosts);
  const [listOfComments, setListOfComments] = useState([]);
  // console.log(listOfComments);
  // console.log(CommentsOne);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const clickedComments = () => {
    GetCommment(1);
    setShowInput(!showInput);
  };

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

  const GetCommment = (id) => {
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
        setCommentsInput(res.data.data);
        console.log(res.data.data);
      });
  };

  const deletePost = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}api/posts/delete/${id}`, {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
      },
    });
  };

  // DELETE request //
  const deleteComment = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/comments/delete/${id}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
        },
      })
      .then(() => {
        navigate(`/home`);
      });
  };

  return (
    <>
      <Create />
      <div className="home_posts">
        {listOfPosts.map((value, key) => {
          return (
            <>
              <div className="home_post" key={key}>
                <div className="home_post_content" onClick={() => {}}>
                  {value.content}
                  <button aria-label="modifier" className="post_button_edit">
                    <EditIcon />
                  </button>
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

                  <div className="home_post_buttons">
                    {(authState.id === value.userId || authState.isAdmin) && (
                      <>
                        <button className="post_button">
                          <DeleteIcon
                            className="post_button_delete"
                            onClick={() => {
                              deletePost(value.PostId);
                            }}
                          />
                        </button>
                      </>
                    )}
                    ||
                  </div>
                </div>
                <div className="comments_post_home">
                  <button onClick={() => clickedComments()}>
                    <CommentIcon />
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowInput(true);
                }}
              ></button>
              {showInput ? (
                <>
                  {listOfComments.map((CommentsOne, key) => {
                    return (
                      <div className="comment_container" key={key}>
                        <div className="comment_content">
                          {CommentsOne.comment}
                        </div>

                        <div className="comment_username_button">
                          <p>{CommentsOne.user.comment}</p>
                          <p>{CommentsOne.username}</p>
                          {(authState.username !== CommentsOne.username && (
                            <>
                              <button
                                className="comment_delete_button"
                                aria-label="supprimer un commentaire"
                                onClick={() => {
                                  deleteComment(CommentsOne.PostId);
                                }}
                              >
                                <DeleteIcon />
                              </button>
                            </>
                          )) ||
                            (authState.isAdmin === true && (
                              <>
                                <button
                                  className="home_post_comment"
                                  aria-label="ajouter un  commentaire"
                                ></button>
                              </>
                            ))}
                        </div>
                      </div>
                    );
                  })}

                  <form action="" className="comment-form">
                    <input
                      type="text"
                      name="text"
                      placeholder="Laissez un commentaire..."
                    />
                    <input type="submit" value="envoyer" />
                  </form>
                </>
              ) : (
                ''
              )}
            </>
          );
        })}
      </div>
    </>
  );
}

export default Home;
