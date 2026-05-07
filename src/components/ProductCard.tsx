//Reusable React components (UI building blocks
//Keeps UI logic organized and prevents duplication

'use client';

import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  stock: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  stock,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {image && (
        <Image
          src={image}
          alt={name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">${price.toFixed(2)}</p>
        <p className={`text-sm mt-2 ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {stock > 0 ? `${stock} in stock` : 'Out of stock'}
        </p>
      </div>
    </div>
  );
};
