import * as Fetcher from '/src/modules/api_methodModules/Fetcher.js';

async function getUserProfile() {
  const userEmail = document.getElementById('userId');
  const userName = document.getElementById('userName');
  const userBirth = document.getElementById('userBirth');

  try {
    const data = await Fetcher.getUser();
    userEmail.innerText = data.email;
    userName.innerText = data.userName;
    userBirth.innerText = data.birth;
  } catch (error) {
    alert('회원 정보를 불러오는데 실패했습니다.');
  }
}

export { getUserProfile };
