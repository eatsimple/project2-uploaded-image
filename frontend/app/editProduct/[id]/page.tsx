'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const editProduct = () => {
  const [title, setTitle] = useState<any>('');
  const [image, setImage] = useState<any>('');
  const [preview, setPreview] = useState<any>('');
  const [url, setUrl] = useState<any>('');

  const { params, id } = useParams();
  console.log(params);
  console.log(id);

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const res = await axios.get(`http://localhost:5000/products/${id}`);
    console.log(res.data);
    setTitle(res.data.name);
    setImage(res.data.image);
    setPreview(res.data.url);
    setUrl(res.data.url);
  };

  const loadImage = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const updateProduct = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      const res = await axios.patch(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(`Updated ${res}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={updateProduct}>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input type="text" className="input text-black" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Name" />
            </div>
          </div>

          <div className="field">
            <label className="label">Image</label>
            <div className=" w-[128px] h-[128px] ">
              <img src={image} alt="Preview Image" />
            </div>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input type="file" className="file-input" onChange={loadImage} />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
              Image
            </div>
          </div>

          {preview ? (
            <div className=" w-[128px] h-[128px] ">
              <img src={preview} alt="Preview Image" />
            </div>
          ) : (
            ''
          )}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default editProduct;
