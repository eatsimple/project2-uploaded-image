'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const listProducts = () => {
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get('http://localhost:5000/products');
    setProducts(response.data);
  };

  const deleteProduct = async (productId: any) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <Link href="/addProduct" className="button is-success" legacyBehavior>
        <a> Add New</a>
      </Link>
      <div className="columns is-multiline mt-2">
        {products?.map((product: any) => (
          <div className="column is-one-quarter" key={product.id}>
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{product.name}</p>
                  </div>
                </div>
              </div>

              <footer className="card-footer">
                <Link href={`editProduct/${product.id}`} className="card-footer-item" legacyBehavior>
                  <a>Edit</a>
                </Link>
                <a onClick={() => deleteProduct(product.id)} className="card-footer-item">
                  Delete
                </a>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default listProducts;
