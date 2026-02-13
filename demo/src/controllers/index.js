module.exports = (app) => {

    const usercontroller = require('./user');

    app.get('/', usercontroller.home);

    app.get('/register', usercontroller.showRegister);

    app.post('/register', usercontroller.register);

};
