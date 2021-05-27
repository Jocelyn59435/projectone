import express from 'express';
import fs from 'fs';

import {
  queryObj,
  checkFile,
  getFile,
  getDimensions,
  deleteFile,
  cropImage
} from '../../utils/utilone';

const images = express.Router();

// process get request from images route
images.get('/', (req, res) => {
  const queryPara: queryObj = req.query;

  // get parameters from get request
  const filename: string = queryPara.filename!;
  const width: number = parseInt(queryPara.width!);
  const height: number = parseInt(queryPara.height!);

  // define paths for full image and thumb image
  const fullPath = `./assets/full/${filename}.jpg`;
  const thumbPath = `./assets/thumb/${filename}_resize.jpg`;
  console.log(req.originalUrl);
  // first check whether the file exists or not
  if (checkFile(thumbPath)) {
    const img = getFile(thumbPath);
    const dimensions = getDimensions(img);
    // if file exists, check wheter the current size is the same as the requested one
    if (dimensions.width == width && dimensions.height == height) {
      // if the size is same, just send the buffered one
      res.end(img, 'binary');
    } else {
      // if the size is not the same, delete the previous one and crop a new one
      deleteFile(thumbPath);
      (async function() {
        try {
          // crop, save and send the image
          await cropImage(fullPath, thumbPath, width, height);
          const img = fs.readFileSync(`./assets/thumb/${filename}_resize.jpg`);
          res.end(img, 'binary');
        } catch (error) {
          console.log(error);
        }
      })();
    }
  } else {
    // if the file does not exist, crop, save and send the image
    (async function() {
      try {
        await cropImage(fullPath, thumbPath, width, height);
        const img = getFile(thumbPath);
        res.end(img, 'binary');
      } catch (error) {
        console.log(error);
      }
    })();
  }
});

export default images;
