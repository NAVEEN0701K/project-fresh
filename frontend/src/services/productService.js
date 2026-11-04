import api from './api';
import { productsData } from '../data/products';

// Helper to filter and paginate local products if API has connection issue
function queryLocalProducts(params = {}) {
  let list = [...productsData];
  const { search, category, minPrice, maxPrice, isAvailable, sort, order = 'desc', page = 1, limit = 12, featured } = params;

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  if (category && category !== 'all') {
    list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (minPrice) {
    list = list.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    list = list.filter((p) => p.price <= Number(maxPrice));
  }

  if (isAvailable !== undefined && isAvailable !== '') {
    list = list.filter((p) => String(p.isAvailable) === String(isAvailable));
  }

  if (featured === 'true' || featured === true) {
    list = list.filter((p) => p.isFeatured);
  }

  // Sorting
  if (sort === 'price') {
    list.sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price));
  } else if (sort === 'rating') {
    list.sort((a, b) => (order === 'asc' ? a.rating - b.rating : b.rating - a.rating));
  } else {
    list.sort((a, b) => (order === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt)));
  }

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 12;
  const totalCount = list.length;
  const totalPages = Math.ceil(totalCount / limitNum) || 1;
  const paginated = list.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  return {
    data: {
      success: true,
      data: paginated,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCount,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
        limit: limitNum,
      },
    },
  };
}

export const productService = {
  getProducts: async (params = {}) => {
    try {
      const res = await api.get('/products', { params });
      if (res?.data?.data && res.data.data.length > 0) {
        return res;
      }
      return queryLocalProducts(params);
    } catch (err) {
      console.warn('API getProducts fallback triggered:', err.message);
      return queryLocalProducts(params);
    }
  },

  getProductById: async (id) => {
    try {
      const res = await api.get(`/products/${id}`);
      if (res?.data?.data) {
        return res;
      }
      throw new Error('Not found in API');
    } catch (err) {
      console.warn('API getProductById fallback triggered:', err.message);
      const product = productsData.find((p) => p._id === id || String(p._id) === String(id));
      if (product) {
        const related = productsData
          .filter((p) => p.category === product.category && p._id !== product._id)
          .slice(0, 8);
        return {
          data: {
            success: true,
            data: product,
            related,
          },
        };
      }
      // Return first product if ID not matched
      const fallback = productsData[0];
      const related = productsData.filter((p) => p._id !== fallback._id).slice(0, 8);
      return {
        data: {
          success: true,
          data: fallback,
          related,
        },
      };
    }
  },

  getCategories: async () => {
    try {
      const res = await api.get('/products/categories');
      if (res?.data?.data && res.data.data.length > 0) {
        return res;
      }
      throw new Error('Fallback categories');
    } catch (err) {
      const counts = { fruits: 0, vegetables: 0, flowers: 0 };
      productsData.forEach((p) => {
        if (counts[p.category] !== undefined) counts[p.category]++;
      });
      return {
        data: {
          success: true,
          data: [
            { _id: 'fruits', count: counts.fruits },
            { _id: 'vegetables', count: counts.vegetables },
            { _id: 'flowers', count: counts.flowers },
          ],
        },
      };
    }
  },
};
