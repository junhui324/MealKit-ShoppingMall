import { createHeader } from '/src/default_layout/header.js';
import { createFooter } from '/src/default_layout/footer.js';
import { loginSetup } from '/src/modules/loginModules/loginSetting.js';
import { orderIdButtonSetup } from '/src/modules/loginModules/orderIdButtonSetting.js';

document.addEventListener('DOMContentLoaded', () => {
  // 헤더 푸터 세팅
  createHeader();
  createFooter();
  // 로그인 세팅
  loginSetup();
  // 주문번호 버튼 세팅
  orderIdButtonSetup();
});
