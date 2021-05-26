import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import sizeOf from 'image-size';

interface queryObj {
    filename?: string,
    width?: string,
    height?: string
}

const images = express.Router();

images.get('/', (req, res) => {
  const queryPara: queryObj = req.query;
  const filename:string = queryPara.filename!;
  const width:number = parseInt(queryPara.width!);
  const height:number = parseInt(queryPara.height!);

if(fs.existsSync(`./assets/thumb/${filename}_resize.jpg`)){
  const img = fs.readFileSync(`./assets/thumb/${filename}_resize.jpg`);
  (async () => {
    try {
      const dimensions = await sizeOf(img);
      if(dimensions.width == width && dimensions.height == height){
        res.end(img, 'binary'); 
      }else{
        (async function () {
            try{
              await fs.unlink(`./assets/thumb/${filename}_resize.jpg`, (err) => console.log(err));
            }
            catch(error){
              console.log(error);
        }
      })();
        (async function () {
            try{
              await sharp(`./assets/full/${filename}.jpg`)
              .resize(width, height)
              .toFile(`./assets/thumb/${filename}_resize.jpg`);
              const img = fs.readFileSync(`./assets/thumb/${filename}_resize.jpg`);
              res.end(img, 'binary'); 
            }
            catch(error){
              console.log(error);
        }
      })();
      };
    } catch (err) {
      console.error(err);
    }
  })()

}else{
      (async function () {
      try{
        await sharp(`./assets/full/${filename}.jpg`)
        .resize(width, height)
        .toFile(`./assets/thumb/${filename}_resize.jpg`);
        const img = fs.readFileSync(`./assets/thumb/${filename}_resize.jpg`);
        res.end(img, 'binary'); 
      }
      catch(error){
        console.log(error);
  }
})();
} 
})

export default images;