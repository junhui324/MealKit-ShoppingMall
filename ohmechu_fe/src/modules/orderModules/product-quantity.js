function decrement(e) {
  // 버튼 클릭시 클릭한 부모 요소+조상 요소에서 data-action이 decrement인 요소
  // (버튼 id를 넣는 대신 data-action속성이 들어간 버튼을 공통으로 활용 가능하도록) -> 그 버튼만 필요하다면 btn 4, 18줄 정의를 변경하세요!
  const btn = e.target.parentNode.parentElement.querySelector(
    'button[data-action="decrement"]'
  );
  // 옆에 있는 숫자를 조절해줘야해서 target 지정
  const target = btn.nextElementSibling;
  let value = Number(target.value);
  // 값이 1 이상인 경우에만 감소하도록
  if (value > 1) {
    value--;
    target.value = value;
  }
}

function increment(e) {
  const btn = e.target.parentNode.parentElement.querySelector(
    'button[data-action="decrement"]'
  );
  const target = btn.nextElementSibling;
  let value = Number(target.value);
  // 99까지만 담을 수 있어요
  if (value < 100) {
    value++;
    target.value = value;
  }
}

const decrementBtns = document.querySelectorAll(
  `button[data-action="decrement"]`
);

const incrementBtns = document.querySelectorAll(
  `button[data-action="increment"]`
);

decrementBtns.forEach((btn) => {
  btn.addEventListener('click', decrement);
});

incrementBtns.forEach((btn) => {
  btn.addEventListener('click', increment);
});
