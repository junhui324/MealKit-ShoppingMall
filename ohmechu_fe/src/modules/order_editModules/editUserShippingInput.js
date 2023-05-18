import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';
import { getOrderedId } from '/src/modules/order_completeModules/getOrderId.js';

async function sendShippingData(e) {
  e.stopPropagation();
  console.log('버튼 확인 콘솔');
  const editReceiverName = document.getElementById('receiver-name').value;
  const editReceiverPhoneNumber = document.getElementById(
    'receiver-phone-number'
  ).value;
  const editReceiverPostcode = document.getElementById('postcode').value;
  const editReceiverRoadAddress = document.getElementById('roadAddress').value;
  const editReceiverDetailAddress =
    document.getElementById('detailAddress').value;
  const editReceiverExtraAddress =
    document.getElementById('extraAddress').value;
  const editReceiverRequirement =
    document.getElementById('receiver-request').value;

  const orderedId = getOrderedId();
  const editReceiverAddress = {
    우편번호: editReceiverPostcode,
    도로명주소: editReceiverRoadAddress,
    상세주소: editReceiverDetailAddress,
    참고사항: editReceiverExtraAddress,
  };
  const data = {
    userName: editReceiverName,
    phoneNumber: editReceiverPhoneNumber,
    address: editReceiverAddress,
    requirement: editReceiverRequirement,
  };
  try {
    const response = await Fetcher.putOrder(orderedId, data);
    if (response.modifiedCount) {
      alert('주문 수정이 완료되었습니다.');
      window.location.href = `/src/pages/order_list/order_list.html?order=${orderedId}`;
    } else {
      console.error('주문했던 ID를 가져올 수 없습니다.', response);
      alert('주문 수정이 취소되었습니다.');
    }
  } catch (error) {
    console.error('전송이 실패하였습니다.', error);
    alert('주문 수정이 취소되었습니다.');
  }
}

export { sendShippingData };
