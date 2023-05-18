import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';
import { listTemplate } from '/src/modules/order_listModules/orderListTemplate.js';
import { getOrderedId } from '/src/modules/order_completeModules/getOrderId.js';

async function orderdIdGoodsList(id) {
  const orderList = document.getElementById('order-list');
  const orderedId = getOrderedId();
  const orderedData = await Fetcher.getIdOrder(orderedId);
  const orderedGoodsData = orderedData.orderDetail;
  if (orderedData) {
    const list = [];
    for (const item of orderedGoodsData) {
      // item.id와 일치하는 수량
      const amountData = orderedGoodsData.find((data) => data.id === item.id);
      try {
        const data = await Fetcher.getIdProduct(item.id);
        let listItem = listTemplate(data, amountData);
        list.push(listItem);
      } catch (error) {
        console.error(`상품을 받아오는데 실패하였습니다: ${error}`);
        throw error;
      }
    }
    orderList.innerHTML = ''; // 초기화!!!
    for (const listItem of list) {
      orderList.appendChild(listItem);
    }
  }
}

export { orderdIdGoodsList };
