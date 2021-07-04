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
const userRoutes = require("./routes/userRouter");
const noticeRoutes = require("./routes/noticeRouter");
const communityRoutes = require("./routes/communityRouter");
const evntRoutes = require("./routes/event");
const roomRoutes = require("./routes/roomRouter");

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

app.listen(port, () => {
  console.log(`${port}에서 대기중`);
});
