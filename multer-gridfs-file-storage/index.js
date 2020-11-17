const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;

const fetch = require('node-fetch');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage");
require('dotenv').config();

const ObjectID = require('mongodb').ObjectID;

const Image = require('./models/image.model');
console.log(process.env.Mongo_URL);

mongoose
	.connect(process.env.Mongo_URL, { useUnifiedTopology:true })
	.then(() => {
          console.log("Database connection established!");
	}).catch(err => {
          console.error("Error connecting Database instance due to: ", err);
          process.exit();
  });

let connection = mongoose.createConnection(process.env.Mongo_URL, { useUnifiedTopology:true });

// init gfs
let gfs;
connection.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "uploads"
  });
});

// Create a storage object with a given configuration
const storage = new GridFsStorage({ 
  url: process.env.Mongo_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads'
      }
      resolve(fileInfo);
    });
  }
});
 
// Set multer storage engine to the newly created object
const upload = multer({ storage });

router.post('/uploadImage', upload.single('file'), async (req, res, next) => {
  try {
    const restaurant = await fetch(`http://localhost:3000/api/search?restaurantName=${req.body.restaurantName}`);
    const restaurantArr = await restaurant.json();
    if(!Array.isArray(restaurantArr.data)) {
        return res.status(200).json({
          success: false,
          message: "Restaurant does not exist",
        });
    } else {
      const restaurantData = restaurantArr.data[0];
      // check for existing images
      const image = await Image.findOne({ restaurantName: req.body.restaurantName });
      if (image) {
          return res.status(200).json({
              success: false,
              message: 'Image already exists',
          });
      }
      const newImage = new Image({
        restaurantID: restaurantData._id,
        restaurantName: req.body.restaurantName,
        filename: req.file.filename,
        fileId: req.file.id,
      });
      const savedImage = await newImage.save();
      console.log(savedImage);
      return res.status(200).json({
          success: true,
          savedImage,
      });
    }
  } catch (error) {
    return res.status(500).json(error.stack);
  }
});

router.get('/images', (req, res, next) => {
  gfs.find().toArray((err, files) => {
      console.log(files);
      if (!files || files.length === 0) {
          return res.status(200).json({
              success: false,
              message: 'No files available'
          });
      }

      files.map(file => {
          if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
              file.isImage = true;
          } else {
              file.isImage = false;
          }
      });

      res.status(200).json({
          success: true,
          files,
      });
  });
});

router.get('/image/:restaurantID', async (req, res, next) => {
  const imageFile = await Image.findOne({ restaurantID: new ObjectID(req.params.restaurantID) });
  if(!imageFile) {
    return res.status(200).json({
      success: false,
      message: 'No image available for this restaurant',
    });
  } 
  gfs.find({ _id: new ObjectID(imageFile.fileId) }).toArray((err, files) => {
    if (!files[0] && files.length == 0) {
      return res.status(200).json({
          success: false,
          message: 'No images chunks/files available',
      });
    }
    const file = files[0];
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // render image to browser
      res.setHeader('content-Type', file.contentType);
      gfs.openDownloadStreamByName(imageFile.filename).pipe(res);
    } else {
      res.status(404).json({
          err: 'Not an image',
      });
    }
  });
});

app.use('/', router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!')
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
