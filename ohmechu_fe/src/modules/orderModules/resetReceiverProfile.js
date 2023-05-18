export function resetReceiverProfile() {
  const receiver = {
    name: document.getElementById('receiver-name'),
    phoneNumber: document.getElementById('receiver-phone-number'),
    postcode: document.getElementById('postcode'),
    roadAddress: document.getElementById('roadAddress'),
    detailAddress: document.getElementById('detailAddress'),
    extraAddress: document.getElementById('extraAddress'),
    request: document.getElementById('userRequest'),
  };
  receiver.name.value = '';
  receiver.phoneNumber.value = '';
  receiver.postcode.value = '';
  receiver.roadAddress.value = '';
  receiver.detailAddress.value = '';
  receiver.extraAddress.value = '';
}
