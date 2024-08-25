import { useEffect, useState } from "react";
import { FaUserCircle, FaPencilAlt, FaCamera } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProfileImage,
  getProfile,
  updateProfileDetails,
} from "../../features/userSlice";
import { toast } from "react-toastify";
import userService from "../../services/userService";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector((store) => store.user);
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  const [errors, setErrors] = useState({});
  const [stats,setStats]=useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch,isEditing]);

  useEffect(()=>{
    const fetchStats = async()=>{
        const data = await userService.getStatsOfUser();
        setStats(data.stats);
    }
    fetchStats();
  },[]);

  const handleEditToggle = () => {
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
      dispatch(updateProfileDetails(data));
      toast.success("Profile updated successfully!");
      setErrors({});
      setIsEditing(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error(`Invalid file type ${file.type}`);
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    dispatch(changeProfileImage(formData));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto my-10 bg-white shadow-xl rounded-lg p-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-6">
            <div className="relative">
              {!user.url ? (
                <FaUserCircle className="text-gray-300 text-9xl" />
              ) : (
                <img
                  className="rounded-full object-contain h-48"
                  src={user.url}
                  alt="profile"
                />
              )}
              <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-500 transition">
                <FaCamera className="text-white" />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageChange(e)}
                />
              </label>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-gray-600">{user?.phone}</p>
            </div>
          </div>
          {isEditing ? (
            <button
              onClick={handleEditToggle}
              className="flex items-center bg-red-600 text-white px-5 py-3 rounded-md hover:bg-red-700 transition"
            >
              <MdOutlineCancel className="mr-2 text-lg" />
              {"Cancel"}
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="flex items-center bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition"
            >
              <FaPencilAlt className="mr-2" /> {"Edit Profile"}
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
                  type="text"
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
                className="w-1/2 bg-primary-blue text-white px-4 py-3 rounded-lg hover:bg-secondary-blue transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        <div className="mt-12 space-y-8">
          <h3 className="text-2xl font-semibold text-gray-800">Your Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg shadow-sm text-center hover:shadow-lg transition">
              <h4 className="text-2xl font-bold text-gray-700">{stats.booked}</h4>
              <p className="text-gray-600">Services Booked</p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg shadow-sm text-center hover:shadow-lg transition">
              <h4 className="text-2xl font-bold text-gray-700">{stats.completed}</h4>
              <p className="text-gray-600">Services Completed</p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg shadow-sm text-center hover:shadow-lg transition">
              <h4 className="text-2xl font-bold text-gray-700">{stats.pending}</h4>
              <p className="text-gray-600">Pending Service</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
