const UsersController = require('../controllers/usersController');
 
module.exports = (app) => {
 
    //traer datos
    app.get('/api/users/getAll', UsersController.getAll);

    //guardar datos
    app.post('/api/users/create', UsersController.register);
    app.post('/api/users/login', UsersController.login);

}
