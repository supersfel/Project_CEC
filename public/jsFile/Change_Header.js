const loginButton = document.querySelector(".login-button");
import { bringDBdata } from "./Bring_DBdata.js";

export async function changeHeader() {
  const headerEl = document.querySelector(".header");
  const getIsLoginApi = async () => {
    const res = await fetch("/islogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  };

  const res1 = await getIsLoginApi();
  const isLogin = JSON.parse(res1).isLogin;

  const DBdata = await bringDBdata();

  if (isLogin == "true") {
    headerEl.innerHTML =
      `
      <div class="username">` +
      DBdata +
      `님</div>
        <div class="calculator"><a href="/main">계산기</a></div>
        <div class="schedule"><a href="/schedule">계획표</a></div>
        <div class="logout"><a href="/auth/logout">로그아웃</a></div>
    `;
  } else if (isLogin == "false") {
    headerEl.innerHTML = `
        <div class="calculator"><a href="/main">계산기</a></div>
        <div class="schedule"><a href="/schedule">계획표</a></div>
        <div class="login"><a href="/auth/login">로그인</a></div>
        <div class="join"><a href="/auth/join">회원가입</a></div>
    `;
  }
}
