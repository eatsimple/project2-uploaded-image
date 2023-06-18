'use client';

import React from 'react';
import Link from 'next/link';

const page = () => {
  return (
    <div className=' text-center '>
      <div className="text-center text-blue-700 ">Ini halaman home</div>
      <div className='flex items-center justify-evenly'>
        <Link href={'/addProduct'} legacyBehavior>
          <a className=" font-bold text-white text-lg">Add Product</a>
        </Link>

        <Link href={'/listProducts'} legacyBehavior>
          <a className=" font-bold text-white text-lg">List Product</a>
        </Link>

        <Link href={'/editProduct'} legacyBehavior>
          <a className=" font-bold text-white text-lg">Edit Product</a>
        </Link>
      </div>
    </div>
  );
};

export default page;
