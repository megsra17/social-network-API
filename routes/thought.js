const router = require("express").Router();
const thoughtsController = require("../controllers/thoughtsController");

router.post("/", thoughtsController.create);
router.get("/", thoughtsController.find);
router.get("/:id", thoughtsController.findOne);
router.put("/update/:id", thoughtsController.update);
router.delete("/delete/:id", thoughtsController.delete);

//reactions
router.post("/:thoughtId/reactions", thoughtsController.addReaction);
router.delete("/:thoughtId/reactions", thoughtsController.removeReaction);

module.exports = router;
