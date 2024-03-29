// Imports the necessary dependencies //
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar';
import { Formik, Form, Field } from 'formik';
import { isEmpty } from '../components/Routes/Utils';
import DoneIcon from '@mui/icons-material/Done';
import { AuthContext } from '../helpers/authContext';
function Post() {
  // Declares useParams, useNavigate, useState and useContext hooks //
  let { id } = useParams();
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const [content, setContent] = useState('');
  const [content_posts, setContentPost] = useState('');
  console.log(content_posts);
  const [image, setImage] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewcomment] = useState(['']);
  const [isLoading, setIsLoading] = useState(true);

  // Declaration of the initial values ​​of the form //
  const initialValues = {
    content: `${content}`,
  };

  // Executes this function immediately when the page the page is opened //
  useEffect(() => {
    // Makes GET request to get the post by is id //
    if (!sessionStorage.getItem('JWToken')) {
      window.location.replace(`/`);
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/posts/readOne/${id}`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
          },
        })
        .then((res) => {
          setPost(res.data);
          // console.log(res.data);
          setContent(res.data.content);
          setImage(res.data.image);
        });
      axios.get(`${process.env.REACT_APP_API_URL}api/comments/read/${id}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
        },
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    !isEmpty(post.image) && setIsLoading(false);
  }, [post]);

  // PUT request //

  const handleUpdatePostText = (data) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}api/posts/updatePost/${id}`, data, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
        },
      })
      .then((res) => {
        setContent(res.data.content);
        window.location.reload(`/post/${id}`);
      });
  };

  // PUT request IMAGE //
  const updateImage = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('image', image);
    axios
      .put(`${process.env.REACT_APP_API_URL}api/posts/updatePost/${id}`, data, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then(() => {
        window.location.reload(`/post/${id}`);
      });
  };

  // Makes a DELETE request to delete the post        //
  // Checks if the user has a valid token             //
  // Redirects to the Home page after deleting a post //
  const deletePost = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/posts/delete/${id}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('JWToken')}`,
        },
      })
      .then(() => {
        navigate('/home');
      });
  };
  // Makes a POST request to add a new comment to this post //
  // Checks if the user has a valid token                   //
  // Returns the response as a new comment                  //

  const userIdStorage = sessionStorage.getItem('userId');
  const idStorage = JSON.parse(userIdStorage);

  useEffect(() => {}, []);
  const createComment = (event) => {
    event.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/comments`,
        {
          comment: newComment,
          PostId: id,
          userId: idStorage,
          content: content,
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
          setComments(() => [res.data.comment]);
        }
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

  // Virtual DOM //
  return (
    <div className="page_container">
      <Navbar />
      <div className="post_container">
        <div className="post">
          {(authState.id === post.userId || authState.isAdmin) && <></>}
          {
            <>
              <div className="post_content">
                <Formik initialValues={initialValues}>
                  <Form>
                    <Field
                      as="textarea"
                      aria-label="content"
                      name="content_post"
                      className="content_posts"
                      placeholder={post.content}
                      autoComplete="off"
                      onChange={(event) => {
                        setContentPost(event.target.value);
                      }}
                    />
                    <button
                      type="submit"
                      aria-label="modifier"
                      className="button-done"
                    >
                      <DoneIcon />
                    </button>
                  </Form>
                </Formik>
              </div>
              <div className="post_image">
                {post.image && (
                  <>
                    <img src={post.image} alt="illustration du post" />
                  </>
                )}
              </div>
            </>
          }
          {isLoading ? (
            ''
          ) : (
            <>
              <Formik
                initialValues={initialValues}
                onSubmit={handleUpdatePostText}
              >
                <Form className="create_form">
                  <Field
                    as="textarea"
                    aria-label="modifiez votre publication"
                    name="content"
                    placeholder={post.content}
                    autoComplete="off"
                  />
                  <button
                    className="create_button"
                    type="submit"
                    aria-label="valider"
                  >
                    Modifiez votre publication
                  </button>
                </Form>
              </Formik>
              <form className="create_form" onSubmit={updateImage}>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept=".jpeg, .jpg, .png, .gif, .webp"
                  onChange={(event) => setImage(event.target.files[0])}
                  aria-label="ajouter une image"
                />
                <br />
                <button
                  className="create_button"
                  type="submit"
                  aria-label="valider"
                >
                  Modifiez votre image
                </button>
              </form>

              <div className="post_image">{post.image && <></>}</div>
            </>
          )}
          <div className="post_footer">
            <div
              className="post_username"
              onClick={() => {
                navigate(`/user/${post.username}`);
              }}
            >
              <p>{post.username}</p>
            </div>
            {(authState.id === post.userId || authState.isAdmin) && (
              <>
                <button className="post_delete">
                  <DeleteIcon
                    className="post_button_delete"
                    onClick={() => {
                      deletePost(post.PostId);
                    }}
                  />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="commment_container">
          <form className="comment_form">
            <textarea
              name="comment"
              id="comment"
              aria-label="votre commentaire"
              placeholder="Votre commentaire"
              autoComplete="off"
              value={newComment}
              onChange={(event) => {
                setNewcomment(event.target.value);
              }}
            />
            <button aria-label="valider" onClick={createComment}>
              <DoneIcon aria-label="valider" />
            </button>
          </form>
        </div>
        <div className="comment_list">
          {comments.map((comment, key) => {
            return (
              <div className="comment_container" key={key}>
                <div className="comment_content">{comment.comment}</div>
                <div className="comment_username_button">
                  <p>{comment.username}</p>
                  {(authState.username !== comment.username && (
                    <>
                      <button
                        className="comment_delete_button"
                        aria-label="supprimer le commentaire"
                        onClick={() => {
                          deleteComment(comment.CommentsId);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </>
                  )) ||
                    (authState.isAdmin === true && (
                      <>
                        <button
                          className="comment_delete_button"
                          aria-label="supprimer le commentaire"
                          onClick={() => {
                            deleteComment(comment.CommentsId);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Exportation of the Post page //
export default Post;
