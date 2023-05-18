import * as Fetcher from '../../modules/api_methodModules/Fetcher.js';

/**
 * PROCESS
 * 이미지 클릭
 * 클릭상품 id값 통해 URL => ~~~?productId=135155t 변경
 * searchParams 통해 /products/${productId} 값 가져와서 DB 접근
 * 해당 상품 정보 가져오기
 */

const productImg = document.getElementsByClassName('product-img');

export function moveToDetail() {
  for (let list of productImg) {
    list.addEventListener('click', listToDetail);
  }
}

async function listToDetail(e) {
  e.preventDefault();
  e.stopPropagation();

  // 이미지 Url을 받아옵니다.
  const url = new URL(e.target.src);
  const currentPath = url.href;

  // 모든 상품을 받아와서 이미지 Url이 동일한 상품을 찾습니다.
  const allProducts = await Fetcher.getAllProducts();
  const targetProduct = allProducts.filter(
    (product) => product.img === currentPath
  )[0];

  // 찾은 상품의 id를 productId로 할당하고, 해당 id를 통해 상품을 검색합니다.
  const productId = targetProduct._id;
  const productInfo = await Fetcher.getIdProduct(productId);

  // 이미지 Url과 찾은 상품의 이미지 Url이 같으면 이동합니다.
  if (currentPath === targetProduct.img) {
    window.location.href = `/src/pages/goods/goods.html?productId=${productInfo._id}`;
  } else {
    alert('해당 상품이 존재하지 않습니다.');
    return;
  }
}
