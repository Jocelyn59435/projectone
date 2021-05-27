import sharp from 'sharp';
import fs from 'fs';
import sizeOf from 'image-size';

interface queryObj {
  filename?: string;
  width?: string;
  height?: string;
}

const checkFile = (path: string) => {
  return fs.existsSync(path);
};

const getFile = (path: string) => {
  return fs.readFileSync(path);
};

const getDimensions = (img: Buffer) => {
  return sizeOf(img);
};

const deleteFile = (path: string) => {
  fs.unlink(path, err => console.log(err));
};

const cropImage = async (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
) => {
  await sharp(inputPath)
    .resize(width, height)
    .toFile(outputPath);
};

export { queryObj, checkFile, getFile, getDimensions, deleteFile, cropImage };
