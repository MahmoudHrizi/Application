
const User = require("../models/User");
const Produit=require("../models/Produit")

module.exports = adminController = {
    listUsers:async(req,res)=>{
        try {
            if (req.user.role !== "Admin") {
                return res.status(400).json([{ msg: "unauthorized" }]);
              }
              let user =await User.find({role:"client"});
              res.json(user);
        } catch (error) {
            console.error(err.message);
      res.status(500).send("Server Error");
        }
    },
    suppuser:async(req,res)=>{
        const { idUser } = req.params;
        try {
            
        if (req.user.role !=="Admin") {
            return res.status(400).json([{ msg: "unauthorized" }]);
        }    
        const user = await User.findById(idUser);
        if (!user) {
          return res.status(404).json({ msg: "User not found" });
        }
        await Produit.remove({ owner: idUser });
        await user.remove();
        res.json({ msg: "user removed" });
        } catch (error) {
            console.error(err.message);
      res.status(500).send("Server Error");
        }
    }
}