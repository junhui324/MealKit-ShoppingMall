import { getIdOrder } from '/src/modules/api_methodModules/Fetcher.js';
import { getOrderedId } from '/src/modules/order_completeModules/getOrderId.js';

async function getReceiverProfile() {
  const receiver = {
    name: document.getElementById('receiver-name'),
    phoneNumber: document.getElementById('receiver-phone-number'),
    postcode: document.getElementById('receiver-postcode'),
    roadAddress: document.getElementById('receiver-roadAddress'),
    detailAddress: document.getElementById('receiver-detailAddress'),
    extraAddress: document.getElementById('receiver-extraAddress'),
    request: document.getElementById('receiver-request'),
  };

  try {
    const order = getOrderedId();
    const data = await getIdOrder(order);
    receiver.name.innerText = `${data.userName}`;
    receiver.phoneNumber.innerText = `${data.phoneNumber}`;
    receiver.postcode.innerText = `${data.address.우편번호}`;
    receiver.roadAddress.innerText = `${data.address.도로명주소}`;
    receiver.detailAddress.innerText = `${data.address.상세주소}`;
    receiver.extraAddress.innerText = `${data.address.참고사항}`;
    receiver.request.innerText = `${data.requirement}`;
  } catch (error) {
    console.error(`데이터를 가져오는데 실패했습니다: ${error}`);
  }
}

export { getReceiverProfile };

const postcode = document.getElementById('postcode').value;
const roadAddress = document.getElementById('roadAddress').value;
const detailAddress = document.getElementById('detailAddress').value;
const extraAddress = document.getElementById('extraAddress').value;
