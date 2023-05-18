import { listSetup } from './listSetting.js';
import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

const categoryButtons = document.getElementsByClassName('category-button');
const categoryTitle = document.getElementById('category-title');
const categoryImage = document.getElementById('category-image');

function categorySetup() {
  for (let button of categoryButtons)
    button.addEventListener('click', categoryClick);
}

async function categoryClick(e) {
  // 기본 액션을 제거합니다.
  e.preventDefault();
  e.stopPropagation();

  // 카테고리에 맞게 리스트를 재 생성합니다.
  const categoryTitleString = this.innerText;
  const category = this.dataset.category;

  // 카테고리 타이틀과 이미지를 변경합니다.
  categoryTitle.innerText = categoryTitleString;
  if (category === 'ascName') {
    categoryImage.src = '/src/img/food-6.jpg';
  } else {
    const categoryDatas = await Fetcher.getCategoryProducts(category);
    categoryImage.src = categoryDatas[0].img;
  }

  listSetup(category);
}

export { categorySetup };
