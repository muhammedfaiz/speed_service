import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Application = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    experience: "",
    proof: null,
  });
  const [designations, setDesignations] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDesignation = async () => {
      const response = await axios.get(
        "https://api.speedservice.store/api/employee/categories"
      );
      setDesignations(response.data);
    };
    fetchDesignation();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData({
      ...data,
      [name]: files ? files[0] : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.email) newErrors.email = "Email is required";
    if (!data.phone) newErrors.phone = "Phone number is required";
    if (!data.designation) newErrors.designation = "Designation is required";
    if (!data.experience) newErrors.experience = "Experience is required";
    if (!data.proof) newErrors.proof = "Proof document is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
      const formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      const response = await axios.post(
        "https://api.speedservice.store/api/employee/apply",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response);
      if (response.status == 200) {
        toast.success("Application Submitted!!");
        navigate("/employee/success");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md bg-gray-800">
      <h1 className="text-xl font-bold capitalize text-white">
        Employee Application
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-200" htmlFor="username">
              Name
            </label>
            <input
              id="username"
              name="name"
              type="text"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-gray-200" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              className="text-gray-200"
              htmlFor="designation"
            >
              Designation
            </label>
            <select
              id="designation"
              name="designation"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            >
              <option value="">Select a designation</option>
              {designations?.categories?.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.designation && (
              <p className="text-red-500 text-xs mt-1">{errors.designation}</p>
            )}
          </div>

          <div>
            <label className="text-gray-200" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              onChange={handleChange}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <label
              className="text-gray-200"
              htmlFor="experience"
            >
              Experience
            </label>
            <input
              id="experience"
              name="experience"
              onChange={handleChange}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            {errors.experience && (
              <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-white"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                </svg>
                <div className=" text-sm text-gray-600">
                  <p className="text-slate-300 mb-2">Upload your documents.</p>
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span className="p-3">Upload a file</span>
                    <input
                      id="file-upload"
                      name="proof"
                      onChange={handleChange}
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>
            {errors.proof && (
              <p className="text-red-500 text-xs mt-1">{errors.proof}</p>
            )}
          </div>
          <div>
            <Link
              to="/employee/login"
              className="inline-flex items-center text-xs font-thin text-center text-gray-100 hover:text-white"
            >
              <span className="text-base font-semibold">
                Already providing service?
              </span>
            </Link>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-gray-600 font-semibold">
            Apply
          </button>
        </div>
      </form>
    </section>
  );
};

export default Application;
