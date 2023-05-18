import { createHeader } from '/src/default_layout/header.js';
import { createFooter } from '/src/default_layout/footer.js';
import { userInformationSetup } from '/src/modules/mypageModule/userInformationSetting.js';
import { trackingInformationSetup } from '/src/modules/mypageModule/trackingInformationSetting.js';

document.addEventListener('DOMContentLoaded', () => {
  // 헤더 푸터 세팅
  createHeader();
  createFooter();
  // 회원정보 세팅
  userInformationSetup();
  // 주문 배송 조회 세팅
  trackingInformationSetup();
});
