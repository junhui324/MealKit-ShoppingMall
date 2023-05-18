import { cartSetup } from './cartSetting.js';
import { moveToDetail } from './listToDetail.js';
import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

const productBox = document.getElementById('product-box');
const productAmount = document.getElementById('product-amount');
const categoryTitle = document.getElementById('category-title');

/**
 * list의 아이템들의 전반적인 세팅을 담당합니다.
 */
async function listSetup(category = 'ascName') {
  const searchParams = new URL(document.location).searchParams;
  if (searchParams.get('sort')) {
    category = searchParams.get('sort');
    if (category === 'latest') categoryTitle.innerText = '신상품순';
    if (category === 'recommended') categoryTitle.innerText = '추천상품순';
  }

  await listGeneration(category);
  // 리스트 세팅이 다되었다면, 리스트에 있는 장바구니 버튼 세팅을 진행한다.
  cartSetup();
  moveToDetail();
}

/**
 * 상품 리스트 Url을 받아와 category에 맞게 list를 작성합니다.
 * 그 후 cartSetup()을 불러와 장바구니 버튼도 활성화합니다.
 * @param {Url} url
 * @param {String} category
 */
async function listGeneration(category) {
  // 리스트를 비웁니다.
  productBox.innerHTML = '';

  // 카테고리에 맞게 데이터를 산출합니다.
  const datas = await Fetcher.getCategoryProducts(category);

  // listTemplate 함수로 리스트 아이템을 추가합니다.
  for (let data of datas)
    productBox.innerHTML += listTemplate(
      data._id,
      data.img,
      data.name,
      Number(data.price).toLocaleString() + ' 원',
      data?.subDescription
    );

  // 총 0건 텍스트의 값을 올바르게 변경합니다.
  productAmount.innerText = datas.length;
}

/**
 * li를 인자에 맞게 반환합니다.
 * @param {Url} imgUrl
 * @param {String} name
 * @param {String} price
 * @param {String[]} subDescription
 * @returns
 */
function listTemplate(id, img, name, price, subDescription = '　') {
  return `<li class="w-1/4 h-1/4 p-3 my-3">
              <img
                class="product-img w-full h-[200px] object-cover flex-shrink-0 object-center cursor-pointer"
                src="${img}"
              />
              <div class="relative p-1">
                <div
                  class="absolute left-[98%] top-3/4 -translate-x-full -translate-y-2/4 z-10 cursor-pointer"
                >
                  <svg
                    class="cart-in-button w-12 h-12 stroke-[#607c5f]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    data-id="${id}"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="7 10 12 4 17 10" />
                    <path
                      d="M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z"
                    />
                    <circle cx="12" cy="15" r="2" />
                  </svg>
                </div>
                <a class="block product-name block mt-2 text-left text-xl font-semibold"
                href="/src/pages/goods/goods.html?productId=${id}"
                  >${name}</a
                >
                <div class="text-left text-xs font-light">${subDescription.join(
                  '\u00a0\u00a0|\u00a0\u00a0'
                )}</div>
                <div class="mt-3 text-left text-lg">${price}</div>
              </div>
            </li>`;
}

export { listSetup };
