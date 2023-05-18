import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

async function priceSetting() {
  // !!! 임시 API 주소임 !!!
  const purchasePrice = document.getElementById('purchasePrice');
  const deliveryPrice = document.getElementById('delivery-price');
  const totalPrice = document.getElementById('total-price');

  let cart = window.localStorage.getItem('cart');
  cart = cart ? JSON.parse(cart) : [];

  // const datas = await getDummyProducts();

  let purchasePriceCount = 0;
  let deliveryPriceCount = 3000;

  for (let item of cart) {
    const product = await Fetcher.getIdProduct(item.id);
    purchasePriceCount += Number(product.price) * item.amount;
  }

  purchasePrice.innerText = purchasePriceCount.toLocaleString('ko-KR');
  deliveryPrice.innerText = deliveryPriceCount.toLocaleString('ko-KR');
  totalPrice.innerText = `${Number(
    purchasePriceCount + deliveryPriceCount
  ).toLocaleString('ko-KR')}`;
}
export { priceSetting };
