//Next.js Server Actions (server-only functions)

'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

/**
 * Server Actions for product operations.
 * Use 'use server' directive to execute on the server only.
 */

export async function getProducts(skip: number = 0, take: number = 12) {
  try {
    const products = await prisma.product.findMany({
      skip,
      take,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: 'Failed to fetch products' };
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) return { success: false, error: 'Product not found' };
    return { success: true, data: product };
  } catch (error) {
    return { success: false, error: 'Failed to fetch product' };
  }
}

export async function getProductsByCategory(categorySlug: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      include: { category: true },
    });
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: 'Failed to fetch products' };
  }
}

export async function searchProducts(query: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: { category: true },
    });
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: 'Failed to search products' };
  }
}
