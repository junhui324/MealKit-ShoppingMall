import { createHeader } from '/src/default_layout/header.js';
import { createFooter } from '/src/default_layout/footer.js';
import { slideSetup } from '/src/modules/list_sliderModules/listSlider.js';
import { sliderEvent } from '/src/modules/list_sliderModules/mainEventSlider.js';
import { mainToDetail } from '/src/modules/list_sliderModules/mainToDetail.js';

document.addEventListener('DOMContentLoaded', () => {
  // 헤더 푸터 세팅
  createHeader();
  createFooter();
  // 슬라이더 세팅
  slideSetup();
  sliderEvent();
  mainToDetail();
});
