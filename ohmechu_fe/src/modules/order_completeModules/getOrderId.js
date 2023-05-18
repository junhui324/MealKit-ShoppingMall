function showOrderId() {
  try {
    const orderId = getOrderedId();
    const orderIdElement = document.getElementById('order-id');
    orderIdElement.innerText = orderId;
  } catch (error) {
    console.error('주문 ID를 찾을 수 없습니다.', error);
  }
}

function getOrderedId() {
  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get('order');
  if (!orderId) {
    throw new Error('주문번호를 찾을 수 없습니다.');
  }
  return orderId;
}

export { showOrderId, getOrderedId };
