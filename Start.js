const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const FileStore = require("session-file-store")(session);

var authRouter = require("./auth1");
var authCheck = require("./authCheck");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "~~~", // 원하는 문자 입력
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

app.get("/", (req, res) => {
  res.redirect("/main");
});

//계산기 화면 이동
app.get("/main", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/public/htmlFile/Main.html");
});

//로그인 여부
app.post("/islogin", (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    res.json(JSON.stringify({ isLogin: "false" }));
    return false;
  } else {
    res.json(JSON.stringify({ isLogin: "true" }));
    return false;
  }
});

//로그인 정보가 일치하지 않을 때
app.get("/notLogin1", (req, res) => {
  res.sendFile(__dirname + "/public/htmlFile/NotLogin1.html");
});

//아이디 또는 비밀번호 입력창이 비어있을 때
app.get("/notLogin2", (req, res) => {
  res.sendFile(__dirname + "/public/htmlFile/NotLogin2.html");
});

//회원가입에 성공했을 때
app.get("/successJoin", (req, res) => {
  res.sendFile(__dirname + "/public/htmlFile/SuccessJoin.html");
});

//입력된 비밀번호가 서로 다를 때
app.get("/notJoin1", (req, res) => {
  res.sendFile(__dirname + "/public/htmlFile/NotJoin1.html");
});

//이미 존재하는 아이디일 때
app.get("/notJoin2", (req, res) => {
  res.sendFile(__dirname + "/public/htmlFile/NotJoin2.html");
});

//입력되지 않은 정보가 있을 때
app.get("/notJoin3", (req, res) => {
  res.sendFile(__dirname + "/public/htmlFile/NotJoin3.html");
});

//계산결과 화면 이동
app.get("/result", (req, res) => {
  res.sendFile(__dirname + "/public/htmlFile/Result.html");
});

// 인증 라우터
app.use("/auth", authRouter);

//계획표 화면 이동
app.get("/schedule", (req, res) => {
  if (!authCheck.isOwner(req, res)) {
    // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.sendFile(__dirname + "/public/htmlFile/LoginAlarm.html");
    return false;
  } else {
    // 로그인 되어있으면 메인 페이지로 이동시킴
    res.sendFile(__dirname + "/public/htmlFile/Schedule.html");
    return false;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
