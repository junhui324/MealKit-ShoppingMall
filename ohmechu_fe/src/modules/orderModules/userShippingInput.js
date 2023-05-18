import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

async function sendShippingData(e) {
  e.stopPropagation();
  const userName = document.getElementById('receiver-name').value;
  const phoneNumber = document.getElementById('receiver-phone-number').value;
  const postcode = document.getElementById('postcode').value;
  const roadAddress = document.getElementById('roadAddress').value;
  const detailAddress = document.getElementById('detailAddress').value;
  const extraAddress = document.getElementById('extraAddress').value;
  const userRequirement = document.getElementById('userRequest').value;

  const cart = JSON.parse(window.localStorage.getItem('cart'));

  const purchaseAmount = document.getElementById('purchasePrice').innerText;
  const deliveryFee = document.getElementById('delivery-price').innerText;

  const order_detail = cart.map((item) => ({
    id: item.id,
    amount: item.amount,
  }));

  const userAddress = {
    우편번호: postcode,
    도로명주소: roadAddress,
    상세주소: detailAddress,
    참고사항: extraAddress,
  };
  const data = {
    orderDetail: order_detail,
    userName: userName,
    phoneNumber: phoneNumber,
    address: userAddress,
    requirement: userRequirement,
    purchaseAmount: purchaseAmount,
    deliveryFee: deliveryFee,
  };
  try {
    const response = await Fetcher.postOrder(data);
    console.log('백엔드로 전송 완료', response);
    // console.log(response);
    // console.log(response._id);
    if (response) {
      window.localStorage.removeItem('cart');
      const orderId = response;
      const newUrl = `/src/pages/order_complete/order_complete.html?order=${orderId}`;
      console.log(newUrl);
      window.location.href = newUrl;
    }
  } catch (error) {
    console.error('백엔드로 전송 실패', error);
    alert('배송지 정보를 모두 작성해주세요.');
  }
}

export { sendShippingData };
