import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

const purchasePrice = document.getElementById('purchase-price');
const deliveryPrice = document.getElementById('delivery-price');
const totalPrice = document.getElementById('total-price');

const DELIVERY_PRICE = 3000;

async function priceSetup() {
  const datas = await Fetcher.getAllProducts();

  let cart = window.localStorage.getItem('cart');
  cart = cart ? JSON.parse(cart) : [];

  let purchasePriceCount = 0;

  for (let item of cart) {
    const product = datas.find((data) => data._id === item.id);
    purchasePriceCount += Number(product.price) * item.amount;
  }

  purchasePrice.innerText = purchasePriceCount.toLocaleString();
  deliveryPrice.innerText = DELIVERY_PRICE.toLocaleString();
  totalPrice.innerText = (purchasePriceCount + DELIVERY_PRICE).toLocaleString();
}

export { priceSetup };
