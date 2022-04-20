const service = require("./days.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function create(req,res) {
    const newDay = await service.newDay(res.locals.day);
    res.status(201).json({ data: newDay });
}

async function dayExists(req, res, next) {
    const { date } = req.params;
    const day = await service.read(date);
    if(day){
        res.locals.day = day;
        return next();
    } else {
        next({
            status: 404,
            message: "Day cannot be found."
        });
    }
}

function destroy(req, res, next) {
    service.delete(res.locals.day.date)
        .then(() => res.sendStatus(204))
        .catch(next);
}

function hasDateAndSpoons(req, res, next) {
    const { date, max_spoons } = req.body;
    const { userId } = req.params;
    if(date){
        res.locals.day = {
            date,
            day_left: 1440,
            max_spoons,
            user_id: userId
        }
        return next();
    } else {
        next({
            status: 400,
            message: `Must include a valid date (MM-DD-YYYY) and max_spoons (integer)`
        });
    }
}

async function list(req, res, next) {
    const { userId } = req.params;
    if(userId) {
        const days = await service.list(userId);
        res.json({ data: days });
    }
}

function read(req, res, next) {
    res.json(res.locals.day);
}

async function update(req, res, next) {
    const day = {
        date: res.locals.day.date,
        day_left: req.body.day_left ? req.body.day_left : res.locals.day.day_left,
        max_spoons: req.body.max_spoons ? req.body.max_spoons : res.locals.day.max_spoons,
        user_id: res.locals.day.user_id
    }
    service.update(day)
        .then(data => res.json({ data }))
        .catch(next);
}

module.exports = {
    create: [hasDateAndSpoons, asyncErrorBoundary(create)],
    dayExists: asyncErrorBoundary(dayExists),
    delete: [asyncErrorBoundary(dayExists), destroy],
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(dayExists), read],
    update: [asyncErrorBoundary(dayExists), asyncErrorBoundary(update)]
}