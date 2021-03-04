const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
  },
  listeProduit: [
    {
     NameProduit:{
       type:String
     },
     Réference:{
       type:String
     },
     Prix:{
       type:Number
     },
     NameOwner:{
       type:String
     },
     PhoneNumber:{
       type:String
     },
     ImageProduit:{
       type:String
     }
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);