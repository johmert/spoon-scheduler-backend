const service = require("./days.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function create(req,res,next) {
    const { date } = req.body.data;
    if(date){
        const newDay = await service.newDay(req.body.data);
        res.status(201).json({ data: newDay });
    }
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

async function list(req, res, next) {
    const { userId } = req.params;
    if(userId) {
        const days = await service.list(userId);
        res.json({ data: days });
    }
}

function read(req, res, next) {
    res.json({ data: res.locals.day });
}


module.exports = {
    create: asyncErrorBoundary(create),
    dayExists: asyncErrorBoundary(dayExists),
    delete: [asyncErrorBoundary(dayExists), destroy],
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(dayExists), read],

}