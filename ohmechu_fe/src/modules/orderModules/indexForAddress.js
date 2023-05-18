import { execDaumPostcode } from '/order/getuserAddress.js';

async function getDaumPostcode() {
  try {
    await execDaumPostcode();
  } catch (error) {
    alert('잘못된 접근입니다.');
  }
}

document
  .getElementById('getuserAddress')
  .addEventListener('click', getDaumPostcode);
