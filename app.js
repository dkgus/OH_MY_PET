const express = require("express");
const app = express();
const port = 4646;
const userRoutes = require("./routes/userRouter");
const noticeRoutes = require("./routes/noticeRouter");
const communityRoutes = require("./routes/communityRouter");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

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
app.use("/users", userRoutes);
app.use("/notices", noticeRoutes);
app.use("/community", communityRoutes);

app.get("/", (req, res) => {
  res.send("DB가 연결되었습니다");
});

app.listen(port, () => {
  console.log(`${port}에서 대기중`);
});
