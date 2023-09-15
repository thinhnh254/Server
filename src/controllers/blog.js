const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json("Missing Input");
  }

  const response = await Blog.create(req.body);

  return res.status(200).json({
    success: response ? true : false,
    createdBlogStatus: response ? response : "Can not create new blog!",
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json("Missing Input");
  }
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });

  return res.status(200).json({
    success: response ? true : false,
    updateBlogStatus: response ? response : "Can not update blog!",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();

  return res.status(200).json({
    success: response ? true : false,
    getBlogStatus: response ? response : "Can not get blogs!",
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Blog.findByIdAndDelete(bid);

  return res.status(200).json({
    success: response ? true : false,
    getBlogStatus: response ? response : "Can not delete blogs!",
  });
});

module.exports = {
  createBlog,
  updateBlog,
  getBlogs,
  deleteBlog,
};
