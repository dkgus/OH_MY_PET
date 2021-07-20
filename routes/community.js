const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");

const {
  showAllPosts,
  showPost,
  showCreateForm,
  createPost,
  showUpdateForm,
  updatePost,
  deletePost,
} = require("../controller/communityController");

// community/
router
  .route("/")
  .get( isAuthenticatedUser, showAllPosts);

// community/new
router
  .route("/new")
  .get(showCreateForm)
  .post( isAuthenticatedUser,createPost);

// community/:id
router.route("/:id").get(showPost);

// community/:id/edit
router
  .route("/:id/edit")
  .get(showUpdateForm)
  .put(updatePost)


//community/:id/delete
router.route("/:id/delete").get(deletePost);


// community/:id
router.route("/:id").get( isAuthenticatedUser, showPost);

// community/search
router.get('/?sword=:keyword', async (req, res) => {
	let result = await communities.find({ title: { $regex: req.params.keyword } });
	return res.status(200).json({ data: result });
});

// comunity/paging
router.get('/', async function(req, res){
  var page = Math.max(1, parseInt(req.query.page));
  var limit = Math.max(1, parseInt(req.query.limit));
  page = !isNaN(page)?page:1;
  limit = !isNaN(limit)?limit:10;

  var skip = (page-1)*limit;
  var count = await post.countDocuments({});
  var maxPage = Math.ceil(count/limit);
  var posts = await Post.find({})
  .populate('author')
  .sort('-createdAt')
  .skip(skip)
  .limit(limit)
  .exec();

  res.render('community/index', {
    posts: posts,
    currentPage:page,
    maxPage:maxpage,
    limit:limit
  });
});

module.exports = router;