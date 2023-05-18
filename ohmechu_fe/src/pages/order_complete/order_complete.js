import { createHeader } from '/src/default_layout/header.js';
import { createFooter } from '/src/default_layout/footer.js';
import { showOrderId } from '/src/modules/order_completeModules/getOrderId.js';
import { getReceiverProfile } from '/src/modules/order_completeModules/getReceiverProfile.js';
import { getOrderPrice } from '/src/modules/order_completeModules/getOrderPrice.js';
import { checkOrder } from '/src/modules/order_completeModules/checkMyOrder.js';

document.addEventListener('DOMContentLoaded', createHeader);
document.addEventListener('DOMContentLoaded', createFooter);
document.addEventListener('DOMContentLoaded', showOrderId);
document.addEventListener('DOMContentLoaded', getReceiverProfile);
document.addEventListener('DOMContentLoaded', getOrderPrice);
document.getElementById('check-order').addEventListener('click', checkOrder);
