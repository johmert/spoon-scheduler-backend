const service = require("./users.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function createIdNumber(req, res, next) {
    const nextId = await service.getNextId();
    res.locals.user = {
        user_id: parseInt(nextId),
        username: req.body.username,
        password: req.body.password,
        settings: req.body.settings ? req.body.settings : "default",
        avg_spoons: req.body.avg_spoons ? req.body.avg_spoons : 0,
    }
    return next();
}

function destroy(req, res, next) {
    service.delete(res.locals.user.user_id)
        .then(() => res.sendStatus(204))
        .catch(next);
}

function hasUserNameAndPassword(req, res, next) {
    const { password, username } = req.body;
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

async function update(req, res, next) {
    const user = {
        user_id: res.locals.user.user_id,
        username: req.body.username ? req.body.username : res.locals.user.username,
        password: req.body.password ? req.body.password : res.locals.user.password,
        settings: req.body.settings ? req.body.settings : res.locals.user.settings,
        avg_spoons: req.body.avg_spoons ? req.body.avg_spoons : res.locals.user.avg_spoons,
    }
    service.update(user)
        .then(data => res.json({ data }))
        .catch(next);
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
    delete: [asyncErrorBoundary(userExists), destroy],
    read: [asyncErrorBoundary(userExists), asyncErrorBoundary(read)],
    register: [hasUserNameAndPassword, asyncErrorBoundary(createIdNumber), asyncErrorBoundary(register)],
    update: [asyncErrorBoundary(userExists), hasUserNameAndPassword, asyncErrorBoundary(update)],
    userExists: asyncErrorBoundary(userExists),
}