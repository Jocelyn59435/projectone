import express from 'express';
import { queryObj, checkFile, getFile, cropImage } from '../../utils/utilone';

const images = express.Router();

// process get request from images route
images.get('/', (req, res) => {
  const queryPara: queryObj = req.query;

  // check the number of query parameters, if it is not 3, return error message
  if (Object.keys(req.query).length !== 3) {
    res.end('Please provide all three parameters: filename, width and height.');
    return;
  }

  // get parameters from get request
  const filename: string = queryPara.filename!;
  const width: number = parseInt(queryPara.width!);
  const height: number = parseInt(queryPara.height!);

  // define paths for full image and thumb image
  const fullPath = `./assets/full/${filename}.jpg`;
  const thumbPath = `./assets/thumb/${filename}_${width}_${height}_resize.jpg`;

  // check filename parameter
  if (!checkFile(fullPath) || req.query.filename === null) {
    console.log('aa');
    res.end(`Please provide validate filename including
  
    flower1
    flower2
    flower3
    flower4
    flower5
    flower6
    flower7
    flower8
    flower9
    qiaoyin
     `);
    return;
  }
  // check width parameter
  if (isNaN(width) || req.query.width === null) {
    res.end('Please provide validate width (should be number).');
    return;
  }
  // check height parameter
  if (isNaN(height) || req.query.height === null) {
    res.end('Please provide validate height (should be number).');
    return;
  }

  // first check whether the file exists or not
  if (checkFile(thumbPath)) {
    const img = getFile(thumbPath);
    // if file exists, send the cached one
    res.end(img, 'binary');
    return;
  }

  // if there is not cached one, crop, save and send the image
  (async function() {
    try {
      await cropImage(fullPath, thumbPath, width, height);
      const img = getFile(thumbPath);
      res.end(img, 'binary');
      return;
    } catch (error) {
      console.log(error);
    }
  })();
});

export default images;
