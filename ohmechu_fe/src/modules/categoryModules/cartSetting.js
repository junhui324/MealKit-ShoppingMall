const cartInButtons = document.getElementsByClassName('cart-in-button');
const AMOUNT_INIT = 1;

/**
 * 장바구니 버튼에 대한 이벤트를 추가합니다.
 */
function cartSetup() {
  for (let cart of cartInButtons) {
    cart.addEventListener('click', cartIn);
  }
}

/**
 * 장바구니 버튼의 id값(data._id)과 수량을 localStorage에 저장합니다.
 * @param {이벤트 객체} e
 */
function cartIn(e) {
  // 기본 액션을 제거합니다.
  e.preventDefault();
  e.stopPropagation();

  // 장바구니 애니메이션을 작동시킵니다.
  cartInConfirm(this);

  // 버튼에서 id를 받아옵니다.
  const id = this.dataset.id;
  const product = {
    id: id,
    amount: AMOUNT_INIT,
  };

  // 이미 존재하는 LocalStorage의 값을 받아와서 세팅합니다.
  // 원래 장바구니 값이 없었을 때, 배열 []로 초기화합니다.
  let cart = window.localStorage.getItem('cart');
  cart = cart ? JSON.parse(cart) : [];

  if (cart.length > 0)
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === product.id) {
        product.amount = cart[i].amount + 1;
        cart.splice(i, 1);
      }
    }
  cart.push(product);

  // JSON 형태로 localStorage에 넘겨줍니다.
  window.localStorage.setItem('cart', JSON.stringify(cart));
}

function cartInConfirm(svg) {
  setTimeout(() => window.alert('장바구니에 추가 되었습니다.'), 0);

  svg.classList.add('animate-[cartIn_0.5s_ease-in-out_1]');
  setTimeout(
    () => svg.classList.remove('animate-[cartIn_0.5s_ease-in-out_1]'),
    500
  );
}

export { cartSetup };
