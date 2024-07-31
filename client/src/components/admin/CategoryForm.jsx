import { useState } from "react";
import { addCategoryService } from "../../services/adminService";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const [form, setForm] = useState({
    name: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({
      ...form,
      image: file,
    });
    setPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    let errors = {};
    if (!form.name) {
      errors.name = "Please enter category name";
    } else if (!/^[A-Za-z]+$/.test(form.name)) {
      errors.name = "Category name should only contain alphabets";
    }
    if (!form.image) {
      errors.image = "Please select an image";
    } else if (
      !["image/png", "image/jpg", "image/jpeg"].includes(form.image.type)
    ) {
      errors.image = "Invalid file type. Only PNG, JPG, JPEG are allowed";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image);
      await addCategoryService(formData);
      toast.success("Added Category successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex justify-center mt-11">
      <div className="bg-gray-100 border shadow-md p-8 w-1/2">
        {/* {error && <p className="text-red-500 text-base mt-2">{error}</p>} */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 font-[sans-serif]">
            <label
              className="block text-gray-500 text-base font-semibold mb-2"
              htmlFor="category_name"
            >
              Category Name
            </label>
            <input
              className="border text-sm w-full py-2 px-3 text-gray-700 rounded  focus:outline-blue-700"
              type="text"
              placeholder="Enter Category Name"
              id="category_name"
              name="name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-2">{errors.name}</p>
            )}
          </div>
          <div className="font-[sans-serif] max-w-md mx-auto">
            <label className="text-base text-gray-500 font-semibold mb-2 block">
              Upload Image
            </label>
            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Preview" className="w-full h-auto" />
              </div>
            )}
            <input
              type="file"
              className="w-full focus:ring-blue-700 text-gray-400 text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
              accept="png,jpg,jpeg"
              name="image"
              onChange={handleImageChange}
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
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CategoryForm;
