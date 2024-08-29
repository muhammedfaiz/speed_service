import Application from "../models/Application.js";
import Category from "../models/Category.js";
import Employee from "../models/Employee.js";
import Order from "../models/Order.js";
import Service from "../models/Service.js";

export const getCategoriesService = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw error;
  }
};

export const applicationService = async (data) => {
  try {
    const application = new Application(data);
    application.save();
  } catch (error) {
    throw error;
  }
};

export const fetchEmployee = async (email) => {
  try {
    const employee = await Employee.findOne({ email });
    return employee;
  } catch (error) {
    throw error;
  }
};

export const getServiceHelper = async (id) => {
  try {
    const employee = await Employee.findById(id);
    const services = await Service.find({
      category: employee.designation,
      employees: { $nin: id },
    });
    const acceptedServices = await Service.find({
      category: employee.designation,
      employees: { $in: id },
    });
    return { services, acceptedServices };
  } catch (error) {
    throw new Error("Failed to fetch services");
  }
};

export const addService = async (serviceId, employeeId) => {
  try {
    const service = await Service.findByIdAndUpdate(serviceId, {
      $push: { employees: employeeId },
    });
    return service;
  } catch (error) {
    throw new Error("Failed to add Service for employee");
  }
};

export const declineService = async (serviceId, employeeId) => {
  try {
    const service = await Service.findByIdAndUpdate(serviceId, {
      $pull: { employees: employeeId },
    });
    return service;
  } catch (error) {
    throw new Error("Failed to decline Service for employee");
  }
};

export const getEmployeeDetails = async (id) => {
  try {
    const employee = await Employee.findById(id);
    return employee;
  } catch (error) {
    throw new Error("Failed to fetch employee details");
  }
};

export const getOrderRequests = async (employee) => {
  try {
    const requests = await Order.find({
      employee: null,
      category: employee.designation,
      status: "Pending",
    })
      .populate("user")
      .populate("orderItems.item")
      .populate("address");
    return requests;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch order requests");
  }
};

export const acceptRequestService = async (data) => {
  try {
    const order = await Order.findByIdAndUpdate(data.orderId, {
      $set: {
        employee: data.employee,
        status: "Commited",
      },
    });
    return order;
  } catch (error) {
    throw new Error("Failed to accept order request");
  }
};

export const getTasksService = async (employeeId) => {
  try {
    const tasks = await Order.find({ employee: employeeId, status: "Commited" })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate("address")
      .populate("orderItems.item");
    return tasks;
  } catch (error) {
    throw new Error("Failed to get tasks service");
  }
};

export const changeTaskCompleteService = async (id) => {
  try {
    const result = await Order.findByIdAndUpdate(id, {
      $set: {
        status: "Completed",
      },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to change status");
  }
};

export const getHistoryService = async (id) => {
  try {
    const history = await Order.find({ employee: id, status: "Completed" })
      .populate({
        path: "user",
        select: "name -_id",
      })
      .populate("address")
      .populate("orderItems.item");
    return history;
  } catch (error) {
    throw new Error("Failed to get history");
  }
};

export const getTaskCompleted = async (id) => {
  try {
    const result = await Order.find({ employee: id, status: "Completed" });
    return result.length;
  } catch (error) {
    throw new Error("Failed to get task completed");
  }
};

export const getRequestsCount = async (id) => {
  try {
    const employee = await Employee.findById(id);
    const requests = await Order.find({
      employee: null,
      category: employee.designation,
      status: "Pending",
    }).countDocuments();
    return requests;
  } catch (error) {
    throw new Error("Failed to get requests");
  }
};

export const getEarnings = async (id) => {
  try {
    const data = await Order.find({ employee: id, status: "Completed" });
    let totalEarnings = 0;
    data.forEach((item) => {
      totalEarnings += item.orderItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    });
    return totalEarnings;
  } catch (error) {
    throw new Error("Failed to get earnings");
  }
};

export const getCompletionRate = async (id) => {
  try {
    const completedTasks = await getTaskCompleted(id);
    const totalTaskCommited = await Order.find({
      employee: id,
    }).countDocuments();
    if (totalTaskCommited === 0) return 0;

    return Math.round((completedTasks / totalTaskCommited) * 100);
  } catch (error) {
    throw new Error("Failed to get completion rate");
  }
};

export const getRecentActivitiesService = (id) => {
  try {
    const recentActivities = Order.find({ employee: id, status: "Completed" })
      .sort({ updatedAt: -1 })
      .limit(5);
    return recentActivities;
  } catch (error) {
    throw new Error("Failed to get recent activities");
  }
};

export const getEmployeeProfileDetails = async (id) => {
  try {
    const employee = await Employee.findById(id).select("-code -_id -proof -createdAt -updatedAt").populate({
      path: "designation",
      select: "name -_id",
    });
    return employee;
  } catch (error) {
    throw new Error("Failed to get employee profile details");
  }
};

export const updateEmployeeProfileService = async(id,data)=>{
  try {
    const update = await Employee.findByIdAndUpdate(id,data);
    return update;
  } catch (error) {
    throw new Error("Failed to update employee profile");
  }
}
