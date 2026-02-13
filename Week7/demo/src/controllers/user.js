const bcrypt = require('bcrypt');
const User = require('../models/user.local');

exports.home = (req, res) => {
    res.render('index');
};

exports.showRegister = (req, res) => {
    res.render('register', { error: null });
};

exports.register = async (req, res) => {

    const { username, password, confirm } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;

    // 1️⃣ Check empty
    if (!username || !password || !confirm) {
        return res.render('register', { error: "Please fill all fields" });
    }

    // 2️⃣ Check email format
    if (!emailRegex.test(username)) {
        return res.render('register', { error: "Invalid email format" });
    }

    // 3️⃣ Check password rule
    if (!passwordRegex.test(password)) {
        return res.render('register', { 
            error: "Password must be at least 6 characters, contain 1 number and 1 special character"
        });
    }

    // 4️⃣ Check confirm password
    if (password !== confirm) {
        return res.render('register', { error: "Passwords do not match" });
    }

    // 5️⃣ Check duplicate email
    const existing = await User.findByEmail(username);
    if (existing) {
        return res.render('register', { error: "Email already exists" });
    }

    // 6️⃣ Hash password (không lưu thô)
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username,
        password: hashedPassword
    });

    res.render('welcome', { username });
};
