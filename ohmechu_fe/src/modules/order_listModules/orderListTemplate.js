export function listTemplate(data, amountData) {
  const goodsList = document.createElement('li');
  goodsList.classList.add(
    'pb-6',
    'mb-6',
    'flex',
    'item-center',
    'justify-between',
    'flex-no-wrap',
    'border-solid',
    'border-b',
    'border-gray'
  );
  const descriptionOneLine = data.description.split('.')[0] + '.';
  goodsList.innerHTML = `
<div class="flex items-center">
  <img
    src="${data.img}"
    class="inline-block w-[150px] h-[150px] flex-shrink-0 object-cover object-center"
  />
  <div class="inline-block ml-6">
    <p class="flex-col">
      <span class="block text-left text-[17px] font-semibold"
        >${data.name}</span
      ><span
        span
        class="block text-left text-[13px] text-neutral-500"
        >${descriptionOneLine}</span
      >
    </p>
  </div>
</div>
<!-- 상품 우측 수량, 금액, 취소버튼 -->
<div class="flex items-center">
  <!-- 상품 수량 -->
  <div class="custom-number-input w-[110px] mr-28">
  <span class="text-xl font-semibold">${amountData.amount}</span>
  <span class="text-xl font-semibold ml-1"> 개</span>
  </div>
  <!-- 상품 금액 -->
  <span class="text-xl font-semibold">${Number(
    data.price * amountData.amount
  ).toLocaleString('ko-KR')}</span
  ><span class="text-xl font-semibold ml-1 mr-4"> 원</span> 
</div>`;
  return goodsList;
}
