import { useState, useEffect } from "react";
import {
  FaPencilAlt,
  FaUserAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import Navbar from "../../components/employee/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateEmployeeProfile } from "../../features/employeeSlice";
import { toast } from "react-toastify";

const EmployeeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { employee } = useSelector((store) => store.employee);
  const [data, setData] = useState({
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleEditToggle = () => {
    setData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
    });
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  function validation() {
    let errors = {};
    if (!data.name) {
      errors.name = "Name is required";
    }
    if (data.name && !/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(data.name)) {
      errors.name = "Invalid name format";
    }
    if (!data.email) {
      errors.email = "Email is required";
    }
    if (data.email && !/^\S+@\S+\.\S+$/i.test(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!data.phone) {
      errors.phone = "Phone number is required";
    }
    if (data.phone && !/^\d{10}$/.test(Number(data.phone))) {
      errors.phone = "Invalid phone number format";
    }
    return errors;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validation();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      dispatch(updateEmployeeProfile(data));
      toast.success("Profile updated successfully!");
      setErrors({});
      setIsEditing(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 bg-white shadow-xl rounded-lg p-10">
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaUserAlt className="text-blue-500 text-2xl" />
              <h2 className="text-4xl font-bold text-gray-800">
                {employee?.name}
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-blue-500 text-xl" />
              <p className="text-gray-600 text-lg">{employee?.email}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-blue-500 text-xl" />
              <p className="text-gray-600 text-lg">{employee?.phone}</p>
            </div>
            <p
              className={`text-sm font-semibold ${
                employee?.status === "active"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Status: {employee?.status}
            </p>
          </div>
          {isEditing ? (
            <button
              onClick={handleEditToggle}
              className="flex items-center bg-red-600 text-white px-5 py-3 rounded-full hover:bg-red-700 transition"
            >
              <MdOutlineCancel className="mr-2 text-lg" />
              Cancel
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="flex items-center bg-blue-600 text-white px-5 py-3 rounded-full hover:bg-blue-700 transition"
            >
              <FaPencilAlt className="mr-2" /> Edit Profile
            </button>
          )}
        </div>

        {isEditing && (
          <form onSubmit={handleFormSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={data.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 bg-blue-500 text-white px-4 py-3 rounded-full hover:opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Additional Information Section */}
        <div className="mt-12 space-y-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Additional Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg shadow-sm text-center hover:shadow-lg transition">
              <FaBriefcase className="text-blue-500 mb-2 text-3xl" />
              <h4 className="text-2xl font-bold text-gray-700">
                {employee?.designation}
              </h4>
              <p className="text-gray-600">Designation</p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg shadow-sm text-center hover:shadow-lg transition">
              <FaCalendarAlt className="text-blue-500 mb-2 text-3xl" />
              <h4 className="text-2xl font-bold text-gray-700">
                {employee?.experience} years
              </h4>
              <p className="text-gray-600">Experience</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
