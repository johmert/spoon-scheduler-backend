const service = require("./users.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function read(req, res, next) {
    res.json({ data: res.locals.user });
}

async function register(req, res) {
    const newUser = await service.register(req.body.data);
    res.status(201).json({ data: newUser });
}

async function userExists(req, res, next) {
    const { userId } = req.params;
    const user = await service.read(userId);
    if(user){
        res.locals.user = user;
        return next();
    } else {
        next({
            status: 404,
            message: "User cannot be found."
        });
    }
}

module.exports = {
    read: [asyncErrorBoundary(userExists), asyncErrorBoundary(read)],
    register: [asyncErrorBoundary(register)]
}