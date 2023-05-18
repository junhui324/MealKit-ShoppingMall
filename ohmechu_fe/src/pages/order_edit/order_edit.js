import { createHeader } from '/src/default_layout/header.js';
import { createFooter } from '/src/default_layout/footer.js';
import { execDaumPostcode } from '/src/modules/orderModules/inputUserAddress.js';
import { orderdIdGoodsList } from '/src/modules/order_editModules/orderdIdGoodsList.js';
import { autoHyphen } from '/src/modules/sign_upModules/autoHyphenPhoneNumber.js';
import { showOrderId } from '/src/modules/order_completeModules/getOrderId.js';
import { orderedReceiverProfile } from '/src/modules/order_editModules/orderedReceiverProfile.js';
import { getOrderPrice } from '/src/modules/order_completeModules/getOrderPrice.js';
import { deleteAllOrder } from '/src/modules/order_editModules/deleteAllOrder.js';
import { sendShippingData } from '/src/modules/order_editModules/editUserShippingInput.js';

document.addEventListener('DOMContentLoaded', createHeader);
document.addEventListener('DOMContentLoaded', createFooter);
document.addEventListener('DOMContentLoaded', showOrderId);
document.addEventListener('DOMContentLoaded', orderdIdGoodsList);
document.addEventListener('DOMContentLoaded', orderedReceiverProfile);
document.addEventListener('DOMContentLoaded', getOrderPrice);

document
  .getElementById('getuserAddress')
  .addEventListener('click', execDaumPostcode);
document
  .getElementById('receiver-phone-number')
  .addEventListener('input', autoHyphen);

document.getElementById('delete-all').addEventListener('click', deleteAllOrder);
document
  .getElementById('edit-submit')
  .addEventListener('click', sendShippingData);

document.getElementById('back-topage').addEventListener('click', () => {
  console.log('돌아가기!!!!!!');
  history.go(-1);
});
