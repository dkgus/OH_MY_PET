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
const indexRouter = require('./routes');
const userRoutes = require("./routes/user");
const noticeRoutes = require("./routes/notice");
const communityRoutes = require("./routes/community");
const evntRoutes = require("./routes/event");
const roomRoutes = require("./routes/room");


/** 관리자 routes */
const adminRouter = require('./routes/admin'); // 관리자 메인 
const adminMemberRouter = require('./routes/admin/member'); 
const adminRoomRouter = require('./routes/admin/room'); 
const adminEventRouter = require('./routes/admin/event'); 
const adminCommunityRouter = require('./routes/admin/community'); 




app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});


app.use(express.static(path.join(__dirname, "public")));

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


/** 라우터 등록 */
app.use(indexRouter); // 메인 라우터 
app.use("/event", evntRoutes);
app.use("/users", userRoutes);
app.use("/notices", noticeRoutes);
app.use("/community", communityRoutes);
app.use("/room", roomRoutes);




/** 관리자 */
app.use("/admin", adminRouter); // 관리자 로그인페이지
app.use('/admin/member', adminMemberRouter); //회원관리
app.use('/admin/room', adminRoomRouter); 
app.use('/admin/event', adminEventRouter); 
app.use('/admin/community', adminCommunityRouter); 





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