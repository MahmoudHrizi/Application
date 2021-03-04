const express = require("express");
const router = express.Router();
//admin Controller
const {
listUsers,
suppuser
} = require("../../controllers/admin-controler");

const isAuth = require("../../middlewares/passport-setup");



//admin routers
router.get("/listUsers",isAuth(),listUsers)
router.delete("/deleteUser/:idUser",isAuth(),suppuser)


/*Get user by Id (pannier)
router.get(
  "/getuser/:id",
  isAuth(),
  [isAuth(), checkObjectId("id")],
  getUserById
);
*/


module.exports = router;