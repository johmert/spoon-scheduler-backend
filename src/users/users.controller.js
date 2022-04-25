const { v4: uuidv4 } = require("uuid");
const service = require("./users.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function createIdNumber(req, res, next) {
    const v4options = {
        random: [
            0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
          ],
    }
    const id = uuidv4(v4options.random);
    res.locals.user = {
        user_id: id,
        username: req.body.username,
        password: req.body.password,
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
    res.json(res.locals.user);
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
    register: [hasUserNameAndPassword, createIdNumber, asyncErrorBoundary(register)],
    update: [asyncErrorBoundary(userExists), asyncErrorBoundary(update)],
    userExists: asyncErrorBoundary(userExists),
}