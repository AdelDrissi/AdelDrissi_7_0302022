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
  // console.log(listOfPosts);
  const [listOfComments, setListOfComments] = useState([]);
  const [newComment, setNewcomment] = useState(['']);
  console.log(newComment);
  // console.log(CommentsOne);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const clickedComments = (id) => {
    GetCommment(id);
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
          PostId: id,
          userId: idStorage,
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
          },
        }
      )

      .then((res) => {
        // console.log(res);
        if (res.data.error) {
        } else {
          setNewcomment(() => [res.data.comment]);
         console.log(res.data.comment); 
        }
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
    axios.delete(`${process.env.REACT_APP_API_URL}api/comments/delete/${id}`, {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
      },
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
                  </div>
                </div>
                <div className="comments_post_home">
                  <button onClick={() => clickedComments(value.PostId)}>
                    <CommentIcon />
                  </button>
                </div>
              </div>

              {showInput ? (
                <>
                  {listOfComments.map((CommentsData, key) => {
                    return (
                      <div className="comment_container" key={key}>
                        <div className="comment_content">
                          {CommentsData.comment}
                        </div>
                        <div className="comment_username_button">
                          <p>{CommentsData.User.username}</p>
                          <p>{CommentsData.username}</p>
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

                  <form action="" className="comment-form hidden">
                    <input
                      type="text"
                      name="text"
                      placeholder="Laissez un commentaire..."
                      value={newComment}
                      onChange={(event) => {
                        setNewcomment(event.target.value);
                      }}
                    />
                    <input
                      type="submit"
                      value="envoyer"
                      onClick={createComment}
                      className="input-submit"
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
