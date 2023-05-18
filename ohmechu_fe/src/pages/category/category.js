import { listSetup } from '/src/modules/categoryModules/listSetting.js';
import { categorySetup } from '/src/modules/categoryModules/categorySetting.js';
import { createHeader } from '/src/default_layout/header.js';
import { createFooter } from '/src/default_layout/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  // 헤더 푸터 세팅
  createHeader();
  createFooter();
  // 리스트 세팅
  listSetup();
  // 카테고리 버튼 세팅
  categorySetup();
});
