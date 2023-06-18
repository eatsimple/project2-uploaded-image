import Products from '../models/Products.js';
import fs from 'fs';
import path from 'path';

export const getAllProducts = async (req, res) => {
  try {
    const product = await Products.findAll({});
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: 'image tidak ada' });
  const name = req.body.title;
  const image = req.files.image;
  console.log(image);
  console.log(req.files);
  const fileSize = image.size;
  console.log(fileSize);
  const ext = path.extname(image.name); // ext = jpeg
  const processedImage = image.md5 + ext; // image: {} kita conver ke md5 ditambah jpeg = 0fdde346ebddce2887f0ee01d2a200b5.jpeg
  const url = `${req.protocol}://${req.get('host')}/products/${processedImage}`;
  const allowTyped = ['.png', '.jpg', '.jpeg'];

  if (!allowTyped.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'extension is not supported' });
  if (fileSize > 5000000) return res.status(422).json({ msg: 'image terlampau besar' });

  image.mv(`./image/${processedImage}`, async (err) => {
    if (err) return res.status(400).json({ msg: err.message });
    try {
      const product = await Products.create({
        name: name,
        image: processedImage,
        url: url,
      });
      res.status(200).json({ msg: `product has been created ${product}` });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

export const updateProduct = async (req, res) => {
  const product = await Products.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.status(400).json({ msg: 'data tidak ditemukan' });

  let processedImage = '';
  if (req.files === null) {
    processedImage = product.image;
  } else {
    const image = req.files.image;
    const fileSize = image.data.length;
    const ext = path.extname(image.name);
    processedImage = image.md5 + ext;
    const allowTyped = ['.png', '.jpg', '.jpeg'];

    if (!allowTyped.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'extension is not supported' });
    if (fileSize > 5000000) return res.status(422).json({ msg: 'image terlampau besar' });

    const filePath = `./image/${product.image}`;
    fs.unlinkSync(filePath);

    image.mv(`./image/${processedImage}`, (err) => {
      if (err) return res.status(400).json({ msg: err.message });
    });
  }

  const name = req.body.title;
  const url = `${req.protocol}://${req.get('host')}/products/${processedImage}`;

  try {
    await Products.update(
      {
        name: name,
        image: processedImage,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).json({ msg: 'succesfully update' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Products.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.status(400).json({ msg: 'product is not found' });

  try {
    // const filePath = `./image/${product.image}`;
    // fs.unlinkSync(filePath);
    await Products.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: 'product has been deleted' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
