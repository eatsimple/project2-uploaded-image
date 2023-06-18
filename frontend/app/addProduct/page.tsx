'use client';

import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

const addProduct = () => {
  const router = useRouter();
  const {id} = useParams();

  const [title, setTitle] = useState<any>('');
  const [image, setImage] = useState<any>('');
  const [preview, setPreview] = useState<any>('');

  const loadImage = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const saveProduct = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/products', formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      router.push('/')
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={saveProduct}>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input type="text" className="input text-black" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Name" />
            </div>
          </div>

          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input type="file" className="file-input" onChange={loadImage} />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview ? (
            <figure className=" w-[128px] h-[128px] ">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : (
            ''
          )}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default addProduct;
