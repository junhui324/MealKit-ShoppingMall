function orderedListTemplate(data, amountData) {
  const orderedGoodsList = document.createElement('tr');
  orderedGoodsList.classList.add('flex', 'justify-between');

  orderedGoodsList.innerHTML = `
    <td class="flex flex-shrink-0 w-[25%]">
          <img src="${
            data.img
          }" class="w-[150px] h-[150px] object-cover object-center" />
        </td>
        <td class="flex flex-col justify-center flex-grow w-[30%]">
          <span class="block text-left text-[17px] font-medium">${
            data.name
          }</span>
          <span class="block text-left text-[13px] text-neutral-500">${data.subDescription.join(
            ' / '
          )}</span>
        </td>
        <td class="flex flex-shrink-0 items-center w-[10%] justify-end">
          <span class="text-xl font-semibold">${amountData.amount}</span>
          <span class="text-xl font-semibold ml-1"> 개</span>
        </td>
        <td class="flex flex-shrink-0 items-center w-[30%] justify-end">
          <span class="flex text-xl font-semibold w-[50%] justify-end">${(
            data.price * amountData.amount
          ).toLocaleString('ko-KR')}</span>
          <span class="text-xl font-semibold mx-2"> 원</span>
        </td>`;
  return orderedGoodsList;
}
export { orderedListTemplate };
