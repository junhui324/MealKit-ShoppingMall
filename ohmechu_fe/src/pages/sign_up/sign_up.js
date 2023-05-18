import { createHeader } from '/src/default_layout/header.js';
import { createFooter } from '/src/default_layout/footer.js';
import { execDaumPostcode } from '/src/modules/orderModules/inputUserAddress.js';
import { autoHyphen } from '/src/modules/sign_upModules/autoHyphenPhoneNumber.js';
import { errorMsg } from '/src/modules/sign_upModules/validationErrMsg.js';
import { postUserSignup } from '/src/modules/sign_upModules/postUserSignup.js';

document.addEventListener('DOMContentLoaded', createHeader);
document.addEventListener('DOMContentLoaded', createFooter);
document
  .getElementById('getuserAddress')
  .addEventListener('click', execDaumPostcode);

document
  .getElementById('user-phone-number')
  .addEventListener('input', autoHyphen);

document.getElementById('userId').addEventListener('change', errorMsg);
document.getElementById('user-Password').addEventListener('change', errorMsg);
document
  .getElementById('user-PasswordCheck')
  .addEventListener('change', errorMsg);
document.getElementById('userName').addEventListener('change', errorMsg);

document.getElementById('signup').addEventListener('click', postUserSignup);
