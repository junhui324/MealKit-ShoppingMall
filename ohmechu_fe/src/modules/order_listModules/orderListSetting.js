import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';
import * as Token from '/src/modules/api_methodModules/Token.js';

// 수량을 표시해주는 부분
const readyOrderAmount = document.getElementById('ready-order-amount');
const deliveryOrderAmount = document.getElementById('delivery-order-amount');
const completeOrderAmount = document.getElementById('complete-order-amount');
const orderAmount = document.getElementById('order-amount');

// 리스트 작성 부분
const orderListBox = document.getElementById('order-list-box');

/**
 * 주문번호 리스트를 받아오고, 해당 주문번호들을 통해 리스트를 작성합니다.
 */
async function orderListSetup() {
  // 주문 리스트를 작성하기 위해 주문번호 리스트를 정의합니다.
  let orderIdList = [];

  // SearchParams를 확인하고 없다면 로그인된 유저인지 확인합니다.
  const searchParams = new URLSearchParams(window.location.search);
  const searchOrderId = searchParams.get('order');

  if (searchOrderId) {
    // 비회원일 경우에 SearchParams의 orderId를 받아옵니다.
    orderIdList.push(searchOrderId);
  } else {
    // JWT 토큰이 있는지 확인 후, 해당 토큰에 맞는 users DB 정보를 요청함.
    if (Token.getToken() !== undefined) {
      const userOrders = await Fetcher.getUser();
      orderIdList = [...userOrders.orderNumber];
    } else {
      orderIdList = [];
    }
  }

  if (orderIdList.length < 1) {
    alert('주문 정보가 없습니다.');
    return;
  }

  // orderIdList의 주문번호로 API와 통신하고, response를 토대로 리스트를 작성합니다.
  let ordersList = [];
  for (let orderId of orderIdList)
    ordersList.push(await Fetcher.getIdOrder(orderId));

  for (let order of ordersList) {
    // 리스트를 담을 큰 div부터 작성합니다.
    const id = order._id;
    const state = order.orderState;
    orderListBox.innerHTML += divTemplate(id, state);

    // 배송 중, 배송 완료에는 주문수정 버튼을 숨깁니다.
    const unableEditStates = ['배송중', '배송완료'];
    if (unableEditStates.includes(state))
      document
        .querySelector(`button[data-order-id="${id}"]`)
        .classList.add('hidden');

    // 리스트를 작성합니다.
    const orderList = document.querySelector(`ul[data-order-id="${id}"]`);
    const productList = await Fetcher.getAllProducts();
    const itemsList = order.orderDetail;

    // 주문 상품 정보 할당
    for (let i in itemsList) {
      itemsList[i] = {
        ...itemsList[i],
        ...productList.find((product) => product._id === itemsList[i].id),
      };
    }

    // 주문 상품 별 리스트 작성
    for (let item of itemsList) {
      orderList.innerHTML += listTemplate(
        item.img,
        item.name,
        item.amount,
        (item.price * item.amount).toLocaleString()
      );
    }

    // 배송 상태 카운트
    amountCounter(state);
  }

  // 주문수정 버튼의 이벤트를 추가합니다.
  const editButtons = document.getElementsByClassName('edit-button');
  for (let editButton of editButtons)
    editButton.addEventListener('click', editOrder);
}

/**
 * 호출 시 총_건과 배송준비중 배송중 배송완료의 수량을 카운트합니다.
 */
function amountCounter(state) {
  // 인자로 받은 상태의 수량만 카운트합니다.
  if (state === '배송준비중') {
    readyOrderAmount.innerText = Number(readyOrderAmount.innerText) + 1;
  } else if (state === '배송중') {
    deliveryOrderAmount.innerText = Number(deliveryOrderAmount.innerText) + 1;
  } else if (state === '배송완료') {
    completeOrderAmount.innerText = Number(completeOrderAmount.innerText) + 1;
  }
  // 총 _ 건의 수량은 어떤 경우에도 카운트합니다.
  orderAmount.innerText = Number(orderAmount.innerText) + 1;
}

function divTemplate(id, orderState) {
  return `<div>
    <div class="flex justify-start p-4">
      <span class="flex items-center text-2xl mr-4">주문번호</span>
      <span class="inline-block flex items-center text-neutral-600"
        >${id}</span
      >
      <div class="flex items-center text-neutral-600 ml-auto">
        <span class="inline-block flex items-center text-neutral-600 mx-2"
          >${orderState}</span
        >
        <button
          data-order-id="${id}"
          onclick="location.href
          ='/src/pages/order_edit/order_edit.html';"
          class="edit-button inline-block py-1 px-3 mx-2 border border-color-sec hover:bg-[#22392a] hover:border-[#22392a] hover:text-[#f7f3eb] trans text-center text-base font-medium focus:outline-none"
        >
          주문수정
        </button>
      </div>
    </div>

    <ul data-order-id="${id}" class="my-4">
    </ul>
    <div class="mx-4 border-neutral-300 border-t mb-20"></div>
  </div>`;
}

function listTemplate(img, name, amount, price) {
  return `<li class="flex">
    <div class="flex w-4/6 mx-4 py-2 text-neutral-600">
      <img
        class="block w-1/5 h-[150px] mx-16 object-cover object-center"
        src="${img}"
      />
      <div class="flex justify-center items-center">${name}</div>
    </div>
    <div
      class="flex justify-center items-center w-1/6 mx-4 py-2 text-neutral-600"
    >
      ${amount} 개
    </div>
    <div
      class="flex justify-center items-center w-1/6 mx-4 py-2 text-neutral-600"
    >
      ${price} 원
    </div>
  </li>`;
}

/**
 * 주문수정 페이지에서 활용될 LocalStorage값 editOrderId를 등록합니다.
 */
function editOrder(e) {
  // 기본 액션을 제거합니다.
  e.preventDefault();
  e.stopPropagation();

  // SearchParams의 editOrderId에 수정할 주문번호를 명시합니다.
  // 이 editOrderId는 주문수정 페이지에서 활용됩니다.
  const editOrderId = this.dataset.orderId;
  const newUrl = `/src/pages/order_edit/order_edit.html?order=${editOrderId}`;
  window.location.href = newUrl;
}

export { orderListSetup };
