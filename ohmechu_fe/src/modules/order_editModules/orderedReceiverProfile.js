import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';
import { getOrderedId } from '/src/modules/order_completeModules/getOrderId.js';

async function orderedReceiverProfile() {
  const receiver = {
    name: document.getElementById('receiver-name'),
    phoneNumber: document.getElementById('receiver-phone-number'),
    receiverPostcode: document.getElementById('postcode'),
    receiverRoadAddress: document.getElementById('roadAddress'),
    receiverDetailAddress: document.getElementById('detailAddress'),
    receiverExtraAddress: document.getElementById('extraAddress'),
    request: document.getElementById('receiver-request'),
  };

  try {
    const order = getOrderedId();
    const response = await Fetcher.getIdOrder(order);
    const data = response;

    receiver.name.value = `${data.userName}`;
    receiver.phoneNumber.value = `${data.phoneNumber}`;
    receiver.receiverPostcode.value = `${data.address.우편번호}`;
    receiver.receiverRoadAddress.value = `${data.address.도로명주소}`;
    receiver.receiverDetailAddress.value = `${data.address.상세주소}`;
    receiver.receiverExtraAddress.value = `${data.address.참고사항}`;
    receiver.request.value = `${data.requirement}`;
  } catch (error) {
    console.error(`데이터를 가져오는데 실패했습니다: ${error}`);
  }
}

export { orderedReceiverProfile };
