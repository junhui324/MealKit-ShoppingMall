import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

async function editMyAccount(e) {
  e.preventDefault();
  e.stopPropagation();
  const editPassword = document.getElementById('user-Password').value;
  const editPasswordCheck = document.getElementById('user-PasswordCheck').value;
  const userPhoneNumber = document.getElementById('user-phone-number').value;
  const postcode = document.getElementById('postcode').value;
  const roadAddress = document.getElementById('roadAddress').value;
  const detailAddress = document.getElementById('detailAddress').value;
  const extraAddress = document.getElementById('extraAddress').value;
  const userAddress = {
    우편번호: postcode,
    도로명주소: roadAddress,
    상세주소: detailAddress,
    참고사항: extraAddress,
  };
  const data = {
    password: editPassword,
    phoneNumber: userPhoneNumber,
    address: userAddress,
  };

  try {
    if (editPassword === editPasswordCheck) {
      const response = await Fetcher.putUser(data);
      if (response.acknowledged) {
        alert('회원 정보가 수정되었습니다.');
        window.location.href = '/src/pages/mypage/mypage.html';
      }
    }
  } catch (error) {
    console.error(`회원 정보 수정 실패: ${error}`);
  }
}
export { editMyAccount };
