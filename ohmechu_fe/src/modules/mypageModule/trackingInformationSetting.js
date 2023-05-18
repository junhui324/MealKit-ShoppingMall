import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

const readyOrderAmount = document.getElementById('ready-order-amount');
const deliveryOrderAmount = document.getElementById('delivery-order-amount');
const completeOrderAmount = document.getElementById('complete-order-amount');

async function trackingInformationSetup() {
  // 토큰에 맞추어 유저 정보를 불러옵니다.
  let user = await Fetcher.checkToken(Fetcher.getUser());

  // 유저의 주문정보를 불러오고, 하나씩 확인하면서 카운트합니다.
  const userOrders = [...user.orderNumber];
  let readyCount = 0;
  let deliveryCount = 0;
  let completeCount = 0;

  for (let orderId of userOrders) {
    const order = await Fetcher.getIdOrder(orderId);
    const orderState = order.orderState;

    if (orderState === '배송준비중') readyCount++;
    else if (orderState === '배송중') deliveryCount++;
    else if (completeCount === '배송완료') completeCount++;
  }

  // 카운트가 끝나고 한번에 보여줍니다.
  readyOrderAmount.innerText = readyCount;
  deliveryOrderAmount.innerText = deliveryCount;
  completeOrderAmount.innerText = completeCount;
}

export { trackingInformationSetup };
