import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';
import { addCart } from '/src/modules/itemDetail/addCart.js';

/**
 * PROCESS
 * 현재 URL의 productId search
 * 해당 id를 DB에서 조회 => Fetcher.getIdProduct
 * 조회한 DB의 키 값 바탕으로 페이지에 띄우기
 */

// URL productId 값 가져오기
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const productId = params.get('productId');

// setProductInfo 들어갈 변수들 값 세팅
export async function setParams() {
  const mainPage = document.getElementById('main-page');
  mainPage.innerHTML = '';

  const productInfo = await Fetcher.getIdProduct(productId);

  mainPage.innerHTML += setProductInfo(
    productInfo.img,
    productInfo.name,
    productInfo.subDescription[0],
    productInfo.subDescription[1],
    productInfo.subDescription[2],
    productInfo.description,
    productInfo.price.toLocaleString('ko-kr')
  );

  addCart();
}

// productInfo 페이지에 적용
function setProductInfo(img, name, serving, time, tasty, description, price) {
  return `<div class="inline-block w-1/2 color-sec h-[600px] mr-4">
  <img src="${img}" class="w-full h-[600px] object-cover object-center" />
</div>
<div class="inline-block w-1/2 ml-4">
  <div class="flex flex-col mx-auto justify-center items-center">
    <p></p>
    <h3 class="text-center text-3xl font-medium pt-8">${name}</h3>
    <div class="sub-description mt-8">
      <span class="serving border-r-2 pr-2">${serving}</span>
      <span class="cooking-time border-r-2 pl-1 pr-2">조리 ${time}</span>
      <span class="tasty pl-1">${tasty}</span>
      <p
        class="description w-[90%] mx-auto mt-6 py-4 border-y border-[#22392a] text-lg text-justify whitespace-normal"
      >
        ${description}
      </p>
    </div>
    <div class="self-end mt-6">
      <span class="text-right my-auto mr-3 text-color-sec text-lg"
        >${serving}</span
      >
      <span class="text-right my-auto h-9 mr-12 text-3xl font-bold"
        >${price}원</span
      >
    </div>
    <button
      id="order-product"
      class="my-auto w-4/5 py-4 mt-12 border border-color-sec hover:bg-[#22392a] hover:border-[#22392a] hover:text-[#f7f3eb] trans text-center text-base font-medium focus:outline-none"
    >
      장바구니
    </button>
  </div>
</div>`;
}
