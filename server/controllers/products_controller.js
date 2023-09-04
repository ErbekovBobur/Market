const DBControllers = require("../dbase/db_Control")
const dbControllers = new DBControllers()
const fs = require('fs');
const path = require('path');


// router.post('/save', products_control.save);
// router.post('/get_products', products_control.get_products);
// router.post('/delete_product', products_control.delete_product);
// module.exports = router;

class fileControl {
    async get_products(req, res) {
        let { category } = req.body;
        try {
            let data = await dbControllers.get_products(category)
            res.send(JSON.stringify(data));
        } catch (error) {
            res.send(error);
        }
    }
    async get_category(req, res) {
        let {newName, id} = req.body;
        try {
            let data = await dbControllers.get_category(newName, id)
            res.send(JSON.stringify(data));
        } catch (error) {
            res.send(error);
        }
    }
    async edit_category(req, res) {
        let { id, newName } = req.body;
        try {
            let data = await dbControllers.edit_category(id, newName)
            res.send(JSON.stringify(data));
        } catch (error) {
            res.send(error);
        }
    }
    async get_current_products(req, res) {
        let product_id = req.query.id;
        try {
            let data = await dbControllers.get_current_products(product_id)
            res.send(JSON.stringify(data));
        } catch (error) {
            res.send(error);
        }
    }

    async add_new_product(req, res) {
        let product = req.body;
        try {
            let data = await dbControllers.add_new_product(product);
            res.send(JSON.stringify(data));
        } catch (error) {
            res.send(error);
        }
    }

    async edit_product(req, res) {
        let product = req.body;
        try {
            let data = await dbControllers.edit_product(product);
            res.send(JSON.stringify(data));
        } catch (error) {
            res.send(error);
        }
    }

    async delete_product(req, res) {
        let { product_id } = req.body;
        try {
            let data = await dbControllers.delete_product(product_id);
            res.send(JSON.stringify(data))
        } catch (error) {
            res.send(error);
        }
    }

}
module.exports = new fileControl;