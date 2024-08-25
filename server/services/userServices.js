import Service from "../models/Service.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Address from "../models/Address.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Review from "../models/Review.js";
import Category from "../models/Category.js";

export const createUser = async ({ name, email, password, phone, otp }) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      otp,
    });
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user");
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Failed to find user by email");
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error("Failed to find user by id");
  }
};

export const expireOtp = async (userId) => {
  try {
    await User.findByIdAndUpdate(userId, { otp: null });
    return true;
  } catch (error) {
    throw new Error("Failed to expire OTP");
  }
};

export const getUserServicesData = async () => {
  try {
    const services = await Service.find({ employees: { $ne: [] } }).populate({
      path: "category",
      select: "name -_id",
    });
    return services;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get Services");
  }
};

export const serviceDataHelper = async (id) => {
  try {
    const service = await Service.findById(id).populate({
      path: "category",
      select: "name",
    });
    return service;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get Service data");
  }
};

export const addAddressService = async (id, data) => {
  try {
    const address = new Address({
      ...data,
      user: id,
    });
    await address.save();
    return address;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add address");
  }
};

export const getAllUserAddress = async (id) => {
  try {
    const data = await Address.find({ user: id });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch address");
  }
};

export const getServiceHelper = async (id) => {
  try {
    const data = await Service.findById(id);
    return data;
  } catch (error) {
    throw new Error("Failed to get service");
  }
};

export const fetchAllCartsHelper = async (id) => {
  try {
    const data = await Cart.find({ user: id }).populate("category");
    return data;
  } catch (error) {
    throw new Error("Failed to get cart details");
  }
};

export const getCartDetailsUser = async (id, categoryId) => {
  try {
    const data = await Cart.findOne({
      user: id,
      category: categoryId,
    }).populate("items.item");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get Cart");
  }
};

export const addToCartHelper = async (data) => {
  try {
    const cart = Cart({ ...data });
    await cart.save();
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add to Cart");
  }
};

export const placeOrderHelper = async (data) => {
  try {
    const order = new Order(data);
    await order.save();
    return order;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to place order");
  }
};

export const clearCart = async (id) => {
  try {
    await Cart.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw new Error("Failed to clear cart");
  }
};

export const getBookingsHelper = async (id) => {
  try {
    let result = await Order.find({ user: id }).populate("orderItems.item");
    return result;
  } catch (error) {
    throw new Error("Failed to get booking");
  }
};

export const getBookingDetailsHelper = async (id) => {
  try {
    let result = await Order.findById(id)
      .populate("orderItems.item")
      .populate("address")
      .populate({
        path: "employee",
        select: "name experience",
      })
      .populate({
        path: "category",
        select: "name -_id",
      });
    return result;
  } catch (error) {
    throw new Error("Failed to get booking details");
  }
};

export const getCartHelper = async (id) => {
  try {
    let result = await Cart.findById(id).populate("items.item");
    return result;
  } catch (error) {
    throw new Error("Failed to get cart details");
  }
};

export const cancelBookingHelper = async (id) => {
  try {
    let result = await Order.findByIdAndUpdate(id, { status: "Cancelled" });
    return result;
  } catch (error) {
    throw new Error("Failed to cancel booking");
  }
};

export const addReviewHelper = async (serviceId, userId, rating, comment) => {
  try {
    const review = await Review.findOne({ service: serviceId, user: userId });
    if (review) {
      await Review.findByIdAndUpdate(review._id, {
        $set: { rating: parseInt(rating), comment },
      });
      return review;
    }
    const data = {
      service: serviceId,
      user: userId,
      rating: parseInt(rating),
      comment: comment,
    };
    const result = new Review(data);
    await result.save();
    return result;
  } catch (error) {
    throw new Error("Failed to add review");
  }
};

export const getReviewData = async (id) => {
  try {
    const result = await Review.find({ service: id }).populate({
      path: "user",
      select: "name -_id",
    });
    return result;
  } catch (error) {
    throw new Error("Failed to get review data");
  }
};

export const fetchCategoriesHelper = async () => {
  try {
    const result = await Category.find();
    return result;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

export const updateProfileImageService = async (id, fileName) => {
  try {
    const user = await User.findById(id);
    user.image = fileName;
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Failed to update profile image service");
  }
};

export const updateProfileService = async (id, data) => {
  try {
    const user = await User.findByIdAndUpdate(id, { $set: data });
    return user;
  } catch (error) {
    throw new Error("Failed to update profile service");
  }
};

export const getStatsOfUserHelper = async (id) => {
  try {
    const booked = await Order.find({ user: id });
    const completed = booked.filter((order) => order.status === "Completed");
    const pending = booked.filter(
      (order) => order.status === "Pending" && order.status === "Commited"
    );
    return {
      booked: booked.length,
      completed: completed.length,
      pending: pending.length,
    };
  } catch (error) {
    throw new Error("Failed to get stats of user");
  }
};

export const getRating = async (id) => {
  try {
    const reviews = await Review.find({ service: id });
    if (reviews.length > 0) {
      let avgRating = 0;
      let sumRating = 0;
      reviews.forEach((review) => {
        sumRating += review.rating;
      });
      avgRating = sumRating / reviews.length;
      return avgRating;
    }
  } catch (error) {
    throw new Error("Failed to get rating of user");
  }
};
