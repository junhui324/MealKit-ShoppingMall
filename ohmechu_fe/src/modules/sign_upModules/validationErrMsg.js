import {
  validateEmail,
  validatePassword,
  checkVerifyPassword,
  validateName,
} from './checkValidation.js';

export function errorMsg(e) {
  const inputId = e.target.id; // 이벤트가 발생한 DOM 요소의 id 값을 가져옴
  const input = document.getElementById(inputId);
  const inputValue = input.value;

  const previousErrMsg = input.parentNode.querySelector('p.text-red-500');
  if (previousErrMsg) {
    previousErrMsg.remove();
  }

  const errMsg = document.createElement('p');
  errMsg.classList.add('text-red-500', 'text-sm', 'mt-1', 'text-left');

  switch (inputId) {
    case 'userId':
      if (!validateEmail(inputValue)) {
        errMsg.innerText = '올바른 이메일 형식이 아닙니다.';
        input.parentNode.appendChild(errMsg);
      } else {
        const previousErrMsg = input.parentNode.querySelector('p.text-red-500');
        if (previousErrMsg) {
          previousErrMsg.remove();
        }
      }
      break;
    case 'user-Password':
      if (!validatePassword(inputValue)) {
        errMsg.innerText =
          '6자 이상, 20자 이하의 숫자와 영문자 조합이어야 합니다.';
        input.parentNode.appendChild(errMsg);
      } else {
        const previousErrMsg = input.parentNode.querySelector('p.text-red-500');
        if (previousErrMsg) {
          previousErrMsg.remove();
        }
      }
      break;
    case 'user-PasswordCheck':
      const passwordInput = document.getElementById('user-Password');
      const passwordValue = passwordInput.value;
      if (!checkVerifyPassword(passwordValue, inputValue)) {
        errMsg.innerText = '패스워드가 일치하지 않습니다.';
        input.parentNode.appendChild(errMsg);
      } else {
        const previousErrMsg = input.parentNode.querySelector('p.text-red-500');
        if (previousErrMsg) {
          previousErrMsg.remove();
        }
      }
      break;
    case 'userName':
      if (!validateName(inputValue)) {
        errMsg.innerText = '이름을 입력해주세요.';
        input.parentNode.appendChild(errMsg);
      } else {
        const previousErrMsg = input.parentNode.querySelector('p.text-red-500');
        if (previousErrMsg) {
          previousErrMsg.remove();
        }
      }
      break;
    default:
      break;
  }
}
