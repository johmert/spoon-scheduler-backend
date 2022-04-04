const router = require("express").Router();
const controller = require("./users.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:userId").get(controller.read).all(methodNotAllowed);
router.route("/").all(methodNotAllowed);

module.exports = router;