import { deleteOrder } from '/src/modules/api_methodModules/Fetcher.js';
import { getOrderedId } from '/src/modules/order_completeModules/getOrderId.js';

async function deleteAllOrder(e) {
  e.preventDefault();
  e.stopPropagation();
  try {
    const order = getOrderedId();
    const response = await deleteOrder(order);
    if (response) {
      window.location.href = '/src/pages/order_edit/order_delete_complete.html';
    }
  } catch (error) {
    console.error(`데이터를 가져오는데 실패했습니다: ${error}`);
  }
}

export { deleteAllOrder };
