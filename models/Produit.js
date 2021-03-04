const mongoose = require("mongoose");

const ProduitSchema = new mongoose.Schema({
  NameProduit: {
    type: String,
    required: true,
  },
  Réference: {
    type: String,
    required: true,
  },
  Categories: {
    type: String,
    required: true,
  },
  Prix: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  productImage: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("produit", ProduitSchema);