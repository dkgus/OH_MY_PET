const express = require("express");
const app = express();
const port = 4646;
const userRoutes = require("./routes/user");
const evntRoutes = require("./routes/event");
const roomRoutes = require("./routes/room");
const nunjucks = require("nunjucks");

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  }
).then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err)); 


 app.use("/users", userRoutes);
 app.use("/event", evntRoutes);
 app.use("/room", roomRoutes);
 


app.get('/',(req,res)=>{
    res.send("DB가 연결되었습니다");
});

app.listen(port, ()=>{
    console.log(`${port}에서 대기중`)
});