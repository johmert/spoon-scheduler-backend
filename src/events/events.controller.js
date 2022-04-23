const { v4: uuidv4 } = require("uuid");
const service = require("./events.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function create(req, res) {
    const newEvent = await service.create(res.locals.event);
    res.status(201).json({ data: newEvent });
}

function createIdNumber(req, res, next) {
    const v4options = {
        random: [
          0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
        ],
    };
    const id = uuidv4(v4options.random);
    res.locals.event = {
        event_id: id,
        name: req.body.name,
        description: req.body.description,
        spoons: req.body.spoons,
        timeDuration: req.body.timeDuration,
        importance: req.body.importance,
        date: req.body.date,
    }
    return next();
}

function destroy(req, res, next) {
    service.delete(res.locals.event.event_id)
        .then(() => res.sendStatus(204))
        .catch(next);
}

async function eventExists(req, res, next) {
    const { eventId } = req.params;
    const event = await service.read(eventId);
    if(event){
        res.locals.event = event;
        return next();
    } else {
        next({
            status: 404,
            message: "Event cannot be found."
        });
    }
}

function hasAllProperties(req, res, next) {
    const {
        description, 
        importance,
        name,
        spoons,
        timeDuration,
     } = req.body;
    if( 
        description &&
        importance && 
        name &&
        spoons && 
        timeDuration
    ) return next();
    next({
        status: 400,
        message: `Must include valid description, importance, name, spoons, and timeDuration values`
    });
}

async function list(req, res, next){
    const events = await service.list();
    res.json({ data: events });
}

function read(req, res, next) {
    res.json(res.locals.event);
}

async function update(req, res, next) {
    const { eventId } = req.params;
    const event = {
        event_id: eventId,
        date: req.body.date ? req.body.date : res.locals.event.date,
        description: req.body.description ? req.body.description : res.locals.event.description,
        importance: req.body.importance ? req.body.importance : res.locals.event.importance,
        name: req.body.name ? req.body.name : res.locals.event.name,
        spoons: req.body.spoons ? req.body.spoons : res.locals.event.spoons,
        timeDuration: req.body.timeDuration ? req.body.timeDuration : res.locals.event.timeDuration,
    }
    service.update(event)
        .then(data => res.json({ data }))
        .catch(next);
}



module.exports = {
    create: [hasAllProperties, createIdNumber, asyncErrorBoundary(create)],
    delete: [asyncErrorBoundary(eventExists), destroy],
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(eventExists), asyncErrorBoundary(read)],
    update: [asyncErrorBoundary(eventExists), hasAllProperties, asyncErrorBoundary(update)],
    userExists: asyncErrorBoundary(eventExists),
}