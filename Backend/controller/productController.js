import Product from "../model/product.model.js";
import asyncHandler from "express-async-handler";
import Rating from "../model/rating.model.js";
import Review from "../model/review.model.js";

export const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

export const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    category,
    brand,
    stock,
    images,
    colors,
    sizes,
    ratings,
    reviews,
    isFreeDelivery,
    deliveryCharge,
    seller
  } = req.body;

  try {
    let discountPrice = price;
    if (discountPercentage) {
      discountPrice = price - price * (discountPercentage / 100);
    }
    const product = new Product({
      title,
      description,
      price,
      discountPercentage,
      discountPrice,
      category,
      brand,
      stock,
      images,
      colors,
      sizes,
      ratings,
      reviews,
      isFreeDelivery,
      deliveryCharge,
      user: req.user._id,
      seller
    });

    const createdProduct = await product.save();

    //  if (ratings && ratings.length > 0) {
    //    const ratingObjects = await Promise.all(
    //      ratings.map(async (ratingValue) => {
    //        const rating = new Rating({
    //          rating: ratingValue,
    //          user: req.user._id,
    //          product: createdProduct._id,
    //        });
    //        return await rating.save();
    //      })
    //    );
    //    createdProduct.ratings = ratingObjects.map((rating) => rating._id);
    //  }

    //  if (reviews && reviews.length > 0) {
    //    const reviewObjects = await Promise.all(
    //      reviews.map(async (reviewText) => {
    //        const review = new Review({
    //          review: reviewText,
    //          user: req.user._id,
    //          product: createdProduct._id,
    //        });
    //        return await review.save();
    //      })
    //    );
    //    createdProduct.reviews = reviewObjects.map((review) => review._id);
    //  }

    //  await createdProduct.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    category,
    brand,
    stock,
    images,
    colors,
    sizes,
    ratings,
    reviews,
    isFreeDelivery,
    deliveryCharge,
  } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
    if (product) {
      product.title = title ?? product.title;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.discountPercentage =
        discountPercentage ?? product.discountPercentage;
      product.category = category ?? product.category;
      product.brand = brand ?? product.brand;
      product.stock = stock ?? product.stock;
      product.images = images ?? product.images;
      product.colors = colors ?? product.colors;
      product.sizes = sizes ?? product.sizes;
      product.ratings = ratings ?? product.ratings;
      product.reviews = reviews ?? product.reviews;
      product.isFreeDelivery = isFreeDelivery ?? product.isFreeDelivery;
      product.deliveryCharge = deliveryCharge ?? product.deliveryCharge;

      // Calculate discount price if discountPercentage is provided
      if (discountPercentage) {
        product.discountPrice =
          product.price - product.price * (product.discountPercentage / 100);
      } else {
        product.discountPrice = product.price;
      }

      const updatedProduct = await product.save();

      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("you can't perform this action babe");
  }
  if (product) {
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: "Removed succesfully" });
  } else {
    res.status(404);
    throw new Error("Product with id not found ! ");
  }
});
