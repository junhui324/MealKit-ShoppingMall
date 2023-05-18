export function addCart() {
  const addCartBtn = document.getElementById('order-product');
  console.log(addCartBtn);
  addCartBtn.addEventListener('click', cartBtnEvent);
}

export function cartBtnEvent() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('productId');

  let basicData = { id: productId, amount: 1 };
  let cartData = JSON.parse(window.localStorage.getItem('cart'));
  if (!cartData) {
    window.localStorage.setItem(
      'cart',
      JSON.stringify([{ id: productId, amount: 1 }])
    );
    alert('장바구니에 상품을 추가했습니다. 현재 상품의 개수는 1개 입니다.');
  } else {
    for (let i = 0; i < cartData.length; i++) {
      // 원래 value.amount + 1된 새로운 자료들 저장
      // 기존 value 삭제
      // 새로운 value setItem
      if (cartData[i].id === productId) {
        basicData.amount = cartData[i].amount + 1;
        // 원래 데이터 없애고 새로 추가해야 하므로 splice
        cartData.splice(i, 1);
      }
    }
    // 아니면 그냥 기본 데이터 저장 & 맞다면 if문 적용
    cartData.push(basicData);
    window.localStorage.setItem('cart', JSON.stringify(cartData));
    alert(
      `장바구니에 상품을 추가했습니다. 현재 상품의 개수는 ${basicData.amount}개 입니다.`
    );
  }
}
