const express = require("express");
const app = express();
const port = 4646;
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");
const path = require("path");
const cookieParser = require("cookie-parser");

// routes
const userRoutes = require("./routes/user");
const noticeRoutes = require("./routes/notice");
const communityRoutes = require("./routes/community");
const evntRoutes = require("./routes/event");
const roomRoutes = require("./routes/room");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(cookieParser());
dotenv.config();
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use("/event", evntRoutes);
app.use("/users", userRoutes);
app.use("/notices", noticeRoutes);
app.use("/community", communityRoutes);
app.use("/room", roomRoutes);
app.use("/", (req, res) => res.render("main/index.html"));




// 페이지 없을때 처리 미들웨어
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url}는 없는 페이지 입니다`);
	error.status = 404;
	next(error);
});


// 오류 처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.error = err;
	res.status(err.status || 500).render('error');
});


app.listen(port, () => {
  console.log(`${port}에서 대기중`);
});
