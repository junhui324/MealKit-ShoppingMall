import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

export async function mainToDetail() {
  const mainMenu = document.querySelector('.main-menu');
  const searchBtn = document.querySelector('.search-button');

  searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 이미지 Url을 받아옵니다.
    const url = new URL(mainMenu.src);
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
  });
}
