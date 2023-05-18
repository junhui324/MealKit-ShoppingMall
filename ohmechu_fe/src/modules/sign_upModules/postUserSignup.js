import { joinUser } from '/src/modules/api_methodModules/Fetcher.js';

async function postUserSignup(e) {
  e.stopPropagation();
  e.preventDefault();
  const signUpId = document.getElementById('userId').value;
  const signUpPassword = document.getElementById('user-Password').value;
  const signUpPasswordCheck =
    document.getElementById('user-PasswordCheck').value;
  const signUpName = document.getElementById('userName').value;
  const signUpGender = document.getElementById('userGender').value;
  const signUpPhoneNumber = document.getElementById('user-phone-number').value;
  const signUpBirthDate = document.getElementById('birthdate').value;
  const postcode = document.getElementById('postcode').value;
  const roadAddress = document.getElementById('roadAddress').value;
  const detailAddress = document.getElementById('detailAddress').value;
  const extraAddress = document.getElementById('extraAddress').value;

  const user_address = {
    우편번호: postcode,
    도로명주소: roadAddress,
    상세주소: detailAddress,
    참고사항: extraAddress,
  };

  const data = {
    userName: signUpName,
    password: signUpPassword,
    email: signUpId,
    gender: signUpGender,
    phoneNumber: signUpPhoneNumber,
    birth: signUpBirthDate,
    address: user_address,
  };
  try {
    const previousErrMsg = document.querySelector('p.text-red-500');
    if (signUpPassword === signUpPasswordCheck && !previousErrMsg) {
      const response = await joinUser(data);
      window.location.href = '/src/pages/main/index.html';
    }
  } catch (error) {
    if (error.message === '409') {
      alert('이미 등록된 ID이거나 등록된 연락처입니다.');
      throw new Error();
    } else if (error.message === '500') {
      alert('회원가입 양식을 전부 작성해주세요.');
      throw new Error();
    }
    console.error('백엔드로 전송 실패', error);
  }
}

export { postUserSignup };
