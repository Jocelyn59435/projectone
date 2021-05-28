import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

import { checkFile, getFile, deleteFile, cropImage } from '../utils/utilone';

const fullPath = `./assets/full/flower6.jpg`;
const thumbPath = `./assets/thumb/flower6_300_600_resize.jpg`;

it('should whether flower6.jpg exists and return true', () => {
  expect(checkFile(fullPath)).toBeTruthy();
});

it('should get flower6.jpg', () => {
  expect(getFile(fullPath)).toBeTruthy();
});

it('should get flower6_300_600_resize.jpg', () => {
  expect(getFile(thumbPath)).toBeTruthy();
});

it('should throw an error when deleting an file which does not exist', () => {
  expect(deleteFile('./assets/thumb/ajax.jpg')).toThrowError;
});

it('expects to be resolved', async () => {
  await cropImage(
    `./assets/full/qiaoyin.jpg`,
    `./assets/thumb/qiaoyin_300_500_resize.jpg`,
    300,
    500
  );
});

describe('Test endpoint response', () => {
  it('gets the api endpoint', async done => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    done();
  });

  it('gets the images endpoint', async done => {
    const response = await request.get(
      '/api/images?filename=flower6&width=300&height=600'
    );
    expect(response.status).toBe(200);
    done();
  });
});
