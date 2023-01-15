const router = require("express").Router();
const thoughtsController = require("../controllers/thoughtsController");

router.post("/", thoughtsController.create);
router.get("/", thoughtsController.find);
router.get("/", thoughtsController.findOne);
router.put("/update/:id", thoughtsController.update);
router.delete("/delete/:id", thoughtsController.delete);

//reactions
router.post("/reactions/:id", thoughtsController.addReaction);
router.delete("/reactions/reactionId", thoughtsController.removeReaction);

module.exports = router;
