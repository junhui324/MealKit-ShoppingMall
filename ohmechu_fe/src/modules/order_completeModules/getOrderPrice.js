import { getIdOrder } from '/src/modules/api_methodModules/Fetcher.js';
import { getOrderedId } from '/src/modules/order_completeModules/getOrderId.js';

async function getOrderPrice() {
  const orderPrice = {
    purchaseAmount: document.getElementById('purchase-amount'),
    deliveryFee: document.getElementById('delivery-fee'),
    totalAmount: document.getElementById('total-amount'),
  };
  try {
    const order = getOrderedId();
    const data = await getIdOrder(order);

    orderPrice.purchaseAmount.innerText = `${data.purchaseAmount.toLocaleString(
      'ko-KR'
    )} 원`;
    orderPrice.deliveryFee.innerText = `${data.deliveryFee.toLocaleString(
      'ko-KR'
    )} 원`;
    orderPrice.totalAmount.innerText = `${data.totalAmount.toLocaleString(
      'ko-KR'
    )} 원`;
  } catch (error) {
    console.error(`데이터를 가져오는데 실패했습니다.: ${error}`);
  }
}
export { getOrderPrice };
