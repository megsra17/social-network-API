const router = require("express").Router();
const userController = require("../controllers/usersController");

router.post("/", userController.create);
router.get("/", userController.find);
router.get("/:id", userController.findOne);
router.put("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);

//adding/removing friends
router.post("/:userId/friends/:friendId", userController.addFriend);
router.delete("/:userId/friends/:friendId", userController.removeFriend);

module.exports = router;
