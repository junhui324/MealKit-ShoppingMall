import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

const myPageName = document.getElementById('mypage-name');
const myPageEmail = document.getElementById('mypage-email');
const passwordInput = document.getElementById('user-password');
const myPagePhoneNumber = document.getElementById('mypage-phone-number');
const UserInformationEditPageButton = document.getElementById(
  'user-information-edit-page-button'
);

async function userInformationSetup() {
  // 토큰에 맞추어 유저 정보를 불러옵니다.
  let user = await Fetcher.checkToken(Fetcher.getUser());

  // 회원 정보 화면을 세팅합니다.
  myPageName.innerText = user.userName;
  myPageEmail.innerText = user.email;
  myPagePhoneNumber.innerText = user.phoneNumber;

  // 회원정보 수정 버튼에 대한 이벤트를 할당합니다.
  UserInformationEditPageButton.addEventListener('click', moveEditPage);
}

/**
 * 입력한 회원 비밀번호가 일치하면 회원 정보 수정 페이지로 이동합니다.
 */
async function moveEditPage() {
  const password = passwordInput.value;

  try {
    const response = await Fetcher.checkPassword(password);

    // 오류 catch가 되지 않았다면 정상입력
    window.location.href = '/src/pages/user_profile/user_profile.html';
  } catch (err) {
    if (err.message === '401') {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      console.log(err);
      alert('예기치 않은 에러가 발생했습니다.');
      return;
    }
  }
}

export { userInformationSetup };
