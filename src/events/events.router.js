const router = require("express").Router({ mergeParams: true });
const controller = require("./events.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:eventId").delete(controller.delete).get(controller.read).put(controller.update).all(methodNotAllowed);
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;