import { createHeader } from '/src/default_layout/header.js';
import { createFooter } from '/src/default_layout/footer.js';
import { cartLoad } from '/src/modules/cartModules/cartLoad.js';
import { loginBoxSetup } from '/src/modules/cartModules/loginSetting.js';

document.addEventListener('DOMContentLoaded', () => {
  // 기본 헤더 푸터를 작성합니다.
  createHeader();
  createFooter();
  // 로그인이 되어있는지 판별하고 되어있으면 로그인 박스를 숨깁니다.
  loginBoxSetup();
  // 장바구니 리스트를 로딩합니다.
  // 리스트를 작성 후, 체크 박스나 수량 조절 버튼, 삭제 버튼에 대한 이벤트를 할당합니다.
  cartLoad();
});
