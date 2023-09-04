const DBControllers = require("../dbase/db_Control")
const dbControllers = new DBControllers()

class UserControl {

    async login(req, res) {
        let { login, password } = req.body;
        try {
            let data = await dbControllers.login(
                'users',
                ['user_id', 'login', 'admin'],
                { 'login': login, 'password': password }
            )
            res.send(JSON.stringify(data));
        } catch (error) {
            res.send(error);
        }
    }
    async get_users(req, res) {
        let { login, user_id } = req.body;
        try {
            let data = await dbControllers.get_users(user_id)
            res.send(JSON.stringify(data));
        } catch (error) {
            res.send(error);
        }
    }
    async registration(req, res) {
        let { login, password, admin, user_id } = req.body.userData;
        try {
            let data = await dbControllers.registration(
                login, password, admin, user_id)
            res.send(JSON.stringify(data));
        } catch (error) {
            res.send(error);
        }
    }
}
module.exports = new UserControl;

