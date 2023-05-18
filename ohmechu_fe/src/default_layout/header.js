import * as Token from '/src/modules/api_methodModules/Token.js';

function createHeader() {
  const header = document.createElement('header');
  header.className = `w-full`;
  header.innerHTML = `<div class="mx-auto px-4 w-5/6" id="closed">
  <div class="w-full h-9 flex items-center hidden sm:flex justify-end">
    <ul id="page-button-list" class="text-center text-color-sec">
      <li
        id="login-page-button"
        class="inline-block font-normal text-xs pr-3 border-r border-color-sec align-middle"
      >
      <a href="/src/pages/login/login.html">로그인</a>
      </li>
      <li
        id="sign-up-page-button"
        class="inline-block font-normal text-xs px-3 align-middle"
      ><a href="/src/pages/sign_up/sign_up.html">
        회원가입</a>
      </li>
    </ul>
  </div>
</div>
<nav
  class="h-[90px] color-sec flex justify-between items-center flex-no-wrap text-lg text-color-ter bg-transparent "
  id="header"
>
  <h1 class="inline-block bg-transparent pl-[6%] flex-shrink-0">
    <a href="/src/pages/main/index.html"
      ><img
        src="/src/img/omc_logo.png"
        class="max-h-[37.5px] bg-transparent"
        alt="오늘의메뉴추천"
    /></a>
  </h1>

  <ul
    class="bg-transparent flex items-center flex-no-wrap px-[5%] w-[75%]"
  >
    <li class="inline-block mr-[4%]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.3"
        stroke="currentColor"
        class="h-6 inline-block"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <a href="/src/pages/category/category.html" class="inline-block align-bottom">전체상품</a>
    </li>
    <li class="inline-block mr-[4%]">
    <span><a href="/src/pages/category/category.html?sort=recommended">추천상품</a></span>
  </li>
    <li class="inline-block mr-[4%]">
      <span><a href="/src/pages/category/category.html?sort=latest" class="">새로운 상품</a></span>
    </li>
  </ul>
  <div class="w-[13%] flex justify-evenly pr-[6%]">
    <a href="" class="mr-[8%]"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.3"
        stroke="currentColor"
        class="mypage-button w-8 h-8 inline-block mr-[8%]"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </a>
    <a href="/src/pages/cart/cart.html" class=""
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.3"
        stroke="currentColor"
        class="w-8 h-8 inline-block"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
    </a>
  </div>
</nav>
   `;
  document.body.prepend(header);

  // 로그인 상태일시 로그인, 회원가입 버튼을 숨기고, 로그아웃, 마이페이지, 주문조회 버튼을 만듭니다.
  const loginPageButton = document.getElementById('login-page-button');
  const signUpPageButton = document.getElementById('sign-up-page-button');
  const pageButtonList = document.getElementById('page-button-list');
  const myPageBtn = document.querySelector('.mypage-button');

  if (isLogin()) {
    loginPageButton.classList.add('hidden');
    signUpPageButton.classList.add('hidden');
    pageButtonList.innerHTML =
      `
    <li
    class="inline-block font-normal text-xs pr-3 border-r border-color-sec align-middle"
    >
    <span class="cursor-pointer" id="logout-button" href="">로그아웃</a>
    </li>
    <li
      class="inline-block font-normal text-xs px-3 border-r border-color-sec align-middle"
    ><a href="/src/pages/mypage/mypage.html">
      마이페이지</a>
    </li>
    <li
      class="inline-block font-normal text-xs px-3 align-middle"
    >
    <a href="/src/pages/order_list/order_list.html">주문조회</a>
    </li>` + pageButtonList.innerHTML;

    // 로그아웃 버튼에 이벤트를 할당합니다.
    document.getElementById('logout-button').addEventListener('click', logout);
    myPageBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/src/pages/mypage/mypage.html';
    });
  }

  // 비회원일 때 마이페이지 누르면 로그인 페이지로 이동 confirm
  else {
    const myPageBtn = document.querySelector('.mypage-button');

    myPageBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/src/pages/login/login.html';
    });
  }
}

function isLogin() {
  const token = Token.getToken();

  return token !== undefined;
}

async function logout() {
  // 로그아웃 API를 호출합니다.
  try {
    await Fetcher.logoutUser();
  } catch (err) {
    console.log(err);
  }

  // token 쿠키를 삭제합니다.
  Token.removeToken();
  window.location.reload();
}

export { createHeader };
