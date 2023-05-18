const recListLeftArrow = document.querySelector('#rec-list-left-arrow');
const recListRightArrow = document.querySelector('#rec-list-right-arrow');
const recListSlides = document.querySelector('#rec-list-slides');
const newListLeftArrow = document.querySelector('#new-list-left-arrow');
const newListRightArrow = document.querySelector('#new-list-right-arrow');
const newListSlides = document.querySelector('#new-list-slides');

import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

const PER_SLIDE_PAGE = 4;
const WRAP_SIZE = 1100;

// 슬라이더 넘기는 횟수를 제한하기 위해 슬라이드 개수를 카운트합니다.
let recCount = 0;
let newCount = 0;

/**
 * 서버에서 상품 정보를 받아오고, 슬라이드를 초기화합니다.
 */
function slideSetup() {
  // console.log('slideSetting 진입함');
  // !!! 더미 url이 들어가있음! 추후 변경 필요 !!!
  recListGenerator();
  newListGenerator();

  // 슬라이더를 움직일 좌우 버튼에 대한 리스너를 등록합니다.
  recListLeftArrow.addEventListener('click', recListLeftSlide);
  recListRightArrow.addEventListener('click', recListRightSlide);

  newListLeftArrow.addEventListener('click', newListLeftSlide);
  newListRightArrow.addEventListener('click', newListRightSlide);
}

/**
 * GET API를 통해 상품 리스트를 받아와서 슬라이드를 작성합니다.
 * @param {상품 리스트 GET} url
 */
async function recListGenerator() {
  // 서버에서 JSON 형식의 데이터를 받아옵니다.
  const datas = await Fetcher.getAllProducts();
  const recommendedProducts = datas.filter(
    (data) => Number(data.recommended) > 0
  );

  for (let product of recommendedProducts) {
    // 슬라이드 내부 요소
    const li = document.createElement('li');
    const imgDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    const img = document.createElement('img');
    const a = document.createElement('a');
    const p = document.createElement('p');

    // 요소 클래스 설정
    li.classList.add(
      'w-[255px]',
      'flex-shrink-0',
      'flex',
      'flex-col',
      'mx-[10px]'
    );
    imgDiv.classList.add(
      'w-[255px]',
      'h-[255px]',
      'overflow-hidden',
      'rounded-3xl',
      'mb-4',
      'cursor-pointer'
    );
    img.classList.add(
      'w-[255px]',
      'h-[255px]',
      'object-cover',
      'scale-105',
      'transition-transform',
      'duration-300',
      'ease-in-out',
      'transform',
      'hover:scale-110',
      'transition-duration-300',
      'hover:duration-300'
    );
    a.classList.add('no-underline', 'text-xl', 'font-semibold');
    p.classList.add('text-base', 'font-normal');

    // 슬라이드에 데이터 삽입
    const productDetailPageUrl = `/src/pages/goods/goods.html?productId=${product._id}`;
    img.src = product.img;
    img.addEventListener('click', () => {
      window.location.href = productDetailPageUrl;
    });
    a.innerText = product.name;
    a.href = productDetailPageUrl;
    p.innerText = Number(product.price).toLocaleString() + ' 원';

    // 각 요소 합치기
    textDiv.appendChild(a);
    textDiv.appendChild(p);
    imgDiv.appendChild(img);
    li.appendChild(imgDiv);
    li.appendChild(textDiv);

    // listSlideWrap에 위에서 만든 슬라이드 추가;
    recListSlides.appendChild(li);
    recCount++;
  }
  // 슬라이더에 대한 기본 설정을 초기화합니다.
  recListSlides.style.marginLeft = 0 + 'px';
}

function recListLeftSlide(e) {
  e.preventDefault();
  e.stopPropagation();

  const marginLeftValue = parseInt(recListSlides.style.marginLeft);

  if (marginLeftValue < 0) {
    let from = parseInt(recListSlides.style.marginLeft);
    let to = parseInt(recListSlides.style.marginLeft) + WRAP_SIZE;

    recListSlides.animate(
      {
        marginLeft: [from + 'px', to + 'px'],
      },
      {
        duration: 500,
        easing: 'ease',
        iterations: 1,
        fill: 'both',
      }
    );

    // 애니메이션은 실제로 값이 바뀌지 않기 때문에, 실제 값을 추가로 넣어줘야함
    recListSlides.style.marginLeft =
      parseInt(recListSlides.style.marginLeft) + WRAP_SIZE + 'px';
  }
}

