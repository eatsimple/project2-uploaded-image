import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controller/productController.js';

const router = express.Router();

// ini adalah file endpoint untuk user, dimana middleware dan controller disimpan disini

router.get('/products', getAllProducts); // middleware, middleware, controllers
router.get('/products/:id', getProductById); // middleware, middleware, controllers
router.post('/products', createProduct); // middleware, middleware, controllers
router.patch('/products/:id', updateProduct); // middleware, middleware, controllers
router.delete('/products/:id', deleteProduct); // middleware, middleware, controllers

export default router;
