const express = require("express");
const app = express();
const port = 4646;
const nunjucks = require("nunjucks");
const methodOverride =require('method-override');
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const evntRoutes = require("./routes/event");
const roomRoutes = require("./routes/room");
const noticeRoutes = require("./routes/notice");
const communityRoutes = require("./routes/community");

dotenv.config();

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(cookieParser());
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  }
).then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err)); 

 app.use(express.static(path.join(__dirname, "public")));

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

 app.use("/users", userRoutes);
 app.use("/notices", noticeRoutes);
 app.use("/community", communityRoutes);
 app.use("/event", evntRoutes);
 app.use("/room", roomRoutes);
 app.use("/", (req,res) => res.render("main/index.html")); //넓은범위일수록 제일아래로
 

app.get('/',(req,res)=>{
    res.send("DB가 연결되었습니다");
});

app.listen(port, ()=>{
    console.log(`${port}에서 대기중`)
});