import { cartLoad } from './cartLoad.js';
import { priceSetup } from './priceSetting.js';

// 체크 박스들
const allProductsSelectBox = document.getElementById('all-products-select');
const checkBoxes = document.getElementsByClassName('check-box');
// 선택 삭제, 선택 주문 버튼
const deleteSelectButton = document.getElementById('delete-select');
const orderSelectButton = document.getElementById('order-select');

function checkBoxSetup() {
  // 전체 선택 버튼에 대한 세팅을 진행합니다.
  allProductsSelectBox.addEventListener('change', allProductSelect);
  // 선택 삭제, 선택 주문 버튼에 대한 세팅을 진행합니다.
  deleteSelectButton.addEventListener('click', deleteSelect);
  orderSelectButton.addEventListener('click', orderSelect);
}

function allProductSelect(e) {
  // 기본 액션을 제거합니다.
  e.preventDefault();
  e.stopPropagation();

  // 전체 선택 체크박스에 따라 하위 체크박스들을 조정합니다.
  if (this.checked) for (let checkBox of checkBoxes) checkBox.checked = true;
  else for (let checkBox of checkBoxes) checkBox.checked = false;
}

function deleteSelect(e) {
  // 기본 액션을 제거합니다.
  e.preventDefault();
  e.stopPropagation();

  // 체크된 아이템들을 LocalStorage에서 비웁니다.
  const checkedItemsIdList = checkedItems();
  let cart = window.localStorage.getItem('cart');
  cart = cart && JSON.parse(cart);

  if (cart === null) {
    alert('장바구니가 비어있습니다.');
    return;
  }

  for (let checkedItemId of checkedItemsIdList) {
    const index = cart.findIndex((product) => product.id === checkedItemId);
    document
      .querySelector(`li[data-list-product-id="${checkedItemId}"]`)
      .remove();
    cart.splice(index, 1);
  }

  if (cart.length < 1) window.localStorage.removeItem('cart');
  else window.localStorage.setItem('cart', JSON.stringify(cart));

  priceSetup();
  // cartLoad();
}

function orderSelect(e) {
  // 기본 액션을 제거합니다.
  e.preventDefault();
  e.stopPropagation();

  // 체크된 아이템들만 localStorage 장바구니에 저장합니다.
  const checkedItemsIdList = checkedItems();
  let cart = window.localStorage.getItem('cart');
  cart = cart && JSON.parse(cart);

  if (cart === null) {
    alert('장바구니가 비어있습니다.');
    return;
  }

  if (checkedItemsIdList.length < 1) {
    alert('선택된 상품이 없습니다.');
    return;
  }

  let orderCart = cart.filter((item) => checkedItemsIdList.includes(item.id));
  window.localStorage.setItem('cart', JSON.stringify(orderCart));

  // 상품 주문 페이지로 이동합니다.
  location.href = '/src/pages/order/order.html';
}

/**
 * 체크된 아이템 아이디만을 배열로 반환합니다.
 */
function checkedItems() {
  const checkedItemsIdList = [];

  for (let checkBox of checkBoxes)
    if (checkBox.checked) checkedItemsIdList.push(checkBox.dataset.productId);

  return checkedItemsIdList;
}

export { checkBoxSetup };
