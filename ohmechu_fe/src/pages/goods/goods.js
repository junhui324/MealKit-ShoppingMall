import { createHeader } from '../../default_layout/header.js';
import { createFooter } from '../../default_layout/footer.js';
import { setParams } from '../../modules/itemDetail/itemDetail.js';

document.addEventListener('DOMContentLoaded', createHeader);
document.addEventListener('DOMContentLoaded', createFooter);
document.addEventListener('DOMContentLoaded', setParams);
