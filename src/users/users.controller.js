const service = require("./users.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function createIdNumber(req, res, next) {
    const nextId = await service.getNextId();
    res.locals.user = {
        user_id: parseInt(nextId) + 1,
        username: req.body.data.username,
        password: req.body.data.password,
    }
    return next();
}

function hasUserNameAndPassword(req, res, next) {
    const { password, username } = req.body.data;
    if(password && username) return next();
    next({
        status: 400,
        message: `Must include a valid username and valid password`
    });
}

function read(req, res, next) {
    res.json({ data: res.locals.user });
}

async function register(req, res) {
    const newUser = await service.register(res.locals.user);
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
    register: [hasUserNameAndPassword, asyncErrorBoundary(createIdNumber), asyncErrorBoundary(register)],
}