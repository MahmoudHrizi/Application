const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const gravatar = require("gravatar");
const normalize = require("normalize-url");
const secret = config.get("TokenSecret");
const User = require("../models/User");
const Produit = require("../models/Produit");

module.exports = userController = {
  register: async (req, res) => {
    const {
      Name,
      LastName,
      email,
      password,
      PhoneNumber,
      gender,
    } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json([{ msg: "This user is already exists" }]);
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        }),
        { forceHttps: true }
      );
     const role="client";
      user = new User({
        Name,
        LastName,
        email,
        password,
        PhoneNumber,
        gender,
        avatar,
        role,
      });
      //Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        id: user._id,
        role: user.role,
      };

      jwt.sign(payload, secret, (err, token) => {
        if (err) throw err;
        res.send({
          token: `Bearer ${token}`,
          user: {
            Name: user.Name,
            email: user.email,
            avatar: user.avatar,
            _id: user._id,
            comment: user.comment,
            role: user.role,
          },
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send([{ msg: "Server error" }]);
      //errors model [msg1 , msg2 ,...]
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const searchResult = await User.findOne({ email });
      if (!searchResult)
        return res.status(400).json([{ msg: "email or password incorrect" }]);
      const isMatch = await bcrypt.compare(password, searchResult.password);
      if (!isMatch)
        return res.status(400).json([{ msg: "email or password incorrect" }]);
      const paylaod = {
        id: searchResult._id,
      };
      jwt.sign(paylaod, secret, (err, token) => {
        if (err) throw err;
        res.send({
          token: `Bearer ${token}`,
          user: {
            Name: searchResult.Name,
            LastName: searchResult.LastName,
            email: searchResult.email,
            avatar: searchResult.avatar,
            role: searchResult.role,
            _id: searchResult._id,
            comment: searchResult.comment,
            role: searchResult.role,
            PhoneNumber: searchResult.PhoneNumber,
            ListProduits:searchResult.listeProduit
          },
        });
      });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  },
 /* getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: "user not found" });
      }
      if (user.role === "conducteur") {
        const car = await Car.find({ owner: id });
        res.send({
          user,
          car,
        });
      } else {
        res.send({ user });
      }
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  },*/
  updateProfile: async (req, res) => {
    const { Name, LastName, email, PhoneNumber } = req.body;
    try {
      let newuser = {
        Name,
        LastName,
        email,
        PhoneNumber,
        
      };
      let user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: newuser },
        { new: true }
      );
      return res.json(user);
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  },
  ajouterProduit:async(req,res)=>{
      const {NameProduit,Réference,Categories,Prix} = req.body;
   try {
        let produit = await Produit.findOne({ Réference });
        if (produit) {
          return res.status(400).json([{ msg: "This produit is already exists" }]);
        }
        produit = new Produit({
            NameProduit,
            Réference,
            Categories,
            Prix,
            productImage: req.file.path
          });
          produit.owner = req.user._id;
          await produit.save();
          res.send(produit)
          //console.log(req.file)
      } catch (error) {
        console.log(error);
        res.status(500).send([{ msg: "Server error" }]);
      }

  },
  updateProduit: async (req, res) => {
    const { NameProduit,Réference,Categories,Prix } = req.body;
    
    try {
      let newproduit = {
        NameProduit,
            Réference,
            Categories,
            Prix,
            productImage: req.file.path
      };
      await Produit.findOneAndUpdate(
        { _id: req.params.idproduit },
        { $set: newproduit },
        { new: true }
      );
      let produit = await Produit.find({owner:req.user._id});
      return res.json(produit);
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  },

  deleteproduit: async (req, res) => {
    try {
      if (req.user.role !== "client") {
        return res.status(400).json([{ msg: "unauthorized" }]);
      }
      const produit = await Produit.findById(req.params.idproduit);
      if (!produit) {
        return res.status(404).json([{ msg: "produit not found" }]);
      }
      if (produit.owner.toString() !== req.user.id) {
        return res.status(401).json([{ msg: "User not authorized" }]);
      }
      
      await produit.remove();
      res.json([{ idproduit: produit._id }]);
    } catch (error) {
      console.log(error);
      res.status(500).send({ errors: ["Server error"] });
    }
  },
  AfficheProduit: async (req, res) => {
try {
    let produit = await Produit.find().populate('owner','Name');
    res.json(produit);
    
} catch (error) {
    console.error(err.message);
      res.status(500).send("Server Error");
}

  },
  AfficheProduitCategorie: async (req, res) => {
      const {Categories} = req.body;
    try {
        let produit = await Produit.find({Categories});
        res.json(produit);
        
    } catch (error) {
        console.error(err.message);
          res.status(500).send("Server Error");
    }
    
      },
  commanderProduit:async(req,res)=>{
    const { idproduit,idUser } = req.params;

    try {
      let produit= await Produit.findById(idproduit).populate('owner',['Name','PhoneNumber'])
      let user = await User.findById(idUser);
      const produitCommander = {
        NameProduit: produit.NameProduit,
        Réference:produit.Réference,
        Prix:produit.Prix,
        NameOwner:produit.owner.Name,
        PhoneNumber:produit.owner.PhoneNumber,
        ImageProduit:produit.productImage
      };
      user.listeProduit.unshift(produitCommander);
      await user.save();

      res.send(user)
      
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

  },
  afficherPanier:async(req,res)=>{
    const { _id, role } = req.user;
    try {
      let user = await User.findById({ _id });
      res.send(user.listeProduit)
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  afficherProduitByUser: async (req,res) =>{
    const {_id} = req.user;
    try {
      let produit = await Produit.find({owner:_id});
    res.json(produit);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  refreshPanier:async(req,res)=>{
    const {idUser } = req.params;
    try {
      let user = await User.findOneAndUpdate(
        { _id: idUser},
        { $set:{listeProduit: [] }},
        { new: true }
      );
      res.send(user)
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};

