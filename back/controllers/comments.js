const { Comments, Users } = require('../models');
// Controllers (arranged in the order following the C.R.U.D) //

// If comment is equal to null or if there is no content in the resquest    //
// Return status 400 and the error message                                  //
// Else get the comment from the body of the request                        //
// Then return status 201 and the confirmation message                      //
// If an error occurs, catch it and return status 400 and the error message //
exports.createComment = (req, res) => {
  // console.log(req.body);
  // console.log(req);
  if (req.body.comment === null || !req.body.comment) {
    res.status(400).json({ message: 'Comment is required.' });
  } else {
    const comment = req.body.comment;
    // console.log(req.body.comment);
    const userId = req.body.userId;
    // console.log(req.body.userId);
    const Content = req.body.content;
    const PostId = req.body.PostId;
    Comments.create({
      comment: comment,
      userId: userId,
      PostId: Number(PostId),
      content: Content,
    })
      .then((comment) => {
        console.log(comment);
        res
          .status(201)
          .json({ message: 'commentaire créé', comment: comment.dataValues });
      })
      .catch((error) => {
        res.status(400).json({ error: 'An error has occurred. ' + error });
      });
  }
};

exports.GetComment = (req, res) => {
  try {
    const IdPost = req.params.id;
    Comments.findAll({
      where: { PostId: IdPost },
      include: [
        // { model: Posts, attributes: ['PostId'] },
        // { model: Comments, attributes: ['comment'] },
        { model: Users, attributes: ['username'] },
      ],
    })
      .then((Comments) =>
        res.json({
          data: Comments,
        })
      )
      .catch((err) =>
        res.status(500).json({
          error: err,
        })
      );
  } catch (error) {
    res.status(400).json({ error: 'An error has occurred. ' + error });
  }
};

exports.readComment = async (req, res) => {
  const CommentsId = req.params.id;
  const comment = await Comments.findOne({
    where: { CommentsId: CommentsId },
  });
  res.status(200).json(comment);
};

exports.updateComment = async (req, res) => {
  const CommentsId = req.params.id;
  Comments.findOne({ where: { CommentsId: CommentsId } })
    .then(() => {
      Comments.update({ ...req.body }, { where: { CommentsId: CommentsId } });
      res
        .status(200)
        .json({ message: 'Comment ID ' + CommentsId + ' has been updated.' });
    })
    .catch(() => {
      res.status(400).json({ error: 'An error has occurred. ' });
    });
};
// Get the id from the params of the request                                //
// Look for the comment in the database by his id                           //
// Delete the comment indicating which by his id                            //
// Return status 200 and the confirmation message                           //
// If an error occurs, catch it and return status 400 and the error message //
exports.deleteComment = async (req, res) => {
  const CommentsId = req.params.id;
  Comments.destroy({ where: { CommentsId: CommentsId } })
    .then(() => {
      res
        .status(200)
        .json({ message: 'Comment ID ' + CommentsId + ' has been deleted.' });
    })
    .catch((error) => {
      res.status(400).json({ error: 'An error has occurred. ' + error });
    });
};
