const express = require('express');
const router = express.Router();
const Posts = require('../Models/Posts');

//Save Posts
router.post('/', async (req, res) => {
  try {
    const { topic, description, postCategory } = req.body;

    const newPost = new Posts({
      topic,
      description,
      postCategory,
    });

    await newPost.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//View Posts
router.get('/', async (req, res) => {
  try {
    const data = await Posts.find();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//View by id Posts
router.get('/:id', async (req, res) => {
  try {
    const data = await Posts.findById(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//Delete Posts
router.delete('/:id', async (req, res) => {
  try {
    await Posts.findByIdAndDelete(req.params.id);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//Update Posts
router.put('/:id', async (req, res) => {
  try {
    const { topic, description, postCategory } = req.body;

    const newPost = {
      topic,
      description,
      postCategory,
    };

    await Posts.findByIdAndUpdate(req.params.id, newPost);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
