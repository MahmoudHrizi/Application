const express = require("express");
const router = express.Router();
const multer = require('multer');


//User Controller
const {
  register,
  login,
  ajouterProduit,
  updateProduit,
  deleteproduit,
  updateProfile,
  AfficheProduit,
  AfficheProduitCategorie,
  commanderProduit,
  afficherPanier,
  afficherProduitByUser,
  refreshPanier
} = require("../../controllers/userController");

const isAuth = require("../../middlewares/passport-setup");

const {
  registerRules,
  validator,
  loginRules,
} = require("../../middlewares/checkValidation");

//const checkObjectId = require("../../middlewares/checkObjectId");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

/*const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
*/
const upload = multer({storage:storage});

//user routers
router.post("/register", registerRules(), validator, register);
router.post("/login", loginRules(), validator, login);
router.get("/current", isAuth(), (req, res) => res.json({ user: req.user }));
router.post("/ajouterProduit",[isAuth(),upload.single('productImage')],ajouterProduit);
router.put("/updateProduit/:idproduit",[isAuth(),upload.single('productImage')],updateProduit);
router.delete("/deleteproduit/:idproduit",isAuth(),deleteproduit);
router.put("/updateProfile",isAuth(), updateProfile);
router.get("/afficherProduits",AfficheProduit);
router.get("/afficherProduitsCategories",AfficheProduitCategorie);
router.post("/commanderProduit/:idproduit/:idUser",commanderProduit);
router.get("/afficherPanier",isAuth(),afficherPanier);
router.get("/afficherMesProduits",isAuth(),afficherProduitByUser);
router.post("/refereshPanier/:idUser",refreshPanier);


/*Get user by Id (pannier)
router.get(
  "/getuser/:id",
  isAuth(),
  [isAuth(), checkObjectId("id")],
  getUserById
);
*/


module.exports = router;