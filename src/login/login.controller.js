const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { readByUsername } = require("../users/users.service");

async function login(req, res, next){
    const { username, password } = req.body;
    const id = await readByUsername(username, password);
    if(id) {
        res.send({
            token: id,
        });
    } else {
        next({
            status: 401,
            message: "Invalid username/password combination"
        })
    }
}

module.exports = {
    login: asyncErrorBoundary(login)
}