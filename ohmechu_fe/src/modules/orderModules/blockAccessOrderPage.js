function blockAccess(e) {
  const cartData = localStorage.getItem('cart');
  if (!cartData || cartData.length === 0) {
    e.preventDefault();
    e.returnValue = '';
    alert('결제하려는 상품이 없습니다.');
    window.location.href = '/src/pages/main/index.html';
  }
}

export { blockAccess };
