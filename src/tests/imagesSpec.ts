import express from 'express';
import fs from 'fs';
import images from '../routes/api/images';
import supertest from 'supertest';

const request = supertest(images);

import {
  checkFile,
  getFile,
  getDimensions,
  deleteFile,
  cropImage
} from '../utils/utilone';

const fullPath = `./assets/full/flower6.jpg`;
const thumbPath = `./assets/thumb/flower6_resize.jpg`;
const img = getFile(fullPath);

it('should whether flower6.jpg exists and return true', () => {
  expect(checkFile(fullPath)).toBeTruthy();
});

it('should get flower6.jpg', () => {
  expect(getFile(fullPath)).toBeTruthy();
});

it('should get dimensions of flower6.jpg', () => {
  expect(getDimensions(img)).toBeTruthy();
});

it('should throw an error when deleting an file which does not exist', () => {
  expect(deleteFile('./assets/thumb/ajax.jpg')).toThrowError;
});

it('expects to be resolved', async () => {
  await cropImage(
    `./assets/full/qiaoyin.jpg`,
    `./assets/thumb/qiaoyin_resize.jpg`,
    300,
    500
  );
});

describe('Test endpoint response', () => {
  it('gets the images endpoint', async done => {
    const response = await request
      .get('/')
      .query({ filename: 'flower6', width: 300, height: 600 });
    expect(response.status).toBe(200);
    done();
  });
});
