const { Posts, Comments, Likes } = require('../models/modelss');

exports.createPost = (req, res) => {
  let image;
  if (req.body.content === null || !req.body.content) {
    res.status(400).json({ message: 'Content is required.' });
  } else {
    req.file;
    image = `${req.protocol}://${req.get('host')}/image/${req.filename}`;
  }
  const post = req.body;
  post.username = req.body.username;
  post.image = image;
  Posts.create(post)
    .then((post) => {
      res.status(201).json({ message: 'Post created with the ID ' + post.id });
    })
    .catch((error) => {
      res.status(400).json({ error: 'An error has occurred. ' + error });
    });
};

// Find all the post in the posts tables including the Likes and Comments tables //
// Then return status 200 with all the data asked                                //
// If an error occurs, catch it and return status 400 and the error message      //
// Find all the like in the likes tables related to the users                    //
// Then return status 200 with all the data asked                                //
// If an error occurs, catch it and return status 400 and the error message      //
exports.readAllPosts = async (req, res) => {
  try {
    userId = req.params.id;
    const listOfPosts = await Posts.findAll({ as: [Likes, Comments] });
    res.status(200).json({ listOfPosts: listOfPosts });
  } catch (error) {
    res.status(400).json({ error: 'An error has occurred. ' + error });
  }
};

// Get the id from the params of the request                                //
// Find one post of posts tables in the database                            //
// Then return status 200 and the post                                      //
// If an error occurs, catch it and return status 400 and the error message //
exports.readOnePost = (req, res) => {
  PostId = req.params.id;
  Posts.findOne({ where: { PostId: PostId }, as: 'posts' })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({ error: 'An error has occurred. ' + error });
    });
};

// Get the id from the params of the request                                //
// Look for the post in the database by his id                              //
// Update post with the body of the request indicating which by his id      //
// Return status 200 and the confirmation message                           //
// If an error occurs, catch it and return status 400 and the error message //

exports.updatePost = (req, res) => {
  Postid = req.params.id;
  let image;
  if (req.file) {
    Posts.findOne({ where: { Postid: Postid } });
    image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`;
  }
  Posts.findOne({ where: { Postid: Postid } })
    .then(() => {
      Posts.update(
        { ...req.body, image: image },
        { where: { Postid: Postid } }
      );
      res
        .status(200)
        .json({ message: 'Post ID ' + Postid + ' has been updated.' });
    })

    .catch((error) => {
      res.status(400).json({ error: 'An error has occurred. ' + error });
    });
};
// Get  the id from the params of the request                               //
// Look for the post in the database by his id                              //
// Delete the post indicating which by his id                               //
// Return status 200 and the confirmation message                           //
// If an error occurs, catch it and return status 400 and the error message //

exports.deletePost = (req, res) => {
  PostId = req.params.id;
  Posts.destroy({ where: { PostId: PostId } })
    .then(() => {
      res
        .status(200)
        .json({ message: 'Post ID ' + PostId + ' has been deleted.' });
    })
    .catch((error) => res.status(500).json({ error }));
};
