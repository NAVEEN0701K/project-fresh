const Product = require('../models/Product');

// GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      isAvailable,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 12,
      featured,
      seasonal,
    } = req.query;

    const query = {};

    // Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { subcategory: { $regex: search, $options: 'i' } },
      ];
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }

    // Price filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
    }

    // Availability filter
    if (isAvailable !== undefined) {
      query.isAvailable = isAvailable === 'true';
    }

    // Featured filter
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Seasonal filter
    if (seasonal === 'true') {
      query.isSeasonal = true;
    }

    // Sort
    const sortOptions = {};
    if (sort === 'price') {
      sortOptions.price = order === 'asc' ? 1 : -1;
    } else if (sort === 'name') {
      sortOptions.name = order === 'asc' ? 1 : -1;
    } else if (sort === 'rating') {
      sortOptions.rating = -1;
    } else {
      sortOptions.createdAt = order === 'asc' ? 1 : -1;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [products, totalCount] = await Promise.all([
      Product.find(query).sort(sortOptions).skip(skip).limit(limitNum).lean(),
      Product.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCount,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error('getProducts error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/products/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Fetch related products
    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    })
      .limit(4)
      .lean();

    res.json({ success: true, data: product, related });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
