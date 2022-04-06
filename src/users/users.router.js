const router = require("express").Router();
const controller = require("./users.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:userId").get(controller.read).put(controller.update).all(methodNotAllowed);
router.route("/").post(controller.register).all(methodNotAllowed);

module.exports = router;