const { Comment } = require('../models/comment');

const getCommentById = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        msg: 'Comment not found',
      });
    }

    return res.json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Server error',
    });
  }
};

const getCommentsByFilter = async (req, res) => {
  const { pageSize, current, created_at, post_id, author_id } = req.body;

  try {
    const query = {};

    if (created_at) {
      query.createdAt = created_at;
    }

    if (post_id) {
      query.postId = post_id;
    }

    if (author_id) {
      query.authorId = author_id;
    }

    const totalCount = await Comment.countDocuments(query);

    const comments = await Comment.find(query)
      .skip((current - 1) * pageSize)
      .limit(pageSize);

    return res.json({
      totalCount,
      comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Server error',
    });
  }
};

const createComment = async (req, res) => {
  const { postId, authorId, content } = req.body;

  try {
    const newComment = new Comment({
      postId,
      authorId,
      content,
    });

    await newComment.save();

    return res.status(201).json({
      msg: 'Comment created successfully',
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Server error',
    });
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        msg: 'Comment not found',
      });
    }

    comment.content = content;

    await comment.save();

    return res.json({
      msg: 'Comment updated successfully',
      comment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Server error',
    });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        msg: 'Comment not found',
      });
    }

    await comment.remove();

    return res.json({
      msg: 'Comment deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Server error',
    });
  }
};

module.exports = {
  getCommentById,
  getCommentsByFilter,
  createComment,
  updateComment,
  deleteComment,
};