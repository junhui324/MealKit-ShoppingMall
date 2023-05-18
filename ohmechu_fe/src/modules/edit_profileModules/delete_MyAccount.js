import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';
import * as Token from '/src/modules/api_methodModules/Token.js';

async function deleteMyAccount(e) {
  e.preventDefault();
  e.stopPropagation();
  const confirmed = confirm('정말로 계정을 삭제하시겠습니까?');
  if (!confirmed) {
    return;
  }
  try {
    const data = await Fetcher.checkToken(Token.getToken);
    if (!data) {
      throw new Error('토큰이 유효하지 않습니다.');
    }
    const response = await Fetcher.deleteUser();

    if (response) {
      Token.removeToken();
      window.location.href = '/src/pages/main/index.html';
    }
  } catch (error) {
    console.error(`계정 삭제 실패: ${error}`);
    alert('다시 로그인해주세요.');
  }
}
export { deleteMyAccount };

//      const data = await Fetcher.getUser();
// const response = await Fetcher.deleteUser(data.password);
