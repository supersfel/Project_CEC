var express = require("express");
var router = express.Router();
const mysql = require("mysql2/promise");

let sendName = "";

// 로그인
router.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/htmlFile/Login.html");
});

// 로그인 프로세스
router.post("/login_process", function (request, response) {
  var username = request.body.username;
  sendName = request.body.username;
  var password = request.body.pwd;
  if (username && password) {
    const connection = async () => {
      try {
        let db = await mysql.createConnection({
          host: "127.0.0.1",
          user: "root",
          password: "Dnflwlq031!$",
          database: "cec_project",
        });

        let [rows, fields] = await db.query(
          "SELECT * FROM cec_data WHERE username = ? AND password = ?",
          [username, password]
        );
        if (rows.length > 0) {
          // db에서의 반환값이 있으면 로그인 성공
          request.session.is_logined = true; // 세션 정보 갱신
          request.session.nickname = username;
          request.session.save(function () {
            response.redirect(`/`);
          });
        } else {
          response.redirect("/notLogin1");
        }
      } catch (e) {
        console.log(e);
      }
    };
    connection();
  } else {
    response.redirect("/notLogin2");
  }
});

// username 데이터 보내기
router.post("/bringData", function (request, response) {
  return response.json(JSON.stringify({ nameData: request.session.nickname }));
});

//계획표 데이터 가져오기
router.post("/checkSchedule", function (request, response) {
  const connection = async () => {
    try {
      let db = await mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "Dnflwlq031!$",
        database: "cec_project",
      });

      let [rows, fields] = await db.query(
        "SELECT * FROM schedule_data WHERE username = ? and date = ?",
        [request.session.nickname, request.body.date]
      );
      if (rows.length > 0) {
        return response.json(
          JSON.stringify({
            plan1: rows[0].plan1,
            plan2: rows[0].plan2,
            plan3: rows[0].plan3,
          })
        );
      } else {
        return response.json(
          JSON.stringify({
            plan1: 0,
            plan2: 0,
            plan3: 0,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  connection();
});

//계획표 데이터 저장하기
router.post("/sendSchedule", function (request, response) {
  const connection = async () => {
    try {
      let db = await mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "Dnflwlq031!$",
        database: "cec_project",
      });

      let [rows, fields] = await db.query(
        "SELECT * FROM schedule_data WHERE username = ? and date = ?",
        [request.session.nickname, request.body.date]
      );

      if (rows.length <= 0) {
        let [result] = await db.query(
          "INSERT INTO schedule_data VALUES (?,?,?,?,?)",
          [
            request.session.nickname,
            request.body.date,
            request.body.plan1,
            request.body.plan2,
            request.body.plan3,
          ]
        );
      } else {
        let [result] = await db.query(
          "UPDATE schedule_data SET plan1 = ?, plan2 = ?, plan3 = ? WHERE username = ? and date = ?",
          [
            request.body.plan1,
            request.body.plan2,
            request.body.plan3,
            request.session.nickname,
            request.body.date,
          ]
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  connection();
});

// 로그아웃
router.get("/logout", function (request, response) {
  request.session.destroy(function (err) {
    response.redirect("/");
  });
});

// 회원가입
router.get("/join", function (req, res) {
  res.sendFile(__dirname + "/public/htmlFile/Join.html");
});

// 회원가입 프로세스
router.post("/register_process", function (request, response) {
  var username = request.body.username;
  var password = request.body.pwd;
  var password2 = request.body.pwd2;

  if (username && password && password2) {
    const connection = async () => {
      try {
        let db = await mysql.createConnection({
          host: "127.0.0.1",
          user: "root",
          password: "Dnflwlq031!$",
          database: "cec_project",
        });

        let [rows, fields] = await db.query(
          "SELECT * FROM cec_data WHERE username = ?",
          [username]
        );
        if (rows.length <= 0 && password == password2) {
          // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우
          let [results] = await db.query(
            "INSERT INTO cec_data (username, password) VALUES(?,?)",
            [username, password]
          );
          response.redirect("/successJoin");
        } else if (password != password2) {
          // 비밀번호가 올바르게 입력되지 않은 경우
          response.redirect("/notJoin1");
        } else {
          // DB에 같은 이름의 회원아이디가 있는 경우
          response.redirect("/notJoin2");
        }
      } catch (e) {
        console.log(e);
      }
    };
    connection();
  } else {
    // 입력되지 않은 정보가 있는 경우
    response.redirect("/notJoin3");
  }
});

module.exports = router;
