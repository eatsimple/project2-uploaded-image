import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import productRouter from './src/products/routes/productRouter.js';
import db from './config/Database.js';
import path from 'path';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors({}));

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders(res, path, stat) {
    res.set('x-timestamp', Date.now());
  },
};

app.use(express.static('image'));

app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(productRouter);
// app.use(upload)

app.listen(process.env.PORT, () => {
  console.log(`API SERVER berjalan di port ${process.env.PORT} `);
});
