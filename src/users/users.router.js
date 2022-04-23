const router = require("express").Router({ mergeParams: true });
const controller = require("./users.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const daysRouter = require("../days/days.router");

router.use("/:userId/days", controller.userExists, daysRouter);
router.route("/:userId").get(controller.read).put(controller.update).all(methodNotAllowed);
router.route("/:username").post(controller.read).all(methodNotAllowed);
router.route("/").post(controller.register).all(methodNotAllowed);

module.exports = router;