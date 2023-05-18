import { createHeader } from '/src/default_layout/header.js';
import { createFooter } from '/src/default_layout/footer.js';
import { orderListSetup } from '/src/modules/order_listModules/orderListSetting.js';

document.addEventListener('DOMContentLoaded', () => {
  // 헤더 푸터 세팅
  createHeader();
  createFooter();
  orderListSetup();
});
