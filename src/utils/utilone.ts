import sharp from 'sharp';
import fs from 'fs';
import sizeOf from 'image-size';

interface queryObj {
  filename?: string;
  width?: string;
  height?: string;
}

const checkFile = (path: string): boolean => {
  return fs.existsSync(path);
};

const getFile = (path: string): Buffer => {
  return fs.readFileSync(path);
};

const getDimensions = (img: Buffer): unknown => {
  return sizeOf(img);
};

const deleteFile = (path: string): void => {
  fs.unlink(path, err => console.log(err));
};

const cropImage = async (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<void> => {
  await sharp(inputPath)
    .resize(width, height)
    .toFile(outputPath);
};

export { queryObj, checkFile, getFile, getDimensions, deleteFile, cropImage };
