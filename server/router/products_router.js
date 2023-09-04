const Router = require('express').Router;
const products_control = require('../controllers/products_controller')
const router = new Router();

router.post('/new_product', products_control.add_new_product);
router.post('/get_products', products_control.get_products);
router.post('/get_category', products_control.get_category);
router.post('/edit_category', products_control.edit_category);
router.get('/get_current_products', products_control.get_current_products);
router.post('/delete_product', products_control.delete_product);
router.post('/edit_product', products_control.edit_product);
module.exports = router;