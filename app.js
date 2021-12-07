const express = require("express");
const session = require("express-session");
var passport = require("passport");
const connect = require("./models/index");
const User = require("./models/User");

const app = express();

// db 연결
connect();

// 미들웨어 실행부
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 라우팅
app.get("/", (req, res) => {
  res.send("Hello");
});

// 인증 라우터 (authRouter)
const authRouter = require("./routes/authRouter");
app.use("/auth", authRouter);

// http listen port 생성 서버 실행
app.listen(8080, () => console.log("listening 8080 port"));
