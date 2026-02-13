let users = [];

exports.findByEmail = async (email) => {
    return users.find(u => u.username === email);
};

exports.create = async (user) => {
    users.push(user);
};
