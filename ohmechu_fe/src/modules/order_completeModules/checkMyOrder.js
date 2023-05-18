import { getOrderedId } from '/src/modules/order_completeModules/getOrderId.js';

function checkOrder(e) {
  e.stopPropagation();

  const getOrderId = getOrderedId();

  const isLoggedIn = false;
  if (isLoggedIn) {
    window.location.href = '/src/pages/order_list/order_list.html';
  } else {
    window.location.href = `/src/pages/order_list/order_list.html?order=${getOrderId}`;
  }
}

export { checkOrder };
