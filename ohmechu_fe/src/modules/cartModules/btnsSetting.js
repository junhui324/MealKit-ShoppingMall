import { cartLoad } from './cartLoad.js';
import { priceSetup } from './priceSetting.js';

/**
 * 버튼에 대한 이벤트를 줍니다.
 * 1. 수량 조절 버튼을 통해 장바구니 LocalStorage를 변경합니다.
 * 2. 오른쪽 X버튼을 눌러 장바구니에서 상품을 삭제합니다.
 */
function btnsSetup() {
  // 버튼 DOM 요소
  const decrementBtns = document.querySelectorAll(
    `button[data-action="decrement"]`
  );
  const incrementBtns = document.querySelectorAll(
    `button[data-action="increment"]`
  );
  const cancelBtns = document.querySelectorAll(`button[data-action="cancel"]`);

  // 버튼 이벤트 추가
  decrementBtns.forEach((btn) => {
    btn.addEventListener('click', decrement);
  });
  incrementBtns.forEach((btn) => {
    btn.addEventListener('click', increment);
  });
  cancelBtns.forEach((btn) => {
    btn.addEventListener('click', cancel);
  });
}

function decrement(e) {
  // 버튼 클릭시 클릭한 부모 요소+조상 요소에서 data-action이 decrement인 요소
  // (버튼 id를 넣는 대신 data-action속성이 들어간 버튼을 공통으로 활용 가능하도록) -> 그 버튼만 필요하다면 btn 4, 18줄 정의를 변경하세요!
  const btn = e.target.parentNode.parentElement.querySelector(
    'button[data-action="decrement"]'
  );
  // 옆에 있는 숫자를 조절해줘야해서 target 지정
  const target = btn.nextElementSibling;
  let value = Number(target.value);
  // 값이 1 이상인 경우에만 감소하도록
  if (value > 1) {
    value--;
    target.value = value;
  }

  // LocalStorage와 연동
  const id = btn.dataset.productId;
  updateCart(id, value);

  // 가격 표시 변동
  priceSetup();
}

function increment(e) {
  const btn = e.target.parentNode.parentElement.querySelector(
    'button[data-action="decrement"]'
  );
  const target = btn.nextElementSibling;
  let value = Number(target.value);
  // 99까지만 담을 수 있어요
  if (value < 100) {
    value++;
    target.value = value;
  }

  // LocalStorage와 연동
  const id = btn.dataset.productId;
  updateCart(id, value);

  // 가격 표시 변동
  priceSetup();
}

/**
 * X 표를 누르면 해당 상품을 localStorage에서 지우고, 레이아웃을 수정합니다.
 * @param {이벤트 객체} e
 * @returns
 */
function cancel(e) {
  // LocalStorage에서 상품을 삭제합니다.
  const cartAmount = document.getElementById('cart-amount');
  const id = this.dataset.productId;
  let cart = window.localStorage.getItem('cart');
  cart = cart && JSON.parse(cart);

  if (cart === null) {
    alert('장바구니가 비어있습니다.');
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    const cartProductId = cart[i].id;
    if (cartProductId === id) cart.splice(i, 1);
  }

  if (cart.length < 1) {
    // LocalStorage 값 삭제
    window.localStorage.removeItem('cart');

    // 장바구니가 없을 때 레이아웃으로 수정
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cartAmount.innerText = 0;
    cartLoad();
    return;
  }

  window.localStorage.setItem('cart', JSON.stringify(cart));

  // 레이아웃을 수정합니다.
  const cartItem = document.querySelector(`li[data-list-product-id="${id}"]`);
  cartItem.remove();
  cartAmount.innerText = cartAmount.innerText - 1;

  // 가격 표시 변동
  priceSetup();
}

/**
 * 상품의 아이디와 수량을 받아서 LocalStorage를 수정합니다.
 * @param {String} id
 * @param {Number} value
 * @returns
 */
function updateCart(id, value) {
  let cart = window.localStorage.getItem('cart');
  cart = cart && JSON.parse(cart);

  if (cart === null) {
    alert('장바구니가 비어있습니다.');
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    const cartProductId = cart[i].id;
    if (cartProductId === id) cart[i].amount = value;
  }

  window.localStorage.setItem('cart', JSON.stringify(cart));
}

export { btnsSetup };