function recListRightSlide(e) {
  e.preventDefault();
  e.stopPropagation();

  const marginLeftValue = parseInt(recListSlides.style.marginLeft);
  const totalPage = Math.ceil(recCount / PER_SLIDE_PAGE);

  if (marginLeftValue > (totalPage - 1) * WRAP_SIZE * -1) {
    let from = parseInt(recListSlides.style.marginLeft);
    let to = parseInt(recListSlides.style.marginLeft) - WRAP_SIZE;

    recListSlides.animate(
      {
        marginLeft: [from + 'px', to + 'px'],
      },
      {
        duration: 500,
        easing: 'ease',
        iterations: 1,
        fill: 'both',
      }
    );

    // 애니메이션은 실제로 값이 바뀌지 않기 때문에, 실제 값을 추가로 넣어줘야함
    recListSlides.style.marginLeft =
      parseInt(recListSlides.style.marginLeft) - WRAP_SIZE + 'px';
  }
}

/**
 * GET API를 통해 상품 리스트를 받아와서 슬라이드를 작성합니다.
 * @param {상품 리스트 GET} url
 */
async function newListGenerator() {
  // 서버에서 JSON 형식의 데이터를 받아옵니다.
  const latestProducts = await Fetcher.getCategoryProducts('latest');

  for (let product of latestProducts) {
    // 슬라이드 내부 요소
    const li = document.createElement('li');
    const imgDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    const img = document.createElement('img');
    const a = document.createElement('a');
    const p = document.createElement('p');

    // 요소 클래스 설정
    li.classList.add(
      'w-[255px]',
      'flex-shrink-0',
      'flex',
      'flex-col',
      'mx-[10px]'
    );
    imgDiv.classList.add(
      'w-[255px]',
      'h-[255px]',
      'overflow-hidden',
      'rounded-3xl',
      'mb-4',
      'cursor-pointer'
    );
    img.classList.add(
      'w-[255px]',
      'h-[255px]',
      'object-cover',
      'scale-105',
      'transition-transform',
      'duration-300',
      'ease-in-out',
      'transform',
      'hover:scale-110',
      'transition-duration-300',
      'hover:duration-300'
    );
    a.classList.add('no-underline', 'text-xl', 'font-semibold');
    p.classList.add('text-base', 'font-normal');

    // 슬라이드에 데이터 삽입
    const productDetailPageUrl = `/src/pages/goods/goods.html?productId=${product._id}`;
    img.src = product.img;
    img.addEventListener('click', () => {
      window.location.href = productDetailPageUrl;
    });
    a.innerText = product.name;
    a.href = productDetailPageUrl;
    p.innerText = Number(product.price).toLocaleString() + ' 원';

    // 각 요소 합치기
    textDiv.appendChild(a);
    textDiv.appendChild(p);
    imgDiv.appendChild(img);
    li.appendChild(imgDiv);
    li.appendChild(textDiv);

    // listSlideWrap에 위에서 만든 슬라이드 추가;
    newListSlides.appendChild(li);
    newCount++;
  }
  // 슬라이더에 대한 기본 설정을 초기화합니다.
  newListSlides.style.marginLeft = 0 + 'px';
}

function newListLeftSlide(e) {
  e.preventDefault();
  e.stopPropagation();

  const marginLeftValue = parseInt(newListSlides.style.marginLeft);

  if (marginLeftValue < 0) {
    let from = parseInt(newListSlides.style.marginLeft);
    let to = parseInt(newListSlides.style.marginLeft) + WRAP_SIZE;

    newListSlides.animate(
      {
        marginLeft: [from + 'px', to + 'px'],
      },
      {
        duration: 500,
        easing: 'ease',
        iterations: 1,
        fill: 'both',
      }
    );

    // 애니메이션은 실제로 값이 바뀌지 않기 때문에, 실제 값을 추가로 넣어줘야함
    newListSlides.style.marginLeft =
      parseInt(newListSlides.style.marginLeft) + WRAP_SIZE + 'px';
  }
}

function newListRightSlide(e) {
  e.preventDefault();
  e.stopPropagation();

  const marginLeftValue = parseInt(newListSlides.style.marginLeft);
  const totalPage = Math.ceil(newCount / PER_SLIDE_PAGE);

  if (marginLeftValue > (totalPage - 1) * WRAP_SIZE * -1) {
    let from = parseInt(newListSlides.style.marginLeft);
    let to = parseInt(newListSlides.style.marginLeft) - WRAP_SIZE;

    newListSlides.animate(
      {
        marginLeft: [from + 'px', to + 'px'],
      },
      {
        duration: 500,
        easing: 'ease',
        iterations: 1,
        fill: 'both',
      }
    );

    // 애니메이션은 실제로 값이 바뀌지 않기 때문에, 실제 값을 추가로 넣어줘야함
    newListSlides.style.marginLeft =
      parseInt(newListSlides.style.marginLeft) - WRAP_SIZE + 'px';
  }
}

export { slideSetup };
