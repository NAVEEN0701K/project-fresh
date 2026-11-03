import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

export function useProducts(initialParams = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [params, setParams] = useState({
    page: 1,
    limit: 12,
    sort: 'createdAt',
    order: 'desc',
    ...initialParams,
  });

  const fetchProducts = useCallback(async (queryParams) => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getProducts(queryParams);
      setProducts(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(params);
  }, [params, fetchProducts]);

  const updateParams = useCallback((newParams) => {
    setParams((prev) => ({ ...prev, ...newParams, page: newParams.page ?? 1 }));
  }, []);

  const goToPage = useCallback((page) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  return { products, loading, error, pagination, params, updateParams, goToPage, refetch: () => fetchProducts(params) };
}
