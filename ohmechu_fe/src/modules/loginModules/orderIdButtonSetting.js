const orderIdInput = document.getElementById('order-id');
const orderIdButton = document.getElementById('order-id-button');

function orderIdButtonSetup() {
  orderIdButton.addEventListener('click', () => {
    const orderId = orderIdInput.value;

    window.location.href = `/src/pages/order_list/order_list.html?order=${orderId}`;
  });
}

export { orderIdButtonSetup };
