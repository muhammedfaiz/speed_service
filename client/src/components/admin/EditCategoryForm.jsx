import { useEffect, useState } from "react";
import {
  getCategoryDetails,
  updateCategory,
} from "../../services/adminService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const EditCategoryForm = ({ id }) => {
  const [category, setCategory] = useState({
    name: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryDetails(id);
        setCategory({
          name: data.category.name || "",
        });
        setPreview(data.category.image);
      } catch (error) {
        toast.error("Failed to fetch category details");
      }
    };
    fetchCategory();
  }, [id]);

  const validateForm = () => {
    let formErrors = {};
    if (!category.name) formErrors.name = "Category name is required";
    return formErrors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory({ ...category, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", category.name);
      if (category.image) {
        formData.append("image", category.image);
      }

      const result = await updateCategory(id, formData);
      if (result.status == 200) {
        toast.success("Category updated successfully!");
        navigate("/admin/categories");
      }
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  return (
    <div className="w-full flex justify-center mt-11">
      <div className="bg-gray-100 border shadow-md p-8 w-1/2">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 font-[sans-serif]">
            <label
              className="block text-gray-500 text-base font-semibold mb-2"
              htmlFor="category_name"
            >
              Category Name
            </label>
            <input
              className="border text-sm w-full py-2 px-3 text-gray-700 rounded focus:outline-blue-700"
              type="text"
              placeholder="Enter Category Name"
              id="category_name"
              name="name"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
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
              accept="image/png, image/jpg, image/jpeg"
              name="image"
              onChange={handleImageChange}
            />
            <p className="text-xs text-gray-400 mt-2">
              PNG, JPG, JPEG are allowed.
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
              Edit Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryForm;
