const express = require("express");
const connectDB = require("./config/connectDB");
const userRoute = require("./routes/api/user-route");
const adminRoute = require("./routes/api/admin-route");
const app = express();

//Connect Database
connectDB();
app.use('/uploads', express.static('uploads'));
app.use(express.json());
//routes

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});