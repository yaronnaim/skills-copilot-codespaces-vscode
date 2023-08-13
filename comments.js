// Create web server
// 1. npm init -y
// 2. npm install express --save
// 3. npm install body-parser --save
// 4. npm install cors --save
// 5. npm install mongoose --save
// 6. npm install nodemon --save-dev
// 7. npm install dotenv --save
// 8. npm install bcrypt --save
// 9. npm install jsonwebtoken --save
// 10. npm install multer --save
// 11. npm install multer-gridfs-storage --save
// 12. npm install gridfs-stream --save
// 13. npm install path --save
// 14. npm install fs --save

// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const multerGridfsStorage = require("multer-gridfs-storage");
const gridfsStream = require("gridfs-stream");
const path = require("path");
const fs = require("fs");
const { response } = require("express");

// Create express app
const app = express();

// Setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup cors
app.use(cors());

// Setup dotenv
dotenv.config();

// Setup mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Setup gridfs
let gfs;
mongoose.connection.once("open", () => {
  gfs = gridfsStream(mongoose.connection.db, mongoose.mongo);
  gfs.collection("images");
});

// Setup multer-gridfs-storage
const storage = multerGridfsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename =
        file.originalname +
        "-" +
        Date.now() +
        path.extname(file.originalname);
      const fileInfo = {
        filename: filename,
        bucketName: "images",
      };
      resolve(fileInfo);
    });
  },
});

// Setup multer
const upload = multer({ storage });

// Setup schema
const userSchema = new mongoose.Schema({

