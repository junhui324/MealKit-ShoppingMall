import * as Token from '/src/modules/api_methodModules/Token.js';

const loginBox = document.getElementById('login-box');

function loginBoxSetup() {
  loginBox.addEventListener('click', () => {
    window.location.href = '/src/pages/login/login.html';
  });

  if (Token.getToken()) {
    loginBox.innerHTML = '';
    loginBox.classList.remove('border');
  }
}

export { loginBoxSetup };
