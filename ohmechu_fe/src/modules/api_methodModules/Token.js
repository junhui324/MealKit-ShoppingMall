/**
 * 토큰 값으로 쿠키에 'token'이라는 이름으로 쿠키를 저장합니다.
 * @param {String} tokenValue
 */
function setToken(tokenValue) {
  document.cookie = `accessToken=${tokenValue}; path=/`;
}

/**
 * 쿠키에 저장된 토큰 값을 반환합니다. 토큰이 없다면 undefined을 반환합니다.
 * @returns String OR undefined
 */
function getToken() {
  const cookieList = document.cookie.split('; ');
  const cookies = {};

  for (let cookie of cookieList) {
    const [cookieKey, cookieValue] = cookie.split('=');
    cookies[cookieKey] = cookieValue;
  }

  return cookies.accessToken;
}

/**
 * 토큰 쿠키를 삭제합니다.
 */
function removeToken() {
  document.cookie =
    'accessToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
}

/**
 * 유효하지 않은 토큰 발생시 호출해주세요.
 * try-catch시 err.message === '401'과 같이 사용
 */
function handleInvalidToken() {
  removeToken();

  if (confirm('로그인이 유효하지 않습니다.\n다시 로그인 해주세요.'))
    window.location.href = '/src/pages/login/login.html';
  else window.location.reload();
}

export { setToken, getToken, removeToken, handleInvalidToken };
