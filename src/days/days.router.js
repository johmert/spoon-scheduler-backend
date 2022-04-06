const router = require("express").Router({ mergeParams: true });
const controller = require("./days.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const eventsRouter = require("../events/events.router");

router.use("/:date/events", controller.dayExists, eventsRouter);
router.route("/:date").delete(controller.delete).get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;