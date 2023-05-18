import { createHeader } from '/src/default_layout/header.js';
import { createFooter } from '/src/default_layout/footer.js';
import { execDaumPostcode } from '/src/modules/orderModules/inputUserAddress.js';
import { autoHyphen } from '/src/modules/sign_upModules/autoHyphenPhoneNumber.js';
import { errorMsg } from '/src/modules/sign_upModules/validationErrMsg.js';
import { getUserProfile } from '/src/modules/edit_profileModules/get_user_profile.js';
import { setUserProfile } from '/src/modules/edit_profileModules/set_user_profile.js';
import { deleteMyAccount } from '/src/modules/edit_profileModules/delete_MyAccount.js';
import { editMyAccount } from '/src/modules/edit_profileModules/edit_MyAccount.js';

document.addEventListener('DOMContentLoaded', () => {
  createHeader();
  createFooter();
  getUserProfile();
  setUserProfile();
});

document
  .getElementById('getuserAddress')
  .addEventListener('click', execDaumPostcode);
document
  .getElementById('user-phone-number')
  .addEventListener('input', autoHyphen);
document.getElementById('user-Password').addEventListener('change', errorMsg);
document
  .getElementById('user-PasswordCheck')
  .addEventListener('change', errorMsg);
document.getElementById('editSubmit').addEventListener('click', editMyAccount);
document
  .getElementById('deleteMember')
  .addEventListener('click', deleteMyAccount);
