const newuser = (value, callback) => {

    const newuser = {
        user : value.user,
        password : value.password
    }

    callback(newuser);
}

module.exports = { newuser }