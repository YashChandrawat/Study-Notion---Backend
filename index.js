const express = require("express");
const app = express();

// Routes Below
const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const contactRoutes = require("./routes/Contact");

require("dotenv").config();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

// Database Connect
database.dbConnect();

// middlewares
app.use(express.json());
app.use(cookieParser());
// Here we use cors to connect the frontend with backend therefore we used the below middleware to connect
app.use(
  cors({
    origin: "https://studynotion-ed-tech.netlify.app",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Cloudinary Connect
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1", contactRoutes);
app.get("/", (req, res) => {
  res.send("Server is working and running...");
});
app.get("/api/login", (req, res) => {
  res.send("Welcome to login page");
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});
