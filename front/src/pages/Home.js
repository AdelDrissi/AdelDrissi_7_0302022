import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../helpers/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import Create from '../components/Post/Create';
import axios from 'axios';

function Home() {
  let { id } = useParams();
  const [showInput, setShowInput] = useState(false);
  const [listOfPosts, setListOfPosts] = useState([]);
  let [listOfComments, setListOfComments] = useState([]);
  const { authState } = useContext(AuthContext);
  const [newComment, setNewcomment] = useState(['']);
  let navigate = useNavigate();

  const clickedComments = (id) => {
    GetCommment(id);
    setShowInput(!showInput);

    document.getElementById('form');
  };

  // Declaration of the initial values ​​of the form //

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
        setListOfComments(res.data.data);
        console.log(res.data.data);
      });
  };

  const userIdStorage = sessionStorage.getItem('userId');
  const idStorage = JSON.parse(userIdStorage);

  const createComment = (event) => {
    event.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/comments`,
        {
          comment: newComment,
          userId: idStorage,
          PostId: event.target.id,
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
          },
        }
      )

      .then((res) => {
        if (res.data.error) {
        } else {
          setNewcomment(() => [res.data.comment]);
        }
      });
    GetCommment(event.target.id);
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
    axios.delete(`${process.env.REACT_APP_API_URL}api/comments/delete/${id}`, {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
      },
    });
  };

  const updateContent = (data, postId) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}api/posts/updatePost/${id}`, data, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
        },
      })

      .then(() => {
        navigate(`/post/${postId}`);
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
                <div
                  className="home_post_content"
                  onClick={() => {
                    updateContent(value.content, value.PostId);
                  }}
                >
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
                </div>

                <div className="comments_post_home">
                  <button
                    className="button_comment"
                    onClick={() => clickedComments(value.PostId)}
                  >
                    <CommentIcon />
                  </button>
                </div>
              </div>

              {showInput ? (
                <>
                  {listOfComments
                    .filter((comment) => comment.PostId === value.PostId)
                    .map((CommentsData, key) => {
                      return (
                        <div className="comment_container" key={key}>
                          <div className="comment_content">
                            {CommentsData.comment}
                          </div>
                          <div className="comment_username_button">
                            <p>{CommentsData.User.username}</p>
                            {(authState.username !== CommentsData.username && (
                              <>
                                <button
                                  className="comment_delete_button"
                                  aria-label="supprimer un commentaire"
                                  onClick={() => {
                                    deleteComment(CommentsData.CommentsId);
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
                      onChange={(event) => {
                        setNewcomment(event.target.value);
                      }}
                    />
                    <input
                      type="submit"
                      value="envoyer"
                      onClick={createComment}
                      className="input-submit"
                      id={value.PostId}
                    />
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
