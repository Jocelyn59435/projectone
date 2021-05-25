import express from 'express';
import sharp from 'sharp';

interface queryObj {
    filename: string,
    width: number,
    height: number
}

const images = express.Router();

images.get('/', (req, res) => {
  const queryPara: queryObj = req.query;
  const filename = queryPara.filename;
  const width = queryPara.width;
  const height = queryPara.height;

  async function resizeImg(){
      await sharp(`../../assets/${filename}`).resize(width, height)
  }

  res.send(req.query.width);
});

export default images;