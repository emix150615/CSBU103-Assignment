// Fake database (lưu tạm trong bộ nhớ)
let users = [];


// ===== REGISTER =====
exports.showRegister = (req, res) => {
    res.render('register', { error: null });
};

exports.register = (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra trùng username
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.render('register', { error: 'Username already exists!' });
    }

    // Lưu user
    users.push({ username, password });

    // Lưu session
    req.session.user = username;

    res.redirect('/welcome');
};


// ===== LOGIN =====
exports.showLogin = (req, res) => {
    res.render('login', { error: null });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.render('login', { error: 'Invalid username or password!' });
    }

    req.session.user = user.username;

    res.redirect('/welcome');
};


// ===== WELCOME =====
exports.welcome = (req, res) => {

    // Nếu chưa login thì quay lại login
    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('welcome', {
        user: req.session.user
    });
};


// ===== LOGOUT =====
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
