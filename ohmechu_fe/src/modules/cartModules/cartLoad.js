import { btnsSetup } from './btnsSetting.js';
import { priceSetup } from './priceSetting.js';
import { checkBoxSetup } from './checkBoxes.js';
import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

// 장바구니 없을때 조정
const emptyCartNotice = document.getElementById('empty-cart-notice');
const deleteAndBill = document.getElementById('delete-and-bill');
const orderButtons = document.getElementById('order-buttons');

// 장바구니 있을때 조정
const cartList = document.getElementById('cart-list');
const cartAmount = document.getElementById('cart-amount');

// 전체 삭제, 전체 상품주문
const deleteAllButton = document.getElementById('delete-all');
const orderAllButton = document.getElementById('order-all');

/**
 * _id로 상품의 데이터를 받아오는 API를 통해 리스트와 버튼을 초기화합니다.
 */
async function cartLoad() {
  // 우선 장바구니 리스트를 비웁니다.
  cartList.innerHTML = '';

  // DB에서 모든 상품 정보를 받아옵니다. (따로 받으면 순차적으로 로딩됨)
  const getDatas = await Fetcher.getAllProducts();

  let cart = window.localStorage.getItem('cart');
  cart = cart && JSON.parse(cart);

  // 장바구니 수량 입력
  cartAmount.innerText = cart ? cart.length : 0;

  // 장바구니가 비어있을 경우 알림 표시 후 함수 끝냄
  if (cart === null) {
    emptyCartNotice.classList.remove('hidden');
    deleteAndBill.classList.add('hidden');
    orderButtons.classList.add('hidden');

    // 알림 창 버튼 이벤트 등록
    document
      .getElementById('category-move-button')
      .addEventListener('click', () => {
        window.location.href = '/src/pages/category/category.html';
      });
    return;
  }

  // 장바구니의 상품들을 리스트로 출력합니다.
  // reverse()를 주어서 최근 등록 제품부터 뜨도록 합니다.
  for (let product of cart.reverse()) {
    const id = product.id;
    const amount = product.amount;
    const productData = getDatas.find((data) => data._id === id);

    cartList.innerHTML += listTemplate(
      productData._id,
      productData.img,
      productData.name,
      amount,
      Number(productData.price).toLocaleString(),
      productData.description
    );
  }

  // 상품 가격을 초기화합니다.
  priceSetup();

  // 상품 리스트의 버튼을 세팅합니다.
  btnsSetup();

  // 상품 리스트의 체크박스를 세팅합니다.
  checkBoxSetup();

  // 전체 삭제, 전체 상품 주문을 세팅합니다.
  deleteAllButton.addEventListener('click', deleteAll);
  orderAllButton.addEventListener('click', orderAll);
}

function deleteAll(e) {
  // 기본 액션을 제거합니다.
  e.preventDefault();
  e.stopPropagation();

  if (confirm('장바구니를 전부 비우시겠습니까?')) {
    window.localStorage.removeItem('cart');

    cartLoad();
  }
}

function orderAll(e) {
  // 기본 액션을 제거합니다.
  e.preventDefault();
  e.stopPropagation();

  // 상품 주문 페이지로 이동합니다.
  location.href = '/src/pages/order/order.html';
}

function listTemplate(id, img, name, amount, price, description) {
  const descriptionOneLine = description.split('.')[0] + '.';

  return `<li
  data-list-product-id="${id}"
  class="pb-6 mb-6 border-solid border-b border-gray flex items-center justify-between flex-no-wrap"
>
  <!-- 상품 좌측 선택 버튼, 이미지, 제품명 -->
  <div class="flex items-center">
    <input
      data-product-id="${id}"
      type="checkbox"
      name="cartProduct-1"
      id="product-1"
      value="product-1"
      class="check-box appearance-none w-6 h-6 cursor-pointer rounded-full bg-gray-300 focus:outline-none checked:bg-[#607c5f] inline-block mr-7"
      checked
    />
    <img
      src="${img}"
      class="object-cover inline-block w-[150px] h-[150px]"
    />
    <div class="inline-block ml-6">
      <p class="flex-col">
        <span class="block text-left text-[17px] font-semibold"
          >${name}</span
        ><span
          span
          class="block text-left text-[13px] text-neutral-500"
          >${descriptionOneLine}</span
        >
      </p>
    </div>
  </div>
  <!-- 상품 우측 수량, 금액, 취소버튼 -->
  <div class="flex items-center">
    <!-- 상품 수량 -->
    <div class="custom-number-input w-[110px] mr-28">
      <div
        class="flex flex-row h-10 rounded-lg relative bg-transparent border border-gray"
      >
        <button
          data-action="decrement"
          data-product-id="${id}"
          class="text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span class="text-2xl">&#45;</span>
        </button>
        <input
          type="number"
          class="outline-none focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black flex items-center text-gray-700 outline-none"
          name="custom-input-number"
          value="${amount}"
        />
        <button
          data-action="increment"
          data-product-id="${id}"
          class="text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-r cursor-pointer outline-none"
        >
          <span class="text-xl">&#43;</span>
        </button>
      </div>
    </div>
    <!-- 상품 금액 -->
    <span class="text-xl font-semibold">${price}</span
    ><span class="text-xl font-semibold ml-1 mr-12"> 원</span>
    <!-- 상품 취소 -->
    <button
      data-action="cancel"
      data-product-id="${id}"
      type="button"
      class="rounded-md p-2 inline-flex items-center justify-center text-color-ter hover:text-[#f7f3eb] hover:bg-[#607c5f] trans focus:outline-none"
    >
      <svg
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24 "
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</li>`;
}

export { cartLoad };
