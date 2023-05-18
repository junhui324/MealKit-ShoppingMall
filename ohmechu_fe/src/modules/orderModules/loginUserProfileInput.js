import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

async function orderedReceiverProfile() {
  const receiver = {
    name: document.getElementById('receiver-name'),
    phoneNumber: document.getElementById('receiver-phone-number'),
    postcode: document.getElementById('postcode'),
    roadAddress: document.getElementById('roadAddress'),
    detailAddress: document.getElementById('detailAddress'),
    extraAddress: document.getElementById('extraAddress'),
    request: document.getElementById('userRequest'),
  };

  try {
    let data = await Fetcher.checkToken(await Fetcher.getUser());
    if (data) {
      receiver.name.value = `${data.userName}`;
      receiver.phoneNumber.value = `${data.phoneNumber}`;
      receiver.postcode.value = `${data.address.우편번호}`;
      receiver.roadAddress.value = `${data.address.도로명주소}`;
      receiver.detailAddress.value = `${data.address.상세주소}`;
      receiver.extraAddress.value = `${data.address.참고사항}`;
    }
  } catch (error) {
    console.error(`데이터를 가져오는데 실패했습니다: ${error}`);
  }
}
export { orderedReceiverProfile };
