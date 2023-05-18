import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

async function setUserProfile() {
  const userPhoneNumber = document.getElementById('user-phone-number');
  const postcode = document.getElementById('postcode');
  const roadAddress = document.getElementById('roadAddress');
  const detailAddress = document.getElementById('detailAddress');
  const extraAddress = document.getElementById('extraAddress');

  try {
    const data = await Fetcher.getUser();
    userPhoneNumber.value = data.phoneNumber;
    postcode.value = data.address.우편번호;
    roadAddress.value = data.address.도로명주소;
    detailAddress.value = data.address.상세주소;
    extraAddress.value = data.address.참고사항;
  } catch (error) {
    alert('회원 정보를 불러오는데 실패했습니다.');
  }
}

export { setUserProfile };
