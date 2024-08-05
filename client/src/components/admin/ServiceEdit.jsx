import { useEffect, useState } from "react";
import { getCategoriesService, getService, updateService } from "../../services/adminService";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const ServiceEdit = ({ id }) => {
  const [service, setService] = useState({});
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState();
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchEditService() {
      try {
        const result = await getService(id);
        const response = await getCategoriesService();
        setService(result.service);
        setCategories(response.categories);
       } catch (error) {
        console.log(error);
      }
    }
    fetchEditService();
  }, [id]);
  useEffect(() => {
    setData(service);
  }, [service]);
  function validate() {
    let errors = {};
    if (!data.name) errors.name = "Service Name is required";
    if (!data.price) errors.price = "Price is required";
    if (!data.category) errors.category = "Category is required";
    if (!data.description) errors.description = "Description is required";
    if (!/^[A-Za-z\s]+$/.test(data.name)) {
      errors.name = "Name should be alphabetical and can include spaces";
    }
    if (!/^\d*\.?\d+$/.test(data.price) || parseFloat(data.price) <= 0) {
      errors.price = "Price should be a positive number";
    }
    return errors;
  }
  function handleImageChange(e) {
    const file = e.target.files[0];
    setData({ ...data, image: file });
    setPreview(URL.createObjectURL(file));
  }
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
   try {
     e.preventDefault();
     let validationErrors = validate();
     if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors);
       return;
     }
     setErrors({});
     const formData = new FormData();
     formData.append("name", data.name);
     formData.append("price", data.price);
     formData.append("category", data.category);
     formData.append("description", data.description);
     formData.append("image", data.image);
     const result = await updateService(id, formData);
     if(result.status==200){
        toast.success(result.data.message);
        window.location.href = "/admin/services";
     }
   } catch (error) {
    toast.error(error.message)
   }

  }
  return (
    <div className="w-full flex justify-center mt-11">
      <div className="bg-gray-100 border shadow-md p-8 w-1/2">
        {/* {error && <p className="text-red-500 text-base mt-2">{error}</p>} */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 font-[sans-serif]">
            <label
              className="block text-gray-500 text-base font-semibold mb-2"
              htmlFor="service_name"
            >
              Service Name
            </label>
            <input
              className="border text-sm w-full py-2 px-3 text-gray-700 rounded  focus:outline-blue-700"
              type="text"
              placeholder="Enter Service Name"
              id="service_name"
              name="name"
              value={data.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-2">{errors.name}</p>
            )}
          </div>
          <div className="mb-4 font-[sans-serif]">
            <label
              className="block text-gray-500 text-base font-semibold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="border text-sm w-full py-2 px-3 text-gray-700 rounded  focus:outline-blue-700"
              type="text"
              placeholder="Enter price"
              id="price"
              name="price"
              value={data.price}
              onChange={(e) => handleChange(e)}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-2">{errors.price}</p>
            )}
          </div>
          <div className="mb-4 font-[sans-serif]">
            <label
              className="block text-gray-500 text-base font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="border text-sm w-full py-2 px-3 text-gray-700 rounded focus:outline-blue-700"
              type="text"
              placeholder="Enter description about the service"
              id="description"
              name="description"
              value={data.description}
              onChange={(e) => handleChange(e)}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-2">{errors.description}</p>
            )}
          </div>
          <div className="mb-4 font-[sans-serif]">
            <label
              className="block text-gray-500 text-base font-semibold mb-2"
              htmlFor="category_name"
            >
              Category
            </label>
            <select
              name="category"
              className="border text-sm w-full py-2 px-3 text-gray-700 rounded focus:outline-blue-700"
              onChange={(e) => handleChange(e)}
              id="category_name"
              value={data.category}
            >
              <option value="">Select a category</option>
              {categories &&
                categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-2">{errors.category}</p>
            )}
          </div>
          <div className="font-[sans-serif] max-w-md mx-auto">
            <label className="text-base text-gray-500 font-semibold mb-2 block">
              Upload Image
            </label>
            {preview ? (
              <div className="mt-4">
                <img src={preview} alt="Preview" className="w-full h-auto" />
              </div>
            ) : (
              <div className="mt-4">
                <img
                  src={service.imageUrl}
                  alt="Preview"
                  className="w-full h-auto"
                />
              </div>
            )}
            <input
              type="file"
              className="w-full focus:ring-blue-700 text-gray-400 text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
              accept="png,jpg,jpeg"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            <p className="text-xs text-gray-400 mt-2">
              PNG, JPG, JPEG are Allowed.
            </p>
            {errors.image && (
              <p className="text-red-500 text-xs mt-2">{errors.image}</p>
            )}
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
              type="submit"
            >
              Edit Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ServiceEdit;
