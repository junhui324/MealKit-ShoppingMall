import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';
import * as Token from '/src/modules/api_methodModules/Token.js';

const loginInput = document.getElementById('user-id');
const passwordInput = document.getElementById('user-password');
const loginButton = document.getElementById('login-button');

function loginSetup() {
  // 로그인 버튼을 세팅합니다.
  loginButton.addEventListener('click', login);
}

async function login(e) {
  // 기본 액션을 제거합니다.
  e.preventDefault();
  e.stopPropagation();

  // 인풋 내용을 받아옵니다.
  const userId = loginInput.value;
  const userPassword = passwordInput.value;

  // API로 로그인 요청을 진행합니다.
  let token;

  try {
    token = await Fetcher.loginUser(userId, userPassword);
  } catch (err) {
    if (err.message === '500') {
      alert('입력이 올바르지 않습니다.');
    } else if (err.message === '401') {
      alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
    } else {
      alert('예기치 않은 오류가 발생했습니다.');
    }
    return;
  }

  // 토큰이 발급되었으면 클라이언트에 저장(cookie) 후 메인페이지로 돌아갑니다.
  if (token) {
    Token.setToken(token.accessToken);
    window.location.href = '/src/pages/main/index.html';
  } else {
    alert('로그인 오류. 토큰이 발급되지 않았습니다.');
    throw new Error('Token not issued.');
  }
}

export { loginSetup };
